import { useContext } from 'react'
import Box from '@mui/material/Box'
import LocalStorageContext from '../context/localStorageContext'
import { CodeBlock, vs2015, atomOneLight } from "react-code-blocks"
// import CircularProgress from '@mui/material/CircularProgress'

const CodeBlockComponent = (props) => {
    const {localStorageContext} = useContext(LocalStorageContext)

    let themeMode = localStorageContext.themeMode
    let defaultTheme = themeMode === 'dark'? vs2015: atomOneLight
    
    return (
        <Box style={props.style? props.style: {}}>
            <CodeBlock
                text={props.text? props.text: ''}
                language={props.language? props.language: 'javascript'}
                showLineNumbers={Boolean(props.showLineNumbers)}
                theme={props.theme? props.theme: defaultTheme} />
        </Box>
    )
}

export default CodeBlockComponent