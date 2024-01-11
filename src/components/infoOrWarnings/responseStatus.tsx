import { Alert } from "@mui/material"

export type TResponseStatus = {
    errorMessages?: string[],
    infoMessages?: string[]
}

const ResponseStatus = (props:TResponseStatus) => {
    const err = props.errorMessages && props.errorMessages.length? props.errorMessages[0]: undefined
    const info = props.infoMessages && props.infoMessages.length? props.infoMessages[0]: undefined

    return (
        <>
            { err? <Alert severity="error">{ err }</Alert>: null }
            { !err && info? <Alert severity="info">{ info }</Alert>: null }
        </>
    )
}

export default ResponseStatus