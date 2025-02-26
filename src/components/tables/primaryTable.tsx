import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// table:
//     columnDefs: column definations
//     onClick: method that callsback the rows ang column that has been clicked

//     enableSelection: show selectbox
//     enableMultipleSelection: if true then use selectbox else use radio button
//     onSelect: callsback when doing selection

//     maxHeight: value in pixel
//     data: arrays of data rows
//     pagination: recieves paggination data like max, limit, page number and so on
//     onNextPage: callback when triggering next page button
//     onPreviousPage: callback when triggering previous button
//     onFirstPage: callback when triggering firstpage button
//     onLastPage: callback when triggering lastpage button

//     isLoading: show loading indicator and disable the table interactions
export interface IColDef {
  header: string,
  field: string,
  Component?: React.ElementType
}

interface IPagination {
  pageSizeList: number[],
  pageSize: number,
  page: number,
  totalItems: number
}

export interface IPrimaryTableProps {
  noHeader?: boolean,
  maxHeight?: number,
  minimalStyle?: boolean,

  columnDefs: IColDef[],
  data?: any[],
  onClick?: Function,

  enableSelection?: boolean,
  enableMultipleSelection?: boolean,
  onSelect?: (selected:string[]) => void,

  pagination?: IPagination,
  onPageChange?: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => void,
  onRowsPerPageChange?:(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    rowsPerPage: number,
  ) => void
}

interface ITablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

interface IStyledTableRowProps {
  minimalStyle?: boolean
}

const StyledTableRow = styled(TableRow, {
  shouldForwardProp: (prop) => prop !== "primary"
})<IStyledTableRowProps>(({ theme, minimalStyle }) => {

  if (minimalStyle) {
    return {
      'tr, td, th': {
        border: 0,
        padding: 0,
        paddingLeft: 10,
        paddingRight: 10,
        margin: 0,
        backgroundColor: 'transparent'
      }
    }
  } else {
    return {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
      // hide last border
      '&:last-child td, &:last-child th': {
        border: 0,
      }
    }
  }
})

function TablePaginationActions(props: ITablePaginationActionsProps) {
  const theme = useTheme()
  const { count, page, rowsPerPage, onPageChange } = props

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page">
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page">
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

function PrimaryTable(props:IPrimaryTableProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  // const [transformedData, setTransformedData] = useState()
  // const [dataTransformation, setDataTransformation] = useState({
  //   searchField: '',
  //   searchKey: '',
  //   filterField: '',
  //   filterKey: '',
  //   sortField: '',
  //   sortKey: ''
  // })

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    if (props.onPageChange) {
      props.onPageChange(event, newPage)
      onToggleSelectAll(false)
    }
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (props.onRowsPerPageChange) {
      props.onRowsPerPageChange(event, parseInt(event.target.value, 10))
      onToggleSelectAll(false)
    }
  }

  const onToggleSelectAll = (value:boolean) => {
    if (!props.enableSelection) return

    let items:string[] = []
    if (value) items = props?.data?.map(item => item._id) || []
    setSelectedItems(items)
    onSelect(items)
  }

  const onToggleSelectRow = (row:any, value:boolean) => {
    if (!props.enableSelection) return

    let items:string[] = []

    // only execute when enableMultipleSelection is true
    if (props.enableMultipleSelection) items = [...selectedItems]

    const index = items.indexOf(row._id)

    // if toggled is not in the selection
    if (index === -1) {
      if (value) items.push(row._id)

    // if toggled is in the selection
    } else {
      if (!value) items.splice(index, 1)
    }

    setSelectedItems(items)
    onSelect(items)
  }

  const onSelect = (data:string[]) => {
    if (props.enableSelection && props.onSelect) {
      props.onSelect(data)
    }
  }

  useEffect(() => {
    setSelectedItems([])
  }, [props.data, props.pagination])

  // data filtering and sorting
  useEffect(() => {

  })

  // select box related variables
  const selectionMap = new Set(selectedItems)

  const data = props.data? props.data: []
  const noEmptyCells = props.pagination?.pageSize? props.pagination?.pageSize - data.length: 0

  return (
    <>
      <TableContainer sx={{ width: '100%', maxHeight: props?.maxHeight, overflow: 'auto' }} component={Paper}>
        <Table stickyHeader aria-label="custom pagination table">
          {
            props.noHeader? null: (
              <TableHead>
                <TableRow sx={{bgColor: 'text.secondary'}}>
                  {
                    // show select all checkbox
                    props.enableSelection? (
                      <TableCell>
                        {
                          props.enableMultipleSelection? (
                            <Checkbox
                              size="small"
                              onChange={(e) => {
                                onToggleSelectAll(e.target.checked)
                              }}
                              checked={Array.from(selectionMap).length === data.length} />
                          ): null
                        }
                      </TableCell>
                    ): null
                  }
                  {
                    props.columnDefs.map((item, index) => (
                      <TableCell key={index}>
                        <Typography variant="body1" color="primary">{ item.header }</Typography>
                      </TableCell>
                    ))
                  }
                </TableRow>
              </TableHead>
            )
          }
          <TableBody>
            {
              data.map((row, rowIndex) => (
                <StyledTableRow minimalStyle={props.minimalStyle} key={rowIndex}>
                    {
                      props.enableSelection? (
                        <TableCell>
                          {
                            props.enableMultipleSelection? (
                              <Checkbox
                                size="small"
                                onChange={(e) => {
                                  onToggleSelectRow(row, e.target.checked)
                                }}
                                checked={ selectionMap.has(row._id) } />
                            ): (
                              <Radio
                                size="small"
                                onChange={(e) => {
                                  onToggleSelectRow(row, e.target.checked)
                                }}
                                checked={ selectionMap.has(row._id) } />
                            )
                          }
                        </TableCell>
                      ): null
                    }
                    {
                      props.columnDefs.map((cell, cellIndex) => (
                        cell.Component? (
                          <TableCell key={cellIndex}>
                            <cell.Component {...row} />
                          </TableCell>
                        ): (
                          <TableCell key={cellIndex}>
                            { row && row.hasOwnProperty(cell.field)? row[cell.field]: null }
                          </TableCell>
                        )
                      ))
                    }
                </StyledTableRow>
              ))
            }

            {
              noEmptyCells? (
                <StyledTableRow minimalStyle={props.minimalStyle} style={{ height: 69 * noEmptyCells }}>
                  <TableCell colSpan={props.columnDefs.length}></TableCell>
                </StyledTableRow>
              ): null
            }
          </TableBody>
        </Table>
      </TableContainer>
      {
        props.pagination? (
          <TablePagination
            component="div"
            sx={{ width: '100%' }}
            colSpan={props.columnDefs.length}
            rowsPerPageOptions={props.pagination.pageSizeList}
            count={props.pagination.totalItems}
            rowsPerPage={props.pagination.pageSize}
            page={props.pagination.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        ): null
      }
    </>
  );
};

export default PrimaryTable;