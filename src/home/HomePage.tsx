import React from "react";
import { fetchDataAllProduct } from "../redux/reducer";
import { RootState, useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EventNoteIcon from "@material-ui/icons/EventNote";
import moment from "moment";
import styled from "styled-components";
import { Link, Outlet } from "react-router-dom";

const StyledTableCell = styled(TableRow)`
  .RECEIVED {
    color: blue;
  }
  .PENDING {
    color: grey;
  }
  .FULFILLED {
    color: green;
  }
  .PROCESSING {
    color: yellow;
  }
`;

const StyledFlex = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 15px 30px;
  button {
    margin: 0 8px;
  }
`;

function HomePage() {
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(fetchDataAllProduct(document.cookie.split("=")[1]));
  }, [dispatch]);

  const value = useSelector((state: RootState) => state.Products);
  console.log(value)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, value.length - page * rowsPerPage);

  return (
    <div style={{}}>
      <h1>Home Page</h1>
      <StyledFlex>
        <h3>Payroll Transactions List</h3>
        <Button variant="contained" color="primary">
          Export CSV
          <ExpandMoreIcon />
        </Button>
      </StyledFlex>
      <StyledFlex>
        <div>
          <Button variant="outlined">
            Status
            <ExpandMoreIcon />
          </Button>
          <Button variant="outlined">
            Client
            <ExpandMoreIcon />
          </Button>
          <Button variant="outlined">
            Form
            <EventNoteIcon />
          </Button>
          <Button variant="outlined">
            To
            <EventNoteIcon />
          </Button>
          <Button variant="outlined">Invoice #</Button>
        </div>
        <div>
          <Button variant="outlined" color="secondary">
            Apply
            <ExpandMoreIcon />
          </Button>
          <Button variant="outlined" color="primary">
            Clear
            <ExpandMoreIcon />
          </Button>
        </div>
      </StyledFlex>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Client</TableCell>
              <TableCell align="center">Currency</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center">Invoice #</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {value
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <StyledTableCell key={row.id}>
                  <TableCell className={`${row.status}`} align="center">
                    {row.status}
                  </TableCell>
                  <TableCell align="center">
                    {moment(`${row.createdAt}`).format("DD MMM YYYY")}
                  </TableCell>
                  <TableCell align="center">{row.client}</TableCell>
                  <TableCell align="center">{row.currency}</TableCell>
                  <TableCell align="center">
                    {row.total.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell align="center">{row.invoice}</TableCell>
                  <TableCell align="center">
                    <Link to={`/detailProduct/${row.id}`}>
                      <Button variant="outlined">
                        View Details <ExpandMoreIcon />
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell align="center">
                    <Link to={`/deleteProduct/${row.id}`}>
                      <DeleteIcon style={{ color: "red" }} />
                    </Link>
                  </TableCell>
                </StyledTableCell>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={value.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Outlet />
    </div>
  );
}

export default HomePage;
