import { useEffect, useState } from 'react'
import subpages from './lib/subPages'

import LoadingButton from '../../common/atomicComponents/loadingButton'
import SubPageslayout from '../../common/layouts/subPagesLayout'

// import Link from '@mui/material/Link'
// import Container from '@mui/material/Container'
// import Box from '@mui/material/Box'
import LoginIcon from '@mui/icons-material/Login'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
// import TextField from '@mui/material/TextField'
// import LoginIcon from '@mui/icons-material/Login'
// import Button from '@mui/material/Button'

import CodeBlock from '../../common/blocks/codeBlock'

// import AccountContext from '../../common/contexts/accountContext'

const testTitle = 'Loading Button'
const testDescription = `
    The lorem ipsum gets its name from the Latin phrase Neque porro quisquam est qui dolorem
    ipsum quia dolor sit amet. which translates to “Nor is there anyone who loves or pursues
    or desires to obtain pain of itself, because it is pain.
`
const testCode = `
// in the import section
import LoadingButton from '/common/buttons/loadingButton'
import LoginIcon from '@mui/icons-material/Login'

// ... in the component
// in the render section
return (
    <LoadingButton
        size='small'
        variant='contained'
        color='primary'
        onClick={(e) => {}}
        isLoading={false}
        startIcon={<LoginIcon />}>
        login
    </LoadingButton>
)
`

const Buttons = (props) => {
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
                    title={testTitle}
                    description={testDescription}
                    code={testCode}
                    language={'jsx'}
                    showLineNumbers={true}
                    rendered={(
                        <>
                            <LoadingButton
                                size='small'
                                variant='contained'
                                color='primary'
                                onClick={(e) => {}}
                                isLoading={true}
                                startIcon={<LoginIcon />}>
                                login
                            </LoadingButton>
                            <LoadingButton
                                size='small'
                                variant='contained'
                                color='primary'
                                onClick={(e) => {}}
                                isLoading={false}
                                startIcon={<LoginIcon />}>
                                login
                            </LoadingButton>
                        </>
                    )}
                    theme={null}>
                    <Typography variant='body1'>
                        The lorem ipsum gets its name from the Latin phrase Neque porro quisquam est qui dolorem
                        ipsum quia dolor sit amet. which translates to “Nor is there anyone who loves or pursues
                        or desires to obtain pain of itself, because it is pain.
                    </Typography>
                </CodeBlock>
            </Grid>
        </SubPageslayout>
    )
}

export default Buttons