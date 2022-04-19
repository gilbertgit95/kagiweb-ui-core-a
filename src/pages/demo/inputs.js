import { useEffect, useState } from 'react'
import subpages from './lib/subPages'

import SubPageslayout from '../../common/layouts/subPagesLayout'

// import Link from '@mui/material/Link'
// import Container from '@mui/material/Container'
// import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
// import TextField from '@mui/material/TextField'
// import LoginIcon from '@mui/icons-material/Login'
// import Button from '@mui/material/Button'

import CodeBlock from '../../common/blocks/codeBlock'
import CheckList from '../../common/inputs/checkList'
import RadioList from '../../common/inputs/radioList'
// import AccountContext from '../../common/contexts/accountContext'

const SelectListSampleCode = `
// in import section
import CheckList from '/common/inputs/checkList'
import { useState } from 'react'

// ...in component section
// in the state section
const [items, setItems] = useState([
    { checked: false, disabled: true, key: '001', label: 'Item number 1'},
    { checked: false, disabled: false, key: '002', label: 'Item number 2'},
    { checked: false, disabled: false, key: '003', label: 'Item number 3'},
    { checked: false, disabled: false, key: '004', label: 'Item number 4'},
    { checked: false, disabled: false, key: '005', label: 'Item number 5'},
    { checked: true, disabled: false, key: '006', label: 'Item number 6'}
])

// in the methods section
const onChangeChecklist = (e) => {
    if (e) {
        let checkItems = items.map(item => {
            if (e.key === item.key) item.checked = e.checked
            return item
        })

        setItems(checkItems)
    }
}

// in the render section
return (
    <CheckList
        onChange={onChangeChecklist}
        colSize={{xs: 12, sm: 6, md: 3}}
        list={items} />
)
`
const RadioListSampleCode = `
// in import section
import RadioList from '/common/inputs/radioList'
import { useState } from 'react'

// ...in component section
// in the state section
const [selectedRadio, setSelectedRadio] = useState(null)
const radioItems = [
    { disabled: true, key: '001', label: 'Item number 1'},
    { disabled: false, key: '002', label: 'Item number 2'},
    { disabled: false, key: '003', label: 'Item number 3'},
    { disabled: false, key: '004', label: 'Item number 4'},
    { disabled: false, key: '005', label: 'Item number 5'},
    { disabled: false, key: '006', label: 'Item number 6'}
]

// in the methods section
const onChangeRadiolist = (e) => {
    if (e) {
        setSelectedRadio(e.key)
    }
}

// in the render section
return (
    <RadioList
        radioListName='testRadio'
        onChange={onChangeRadiolist}
        selected={selectedRadio}
        colSize={{xs: 12, sm: 6, md: 3}}
        list={radioItems} />
)
`

const Inputs = (props) => {
    const [isLoading, setIsLoading] = useState(true)
    const [items, setItems] = useState([
        { checked: false, disabled: true, key: '001', label: 'Item number 1'},
        { checked: false, disabled: false, key: '002', label: 'Item number 2'},
        { checked: false, disabled: false, key: '003', label: 'Item number 3'},
        { checked: false, disabled: false, key: '004', label: 'Item number 4'},
        { checked: false, disabled: false, key: '005', label: 'Item number 5'},
        { checked: true, disabled: false, key: '006', label: 'Item number 6'}
    ])
    const [selectedRadio, setSelectedRadio] = useState(null)
    const radioItems = [
        { disabled: true, key: '001', label: 'Item number 1'},
        { disabled: false, key: '002', label: 'Item number 2'},
        { disabled: false, key: '003', label: 'Item number 3'},
        { disabled: false, key: '004', label: 'Item number 4'},
        { disabled: false, key: '005', label: 'Item number 5'},
        { disabled: false, key: '006', label: 'Item number 6'}
    ]
    // const ctx = useContext(AccountContext)

    // const btnClicked = (e) => {
    //     ctx.setAccountContext({testVal: 'Home test value from context'})
    // }

    const onChangeChecklist = (e) => {
        if (e) {
            let checkItems = items.map(item => {
                if (e.key === item.key) item.checked = e.checked
                return item
            })

            setItems(checkItems)
        }
        // console.log(e)
    }

    const onChangeRadiolist = (e) => {
        if (e) {
            setSelectedRadio(e.key)
        }
    }

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
                    title={'Checkbox List Component'}
                    description={`The lorem ipsum gets its name from the Latin phrase Neque porro quisquam est qui dolorem
                    ipsum quia dolor sit amet. which translates to “Nor is there anyone who loves or pursues
                    or desires to obtain pain of itself`}
                    code={SelectListSampleCode}
                    language={'jsx'}
                    showLineNumbers={true}
                    rendered={(
                        <CheckList
                            onChange={onChangeChecklist}
                            colSize={{xs: 12, sm: 6, md: 3}}
                            list={items} />
                    )}>
                    <Typography variant='body1'>
                        The lorem ipsum gets its name from the Latin phrase Neque porro quisquam est qui dolorem
                        ipsum quia dolor sit amet. which translates to “Nor is there anyone who loves or pursues
                        or desires to obtain pain of itself, because it is pain.
                    </Typography>
                </CodeBlock>

                <CodeBlock
                    isLoading={isLoading}
                    title={'Radio List Component'}
                    description={`The lorem ipsum gets its name from the Latin phrase Neque porro quisquam est qui dolorem
                    ipsum quia dolor sit amet. which translates to “Nor is there anyone who loves or pursues
                    or desires to obtain pain of itself`}
                    code={RadioListSampleCode}
                    language={'jsx'}
                    showLineNumbers={true}
                    rendered={(
                        <RadioList
                            radioListName='testRadio'
                            onChange={onChangeRadiolist}
                            selected={selectedRadio}
                            colSize={{xs: 12, sm: 6, md: 3}}
                            list={radioItems} />
                    )}>
                    <Typography variant='body1'>
                        The lorem ipsum gets its name from the Latin phrase Neque porro quisquam est qui dolorem
                        ipsum quia dolor sit amet. which translates to “Nor is there anyone who loves or pursues
                        or desires to obtain pain of itself, because it is pain.
                        The lorem ipsum gets its name from the Latin phrase Neque porro quisquam est qui dolorem
                        ipsum quia dolor sit amet. which translates to “Nor is there anyone who loves or pursues
                        or desires to obtain pain of itself, because it is pain.
                    </Typography>
                </CodeBlock>
            </Grid>
        </SubPageslayout>
    )
}

export default Inputs