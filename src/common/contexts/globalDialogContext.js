import { useState, useEffect, createContext } from 'react'

import Button from '@mui/material/Button'

import NormalDialogBox from '../popups/normalDialogBox'

const LOCAL_STORAGE = {
    checkerInterval: 1000,
    checkerIntervalID: null,
    dialogResult: null
}

const DEFAULT_DATA = {
    title: '',
    message: '',
    color: 'primary',
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
    action(data) { return }
})
export default GlobalDialogContext

export const useGlobalDialogContext = () => {
    const [globalDialogContext, setGlobalDialogContext] = useState(DEFAULT_DATA)

    const showDialog =({title, message, Container, type, color}) => {
        let newData = {open: true}

        if (title) newData['title'] = title
        if (message) newData['message'] = message
        if (Container) newData['Container'] = Container
        if (type) newData['type'] = type

        newData['color'] = color? color: 'primary'

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

    const action = (data) => {
        LOCAL_STORAGE.dialogResult = data
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

    return {globalDialogContext, setGlobalDialogContext, showDialog, action}
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
                color={ props.color? props.color: 'primary' }
                open={ props.open && type === 'alert'? props.open: false }
                fullWidth={ true } strictClose={ true }
                onClose={props.onAction? () => {
                    props.onAction({status: 'close'})
                }: () => {}}>
                <Container>
                    { msg }
                </Container>
            </NormalDialogBox>
            <NormalDialogBox
                title={ props.title? props.title: '' }
                color={ props.color? props.color: 'primary' }
                open={ props.open && type === 'confirm'? props.open: false }
                fullWidth={ true } strictClose={ true }
                onClose={props.onAction? () => {
                    props.onAction({status: 'close'})
                }: () => {}}
                actions={(
                    <Button
                        variant='contained'
                        color={ props.color? props.color: 'primary' }
                        onClick={() => {
                            props.onAction({status: 'proceed'})
                        }}>Proceed</Button>
                )}>
                <Container>
                    { msg }
                </Container>
            </NormalDialogBox>
        </>
    )
}