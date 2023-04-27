import {
  Button,
  Container,
  Dialog,
  Divider,
  Typography,
  Box,
  TextField,
  MenuItem,
} from "@material-ui/core";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import React from "react";
import moment from "moment";
import { fetchDataProductById, fetchUpdateProduct } from "../../redux/reducer";

const Input = styled(TextField)`
  margin: 10px;
`;

function DetailProduct() {
  const { index } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const options = [
    { value: "RECEIVED" },
    { value: "PENDING" },
    { value: "FULFILLED" },
    { value: "PROCESSING" },
  ];

  React.useEffect(() => {
    dispatch(
      fetchDataProductById({ id: index, token: document.cookie.split("=")[1] })
    );
  }, [dispatch]);

  const value = useSelector((state: RootState) => state.ProductByID);
  const [status, setStatus] = React.useState("");
  const [total, setTotal] = React.useState("");
  const totalFormat = Number(total);
  const id = Number(index);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value);
  };

  const handleUpdate = () => {
    // update field status & total
    dispatch(
      fetchUpdateProduct({
        id: id,
        order: value.order,
        status: status,
        currency: value.currency,
        total: totalFormat,
        fundingMethod: value.fundingMethod,
        token: document.cookie.split("=")[1],
      })
    );
    navigate("/");
  };
  return (
    <>
      {!!value && (
        <Dialog open={true} fullWidth={true}>
          <Container maxWidth="sm" style={{ backgroundColor: "white" }}>
            <Typography
              variant="h6"
              style={{
                padding: "10px 0px ",
                fontWeight: "bold",
                color: "#1b3e67",
              }}
            >
              Update value
            </Typography>
            <Divider />
            <Box>
              <section>
                <TextField
                  style={{ margin: "10px" }}
                  select
                  fullWidth
                  label="Status"
                  value={status || ""}
                  onChange={handleChange}
                >
                  {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
              </section>
              <section>
                <Input
                  disabled
                  fullWidth
                  label="Date"
                  value={moment(`${value.createdAt}`).format("DD MMM YYYY")}
                ></Input>
              </section>
              <section>
                <Input
                  value={value.client || ""}
                  disabled
                  fullWidth
                  label="Client"
                ></Input>
              </section>
              <section>
                <Input
                  disabled
                  value={value.currency || ""}
                  fullWidth
                  label="Currency"
                />
              </section>
              <section>
                <Input
                  value={total || ""}
                  fullWidth
                  onChange={(e) => setTotal(e.target.value)}
                  label="Total"
                ></Input>
              </section>
              <section>
                <Input
                  disabled
                  value={value.invoice || ""}
                  fullWidth
                  label="Invoice"
                ></Input>
              </section>
            </Box>
            <Divider />
            <Box sx={{ padding: "15px 0" }}>
              <Button
                variant="contained"
                onClick={(e) => navigate("/")}
                style={{
                  color: "#1b3e67",
                  fontWeight: "750",
                  backgroundImage: "linear-gradient(0, #ded9d9, #fff)",
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleUpdate}
                style={{
                  color: "#fff",
                  fontWeight: "750",
                  backgroundColor: "blue",
                  textTransform: "capitalize",
                  float: "right",
                  paddingLeft: "34px",
                }}
              >
                Update
              </Button>
            </Box>
          </Container>
        </Dialog>
      )}
    </>
  );
}

export default DetailProduct;
