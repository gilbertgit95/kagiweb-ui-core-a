import { useState, useEffect, createContext } from 'react'
import NormalDialogBox from '../popups/normalDialogBox'

const LOCAL_STORAGE = {
    checkerInterval: 1000,
    checkerIntervalID: null,
    dialogResult: null
}

const DEFAULT_DATA = {
    title: '',
    message: '',
    Container: (props) => (
        <>
            { props.children }
        </>
    ),
    open: false,
    type: 'alert', // alert || confirm
}

const GlobalDialogContext = createContext({
    globalDialogContext: DEFAULT_DATA,
    setGlobalDialogContext(data) { return },
    async showDialog(data) { return },
    closeDialog(data) { return }
})
export default GlobalDialogContext

export const useGlobalDialogContext = () => {
    const [globalDialogContext, setGlobalDialogContext] = useState(DEFAULT_DATA)

    const showDialog =({title, message, Container, type}) => {
        let newData = {open: true}

        if (title) newData['title'] = title
        if (message) newData['message'] = message
        if (Container) newData['Container'] = Container
        if (type) newData['type'] = type

        setGlobalDialogContext({...globalDialogContext, ...newData})
        if (LOCAL_STORAGE.checkerIntervalID) {
            clearInterval(LOCAL_STORAGE.checkerIntervalID)
            LOCAL_STORAGE.checkerIntervalID = null
        }

        LOCAL_STORAGE.dialogResult = null

        return new Promise((resolve, reject) => {
            LOCAL_STORAGE.checkerIntervalID =  setInterval(() => {
                // console.log(LOCAL_STORAGE.dialogResult)
                if (LOCAL_STORAGE.dialogResult && LOCAL_STORAGE.checkerIntervalID) {
                    clearInterval(LOCAL_STORAGE.checkerIntervalID)
                    LOCAL_STORAGE.checkerIntervalID = null
                    return resolve(LOCAL_STORAGE.dialogResult)
                }
            }, LOCAL_STORAGE.checkerInterval)
        })
    }

    const closeDialog = () => {
        LOCAL_STORAGE.dialogResult = { status: 'closed' }
        setGlobalDialogContext({...globalDialogContext, ...{open: false}})
    }

    useEffect(() => {
        // clean up time interval before this component unmount
        return () => {
            if (LOCAL_STORAGE.checkerIntervalID) {
                clearInterval(LOCAL_STORAGE.checkerIntervalID)
                LOCAL_STORAGE.checkerIntervalID = null
            }
        }
    }, [])

    return {globalDialogContext, setGlobalDialogContext, showDialog, closeDialog}
}

export const GlobalDialogComponents = (props) => {

    let msg = props.message? props.message: ''
    let type = props.type? props.type: 'alert'
    let Container = props.Container? props.Container: (conProps) => {
        return <>{ conProps.children }</>
    }

    return (
        <>
            <NormalDialogBox
                title={ props.title? props.title: '' }
                open={ props.open && type === 'alert'? props.open: false }
                fullWidth={ true } strictClose={ true }
                onClose={props.onClose? props.onClose: () => {}}>
                <Container>
                    Alert! { msg }
                </Container>
            </NormalDialogBox>
            <NormalDialogBox
                title={ props.title? props.title: '' }
                open={ props.open && type === 'confirm'? props.open: false }
                fullWidth={ true } strictClose={ true }
                onClose={props.onClose? props.onClose: () => {}}>
                <Container>
                    Confirm! { msg }
                </Container>
            </NormalDialogBox>
        </>
    )
}