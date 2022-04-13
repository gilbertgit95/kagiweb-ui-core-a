import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'

// note! allowed col Sizes are numbers that when devided to 12 the result is integer
const CheckList = (props) => {
    
    // compute the number of column to be rendered
    let colNum = 1
    let propSize = props.colSize? props.colSize: {}

    // check if the number is valid
    if (   propSize
        && Object.values(propSize)
        && Object.values(propSize).every(item => !Boolean(item % 1))) {
        colNum = 12 / Math.min(...Object.values(propSize))
    }

    let list = props.list? props.list: []

    // generate list divisions
    let groupList = []
    if (!list.length) {
        for (let i = 0; i < colNum; i++) {
            // push empty arrays
            groupList.push([])
        }
    } else {
        let groupSize = Math.ceil(list.length / colNum)
        for (let i = 0; i < colNum; i++) {
            // push empty arrays
            groupList.push(list.slice(i * groupSize, i * groupSize + groupSize))
        }
    }

    const onChange = (e) => {
        if (props.onChange) {
            props.onChange({
                key: e.target.value,
                checked: e.target.checked
            })
        }
    }

    return (
        <Grid container spacing={2}>
            {
                groupList.map((subList, subListIndex) => {
                    return (
                        <Grid
                            { ...propSize }
                            key={'listCols' + subListIndex}
                            style={{padding: 0}}
                            item>
                            <FormGroup>
                                {
                                    subList.map((item, index) => {
                                        return (
                                             <FormControlLabel
                                                disabled={item.disabled}
                                                control={<Checkbox value={item.key} checked={item.checked} />}
                                                onChange={onChange}
                                                label={ item.label }
                                                key={ item.label + index } />
                                        )
                                    })
                                }
                            </FormGroup>
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}

export default CheckList