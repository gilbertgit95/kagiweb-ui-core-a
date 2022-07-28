import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import TripOriginIcon from '@mui/icons-material/TripOrigin'
import Grid from '@mui/material/Grid'

const variants = new Set(['unordered', 'ordered'])

// note! allowed col Sizes are numbers that when devided to 12 the result is integer
const BasicList = (props) => {
    
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
    let variant = props.variant && variants.has(props.variant)? props.variant: 'unordered'

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

    // inital count is 0
    let itemCount = 0

    return (
        <Grid container spacing={2}>
            {
                groupList.map((subList, subListIndex) => {
                    return (
                        <Grid
                            { ...propSize }
                            key={'listCols' + subListIndex}
                            style={{...{padding: 0}, ...(props.style? props.style: {})}}
                            item>
                            <List dense={true} style={{padding: 0, margin: 'auto'}}>
                                {
                                    subList.map((item, index) => {
                                        itemCount++

                                        return (
                                            <ListItem key={item + index}>
                                                <ListItemIcon style={{minWidth: 30}}>
                                                    {
                                                        variant === 'ordered'? (
                                                            <Typography color='primary' variant='subtitle1'>{ itemCount }.</Typography>
                                                        ): <TripOriginIcon color='primary' />
                                                    }
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={ item } />
                                            </ListItem>
                                        )
                                    })
                                }
                            </List>
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}

export default BasicList