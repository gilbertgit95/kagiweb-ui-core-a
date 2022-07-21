import { useState, useEffect, useRef } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
// import Paper from '@mui/material/Paper'
import InputAdornment from '@mui/material/InputAdornment'
import TablePagination from '@mui/material/TablePagination'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { TextField, Paper, useTheme } from '@mui/material'

import DebouncingTextField from '../inputs/debouncingTextField'
import { Typography } from '@mui/material'

const InteractiveTable = (props) => {
    const [states, setStates] = useState({
        headers: props.headers? props.headers: [],
        rows: props.rows? props.rows: [],
        searchText: '',
        searchField: '__',
        page: 0,
        rowsPerPage: 10,
        selectedRows: new Set([])
    })
    const [popupStates, setPopupStates] = useState({
        show: false,
        row: null,
        col: null
    })
    const tableDataPopup = useRef()
    const textFieldPopup = useRef()
    const theme = useTheme()

    const onSearchText = (value) => {
        setStates({...states, ...{ searchText: value, page: 0, }})
    }

    const handleChangePage = (event, newPage) => {
        setStates({...states, ...{ page: newPage }})
    }
    
    const handleChangeRowsPerPage = (event) => {
        setStates({...states, ...{
            page: 0,
            rowsPerPage: parseInt(event.target.value, 10)
        }})
    }

    const handleSearchFieldChange = (event) => {
        setStates({...states, ...{
            searchField: event.target.value
        }})
    }

    const handleClickFromStringData = (e, row, col) => {
        // console.log('boboy boluk!', e.target.getBoundingClientRect(), tableDataPopup.current.style)
        if (e && e.target && e.target.getBoundingClientRect) {
            let boundRect = e.target.getBoundingClientRect()

            setPopupStates({...popupStates, ...{ show: true, row, col }})
            tableDataPopup.current.style.left = boundRect.left + 'px'
            tableDataPopup.current.style.top = boundRect.top + 'px'
            tableDataPopup.current.style.width = boundRect.width + 'px'
            tableDataPopup.current.style.height = boundRect.height + 'px'

            // console.log(row, col)
            textFieldPopup.current.value = row[col.field]
            setTimeout(() => {
                textFieldPopup.current.focus()
            }, 100)
        }
    }

    const handleDoubleClickData = (e, row, col) => {
        // onclick call from a string data
        if (   col.type === 'string'
            && col.isEditable) {
            handleClickFromStringData(e, row, col)
        }
    }

    const emitSelected = (selected) => {
        if (props.onSelect) {
            props.onSelect(selected)
        }
    }

    const emitPopupChanges = () => {
        let row = popupStates.row
        let col = popupStates.col
        let value = textFieldPopup.current.value

        if (props.onChange) {
            props.onChange(row, col, value)
        }

        setPopupStates({...popupStates, ...{ show: false }})
    }

    useEffect(() => {
        setStates({...states, ...{
            rows: props.rows? props.rows: [],
            headers: props.headers? props.headers: []
        }})
        // console.log(props.rows)
    }, [props.rows, props.headers])

    // filter by search
    let filteredRows = states.rows.filter((row) => {
        let field = states.searchField
        let text = states.searchText.toLowerCase()
        let fieldValue = ''

        // search for all props
        if (field === '__') {
            fieldValue = states.headers.reduce((acc, header) => {
                acc += row[header.field]? row[header.field]: ''
                return acc
            }, '')
        } else {
        // search only on a specific field
            fieldValue = row[field]
        }
        fieldValue = fieldValue.toLowerCase()

        return fieldValue.indexOf(text) > -1
    })

    // console.log('filtered rows: ', filteredRows)
    // console.log('props rows: ', props.rows)

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={3}>
                <DebouncingTextField
                    fullWidth
                    size='small'
                    label='Search in table'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                    onChange={ onSearchText } />
            </Grid>
            <Grid item xs={12} sm={3} md={3}>
                <FormControl fullWidth>
                    <InputLabel id='search_field_label' size='small'>Search Field</InputLabel>
                    <Select
                        labelId='search_field_label'
                        id='search_field'
                        label='Search Field'
                        size='small'
                        value={ states.searchField }
                        onChange={ handleSearchFieldChange }>
                        <MenuItem value={'__'}>All Fields</MenuItem>
                        {
                            states.headers
                                .filter(item => item.type === 'string')
                                .map((item, index) => (
                                    <MenuItem key={ `searchfield${ item.field }_${ index }` } value={ item.field }>{ item.label }</MenuItem>
                                ))
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid
                sx={{ paddingLeft: { xs: 0 }, textAlign: 'left' }}
                item xs={12} sm={5} md={6}>
                { props.rightSideComponents? props.rightSideComponents: null }
            </Grid>
            <Grid item xs={12}>
                <TableContainer>
                    <Table aria-label="interactive table">
                        <TableHead>
                            <TableRow>
                                {/* checkbox all */}
                                {
                                    props.hasCheckBox? (
                                        <TableCell width={ 10 }>
                                            <Checkbox
                                                size='small'
                                                style={{ padding: 0 }}
                                                onChange={(e) => {
                                                    let selectAll = e.target.checked
                                                    let selectedRows = []

                                                    if (selectAll) {
                                                        selectedRows = new Set(states.rows.map(item => item.id))
                                                    }

                                                    emitSelected(Array.from(selectedRows))
                                                    setStates({...states, ...{selectedRows: new Set(selectedRows)}})
                                                }}
                                                checked={Array.from(states.selectedRows).length === states.rows.length} />
                                        </TableCell>
                                    ): null
                                }

                                {/* other headers */}
                                {
                                    states.headers.map((item, index) => (
                                        <TableCell key={ `tableheader${ item.field }_${ index }` }>{ item.label }</TableCell>
                                    ))
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            
                            filteredRows
                                // sluice for pagination
                                .slice(
                                    states.page * states.rowsPerPage,
                                    states.page * states.rowsPerPage + states.rowsPerPage
                                )
                                // render rows
                                .map((row, rowIndex) => (
                                    <TableRow
                                        key={'tablerow' + rowIndex}
                                        sx={{
                                            '&:nth-of-type(even)': { backgroundColor: theme.palette.primary.main + '10' },
                                            '&:nth-of-type(odd)': { backgroundColor: theme.palette.primary.main + '30' },
                                            'td': { border: 0 }
                                        }}>
                                        {/* checkbox row */}
                                        {
                                            props.hasCheckBox? (
                                                <TableCell width={ 10 }>
                                                    <Checkbox
                                                        size='small'
                                                        style={{ padding: 0 }}
                                                        onChange={(e) => {
                                                            let selectRow = e.target.checked
                                                            let selectedRows = states.selectedRows

                                                            if (selectRow) {
                                                                selectedRows.add(row.id)
                                                            } else {
                                                                selectedRows.delete(row.id)
                                                            }

                                                            emitSelected(Array.from(selectedRows))
                                                            setStates({...states, ...{ selectedRows }})
                                                        }}
                                                        checked={ states.selectedRows && states.selectedRows.has(row.id) } />
                                                </TableCell>
                                            ): null
                                        }

                                        {/* man data rows */}
                                        {
                                            states.headers.map((col, colIndex) => (
                                                <TableCell
                                                    {...(col.width? {width: col.width}: {})}
                                                    key={ `table data${ col.field }_${ rowIndex }${ colIndex }` }
                                                    onDoubleClick={(e) => handleDoubleClickData(e, row, col)}>
                                                    {
                                                        col.type === 'string'?
                                                            row[col.field]:
                                                            col.render({
                                                                onClick() {
                                                                    if (props.onInteract) props.onInteract({ row, col})
                                                                }
                                                            },{ row, col })
                                                    }
                                                </TableCell>
                                            ))
                                        }
                                    </TableRow>
                                ))
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
    
                {/* table edit popups */}
                <Paper
                    sx={{
                        padding: '5px',
                        boxShadow: 'none',
                        background: 'transparent',
                        position: 'absolute', top: 0,
                        visibility: popupStates.show? 'visible': 'hidden'
                    }}
                    onBlur={() => {
                        setPopupStates({...popupStates, ...{ show: false }})
                    }}
                    ref={tableDataPopup}>
                    <TextField
                        fullWidth
                        inputRef={textFieldPopup}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                emitPopupChanges()
                            }
                        }}
                        sx={{ backgroundColor: theme.palette.background.default }}
                        size='small'
                        variant='outlined' />
                </Paper>

                {/* display if table is empty */}
                {
                    filteredRows && filteredRows.length? (
                        <TablePagination
                            component='div'
                            count={filteredRows.length}
                            page={states.page}
                            rowsPerPage={states.rowsPerPage}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage} />
                    ): (
                        <Box>
                            <Typography
                                style={{ textAlign: 'center', padding: 10 }}
                                variant='body1'>
                                No Content
                            </Typography>
                        </Box>
                    )
                }
            </Grid>
        </Grid>
    )
}

export default InteractiveTable