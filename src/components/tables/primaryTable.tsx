import React, { FC } from 'react';
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
  component: FC | undefined
}

interface IPagination {
  pageSizeList: number[],
  pageSize: number,
  page: string,
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
  onNextPage?: Function,
  onPreviousPage?: Function,
  onFirstPage?: Function,
  onLastPage?: Function,
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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isEmpty = !(props.data && props.data.length)
  const data = props.data? props.data: []

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            {
              props.columnDefs.map((item, index) => <TableCell key={index}>{ item.header }</TableCell>)
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                  {
                    props.columnDefs.map((cell, cellIndex) => (
                      <TableCell key={cellIndex}>
                        { row && row.hasOwnProperty(cell.field)? row[cell.field]: null }
                      </TableCell>
                    ))
                  }
              </TableRow>
            ))
          }

          {
            isEmpty? (
              <TableRow>
                <TableCell colSpan={6} />
              </TableRow>
            ):null
          }
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              // component={'div'}
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={3}
              count={100}
              rowsPerPage={rowsPerPage}
              page={page}
              // SelectProps={{
              //   inputProps: {
              //     'aria-label': 'rows per page',
              //   },
              //   native: true,
              // }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default PrimaryTable;