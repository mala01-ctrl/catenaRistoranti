import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  makeStyles,
  withStyles,
  TableCell,
  TablePagination,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { MDBIcon } from "mdbreact";
import { Link } from "react-router-dom";

const TableRistoranti = ({
  rows,
  currentPage,
  pageSize,
  itemsCount,
  onPageChange,
  onChangeRowsPerPage,
}) => {
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });
  const classes = useStyles();
  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        {rows.length > 0 ? (
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Ristorante</StyledTableCell>
                <StyledTableCell align="left">Provincia</StyledTableCell>
                <StyledTableCell align="left">Via</StyledTableCell>
                <StyledTableCell align="left">Numero civico</StyledTableCell>
                <StyledTableCell align="left"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0 &&
                rows.map((row) => (
                  <StyledTableRow key={row.nome}>
                    <StyledTableCell component="th" scope="row">
                      {row.nome}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.provincia}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.via}</StyledTableCell>
                    <StyledTableCell align="left">
                      {row.num_civico}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <Link to={`/ristoranti/${row.id_ristorante}`}>
                        <MDBIcon icon="expand-arrows-alt" />
                      </Link>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        ) : (
          <h2 style={{ textAlign: "center" }}>Non ci sono ristoranti</h2>
        )}
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[4, 8, 12]}
        count={itemsCount}
        rowsPerPage={pageSize}
        page={currentPage}
        style={{ textAlign: "right" }}
        onChangePage={onPageChange}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </React.Fragment>
  );
};

export default TableRistoranti;
