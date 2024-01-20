import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Typography } from '@mui/material';

// table:
//     columnDefs: column definations
//     onClick: method that callsback the rows ang column that has been clicked

//     enableSelection: show selectbox
//     enableMultipleSelection: if true then use selectbox else use radio button
//     onSelect: callsback when doing selection

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
  Component: React.ElementType | undefined
}

interface IPagination {
  pageSizeList: number[],
  pageSize: number,
  page: number,
  totalItems: number
}

interface IPrimaryTableProps {
  columnDefs: IColDef[],
  data?: any[],
  onClick?: Function,

  enableSelection?: boolean,
  enableMultipleSelection?: boolean,
  onSelect?: Function,

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

function TablePaginationActions(props: ITablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

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

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    if (props.onPageChange) {
      props.onPageChange(event, newPage)
    }
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (props.onRowsPerPageChange) {
      props.onRowsPerPageChange(event, parseInt(event.target.value, 10))
    }
  };

  const isEmpty = !(props.data && props.data.length)
  const data = props.data? props.data: []

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            {
              props.columnDefs.map((item, index) => (
                <TableCell key={index}>
                  <Typography variant="body1" color="primary">{ item.header }</Typography>
                </TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
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
              </TableRow>
            ))
          }

          {
            isEmpty? (
              <TableRow>
                <TableCell colSpan={props.columnDefs.length} />
              </TableRow>
            ):null
          }
        </TableBody>
        {
          props.pagination? (
              <TableFooter>
                <TableRow>
                  <TablePagination
                    colSpan={props.columnDefs.length}
                    rowsPerPageOptions={props.pagination.pageSizeList}
                    count={props.pagination.totalItems}
                    rowsPerPage={props.pagination.pageSize}
                    page={props.pagination.page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
          ): null
        }
      </Table>
    </TableContainer>
  );
};

export default PrimaryTable;