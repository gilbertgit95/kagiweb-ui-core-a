import { NoEncryption } from '@mui/icons-material'
import Typography from '@mui/material/Typography'

const KeyValueBlock = (props) => {
    let data = props.data? props.data: []
    let style = props.style? props.style: {}

    return (
        <table border='0' cellSpacing='0' style={style}>
            <tbody>
                {
                    data.map((row, rowIndex) => {
                        return (
                            <tr key={ 'row_' + rowIndex }>
                                <td style={{...styles.td, ...styles.key}}>
                                    <Typography
                                        color='primary'
                                        variant='body1'>
                                        { row.key }
                                    </Typography>
                                </td>
                                <td style={{...styles.td, ...styles.value}}>
                                    <Typography
                                        variant='body1'>
                                        { row.value }
                                    </Typography>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

const styles = {
    key: {
        // textAlign: 'right',
        // borderRight: '1px solid'
    },
    value: {
        lineBreak: 'anywhere',
    },
    td: {
        padding: 10,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 5,
        verticalAlign: 'top'
    }
}

export default KeyValueBlock