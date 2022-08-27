import { useState, useRef, useEffect, createContext } from 'react'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

import NormalDialogBox from '../popups/normalDialogBox'
import SelectBox from '../inputs/selectBox'

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
    type: 'alert', // alert || confirm || input,
    inputType: 'text', // text || password
    options: null
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

    const showDialog = ({
                            title, message, Container, type,
                            color = 'primary',
                            inputType = 'text',
                            options = null
                        }) => {

        let newData = {open: true}

        if (title) newData['title'] = title
        if (message) newData['message'] = message
        if (Container) newData['Container'] = Container
        if (type) newData['type'] = type

        newData['inputType'] = inputType
        newData['options'] = options
        newData['color'] = color

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
    const [value, setValue] = useState(null)
    const proceedRef = useRef()

    let msg = props.message? props.message: ''
    let type = props.type? props.type: 'alert'
    let Container = props.Container? props.Container: (conProps) => {
        return <>{ conProps.children }</>
    }

    return (
        <>
            {/* alert dialogbox */}
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

            {/* confirm dialog box */}
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

            {/* input dialogbox */}
            <NormalDialogBox
                title={ props.title? props.title: '' }
                color={ props.color? props.color: 'primary' }
                open={ props.open && type === 'input'? props.open: false }
                fullWidth={ true } strictClose={ true }
                onClose={props.onAction? () => {
                    props.onAction({status: 'close'})
                }: () => {}}
                actions={(
                    <Button
                        ref={proceedRef}
                        variant='contained'
                        color={ props.color? props.color: 'primary' }
                        onClick={() => {
                            props.onAction({status: 'proceed', value})
                        }}>Proceed</Button>
                )}>
                <Container>
                    <Box>{ msg }</Box>
                    <Box style={{marginTop: 10}}>
                        {/* text input */}
                        {
                            props.inputType === 'text'?
                                <TextField
                                    fullWidth
                                    size='small'
                                    onChange={(e) => {
                                        setValue(e.target.value)
                                    }}
                                    onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                            proceedRef.current.click()
                                        }
                                    }}
                                    defaultValue={props.options? props.options: ''} />: null
                        }

                        {/* password input */}
                        {
                            props.inputType === 'password'?
                                <TextField
                                    fullWidth
                                    size='small'
                                    type='password'
                                    onChange={(e) => {
                                        setValue(e.target.value)
                                    }}
                                    onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                            proceedRef.current.click()
                                        }
                                    }}
                                    defaultValue={props.options? props.options: ''} />: null
                        }
                    </Box>
                </Container>
            </NormalDialogBox>
        </>
    )
}