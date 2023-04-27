import React from "react";
import { fetchDataAllProduct, filterClient, filterStatus } from "../redux/reducer";
import { RootState, useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import {
  Button,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
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
    height:56px
  }
`;

function HomePage() {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [status, setStatus] = React.useState("");
  const [client, setClient] = React.useState("");
  
  const options = [
    { value: "RECEIVED" },
    { value: "PENDING" },
    { value: "FULFILLED" },
    { value: "PROCESSING" },
    { value: "" },
  ];

  const handleChangeClient = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClient(event.target.value);
    dispatch(filterClient(event.target.value))
  };

  const handleChangeStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value);
    dispatch(filterStatus(event.target.value))
  };

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(fetchDataAllProduct(document.cookie.split("=")[1]));
  }, [dispatch, status , client]);

  const value = useSelector((state: RootState) => state.Products);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
          <TextField
            style={{width:"150px"}}
            variant="filled"
            size="medium"
            select
            label="Select"
            value={status}
            onChange={handleChangeStatus}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value === "" ? "-" : option.value}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            style={{width:"150px", marginLeft:"10px", marginRight:"5px"}}
            variant="filled"
            size="medium"
            label="Client"
            value={client}
            onChange={handleChangeClient}
          />
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
                    {moment(`${row.updatedAt}`).format("DD MMM YYYY")}
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
