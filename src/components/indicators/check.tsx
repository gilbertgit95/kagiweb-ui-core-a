import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

interface Props {
    value?:boolean
}

const Check = ({value}:Props) => {
    return value? <CheckIcon color="primary" />: <CloseIcon color="secondary" />
}

export default Check