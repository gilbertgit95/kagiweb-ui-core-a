import { Typography } from "@mui/material"

export interface IDir {
    name: string,
    subDir: IDir[]
}

interface IProps {
    directories?: IDir[]
}

const TreeDirectory = (props:IProps) => {
    return (
        <>
            <Typography>Tree View</Typography>
        </>
    )
}

export default TreeDirectory