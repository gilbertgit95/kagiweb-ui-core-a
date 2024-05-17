import { TextField, TextFieldProps } from '@mui/material'

interface IProps {

}

const DebouncingTextField = (props:TextFieldProps & IProps) => {
    return <TextField {...props} />
}

export default DebouncingTextField