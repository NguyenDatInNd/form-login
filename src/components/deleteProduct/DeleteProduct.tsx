import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Dialog,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import React from "react";
import { useAppDispatch } from "../../redux/store";
import { fetchDeleteProduct } from "../../redux/reducer";

function DeleteProduct() {
  const { index } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleDel = () => {
    dispatch(
      fetchDeleteProduct({ id: index, token: document.cookie.split("=")[1] })
    );
    navigate("/");
  };
  return (
    <>
      <Dialog open={true} fullWidth={true}>
        <Container maxWidth="sm" sx={{ backgroundColor: "white" }}>
          <Typography
            variant="h6"
            sx={{ padding: "10px 0px ", fontWeight: "bold", color: "#1b3e67" }}
          >
            Delete value
          </Typography>
          <Divider />
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ padding: "10px 0px ", fontWeight: "bold", color: "#333" }}
            >
              Are you sure you want to delete this value?
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ padding: "15px 0" }}>
            <Button
              variant="contained"
              onClick={(e) => navigate("/")}
              sx={{
                color: "#1b3e67",
                fontWeight: "750",
                backgroundImage: "linear-gradient(0, #ded9d9, #fff)",
                textTransform: "capitalize ",
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleDel}
              style={{
                color: "#fff",
                fontWeight: "750",
                backgroundColor: "red",
                textTransform: "capitalize",
                float: "right",
                paddingLeft: "34px",
              }}
            >
              <DeleteOutlineIcon />
              Delete
            </Button>
          </Box>
        </Container>
      </Dialog>
    </>
  );
}

export default DeleteProduct;
