import { useState, createContext } from 'react'
import NormalDialogBox from '../popups/normalDialogBox'

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
    showDialog(data) { return },
    closeDialog(data) { return }
})
export default GlobalDialogContext

export const useGlobalDialogContext = () => {
    const [globalDialogContext, setGlobalDialogContext] = useState(DEFAULT_DATA)

    const showDialog = ({title, message, Container, type}) => {
        let newData = {open: true}

        if (title) newData['title'] = title
        if (message) newData['message'] = message
        if (Container) newData['Container'] = Container
        if (type) newData['type'] = type

        setGlobalDialogContext({...globalDialogContext, ...newData})
    }

    const closeDialog = () => {
        setGlobalDialogContext({...globalDialogContext, ...{open: false}})
    }

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