import { useEffect, useState } from 'react'
import subpages from './lib/subPages'
import Typography from '@mui/material/Typography'

import SubPageslayout from '../../common/layouts/subPagesLayout'

// import Link from '@mui/material/Link'
// import Container from '@mui/material/Container'
// import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
// import TextField from '@mui/material/TextField'
// import LoginIcon from '@mui/icons-material/Login'
// import Button from '@mui/material/Button'

import CodeBlock from '../../common/blocks/codeBlock'
import GenBlock from '../../common/blocks/genBlock'

// import AccountContext from '../../common/contexts/accountContext'

const testCodeBlockDescription = `
    The lorem ipsum gets its name from the Latin phrase Neque porro quisquam est qui dolorem
    ipsum quia dolor sit amet. which translates to “Nor is there anyone who loves or pursues
    or desires to obtain pain of itself, because it is pain.
`
const testCodeBlockCode = `
import React from 'react'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

const LoadingButton = (props) => {

    let properties = {}

    // properties not tobe included
    let xProps = new Set(['isLoading'])

    // assign object properties
    Object.keys(props).forEach(key => {
        if (xProps.has(key)) return
        properties[key] = props[key]
    })

    // start icon
    let startIcon = props.startIcon? props.startIcon: null

    // if isLoading is true, set disabled to true
    if (props.isLoading) {
        startIcon = <CircularProgress size={12} />
        properties.disabled = true
    }

    return (
        <Button
            {...properties}
            startIcon={ startIcon }>
            { props.children? props.children: '' }
        </Button>
    )
}

export default LoadingButton
`

const Blocks = (props) => {
    const [isLoading, setIsLoading] = useState(true)
    // const ctx = useContext(AccountContext)

    // const btnClicked = (e) => {
    //     ctx.setAccountContext({testVal: 'Home test value from context'})
    // }

    useEffect(() => {
        const fetchData = () => {
            setIsLoading(true)
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
        }

        fetchData()
    }, [])
    

    return (
        <SubPageslayout
            navAnchor={'left'}
            navMenu={subpages}>
            <Grid item xs={12}>
                <CodeBlock
                    isLoading={isLoading}
                    title={'Code Block Component'}
                    description={testCodeBlockDescription}
                    code={testCodeBlockCode}
                    language={'jsx'}
                    showLineNumbers={true}
                    theme={null}>
                    <Typography variant='body1'>
                        The lorem ipsum gets its name from the Latin phrase Neque porro quisquam est qui dolorem
                        ipsum quia dolor sit amet. which translates to “Nor is there anyone who loves or pursues
                        or desires to obtain pain of itself, because it is pain.
                    </Typography>
                </CodeBlock>
                <GenBlock
                    isLoading={isLoading}
                    title={'General Block Component'}
                    description={testCodeBlockDescription}>
                    <Typography variant='body1'>
                        The lorem ipsum gets its name from the Latin phrase Neque porro quisquam est qui dolorem
                        ipsum quia dolor sit amet. which translates to “Nor is there anyone who loves or pursues
                        or desires to obtain pain of itself, because it is pain. The lorem ipsum gets its name
                        from the Latin phrase Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.
                        which translates to “Nor is there anyone who loves or pursues or desires to obtain pain
                        of itself, because it is pain.
                    </Typography>
                </GenBlock>
            </Grid>
        </SubPageslayout>
    )
}

export default Blocks