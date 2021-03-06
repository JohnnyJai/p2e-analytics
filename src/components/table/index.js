import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { useTable } from "react-table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

export default function StickyHeadTable({ data }) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Timestamp",
        accessor: (row) =>
          new Date(row.timestep).toISOString().substring(0, 10), // You format date here
      },
      {
        Header: "Mint",
        accessor: "mint",
      },
      {
        Header: "Burn",
        accessor: "burn",
      },
      {
        Header: "Mint vs Burn",
        accessor: "mintVsBurn",
      },
      {
        Header: "Total supply",
        accessor: "totalSupply",
      },
    ],
    []
  );
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }} elevation={6}>
      <TableContainer
        sx={{ maxHeight: "calc(50vh - 75px)" }}
        {...getTableProps()}
      >
        <Table className="table" stickyHeader aria-label="sticky table">
          {headerGroups.map((headerGroup) => (
            <TableHead {...headerGroup.getHeaderGroupProps()}>
              <TableRow>
                {headerGroup.headers.map((column) => (
                  <TableCell {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          ))}
          <TableBody {...getTableBodyProps()}>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => {
                prepareRow(row);
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    {...row.getRowProps()}
                    className="table-row"
                  >
                    {row.cells.map((cell) => {
                      return (
                        <TableCell {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
