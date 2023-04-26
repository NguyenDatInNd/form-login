import React from "react";
import { fetchInforUser } from "../../redux/reducer";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";

function Profile() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchInforUser(document.cookie.split("=")[1]));
  }, [dispatch]);

  const { email, name, description, avatar, region, state } = useSelector(
    (state: RootState) => state.InforUser
  );

  const handleLogOut = () => {};

  const [isAvatarLoaded, setIsAvatarLoaded] = React.useState(false);

  return (
    <>
      <Card style={{ height: "500px", width: "500px", margin: "0 auto" }}>
        <Avatar
          src={avatar ? `http://api.training.div3.pgtest.co/${avatar}` : ""}
          style={{ height: "120px", width: "120px", margin: "0 auto" }}
        >
          {avatar ? "" : name?.charAt(0)?.toUpperCase()}
        </Avatar>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h1">
            Email
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            {email}
          </Typography>
          <Typography gutterBottom variant="h5" component="h1">
            Name
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            {name}
          </Typography>
          <Typography gutterBottom variant="h5" component="h1">
            Description
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            {description}
          </Typography>
          <Typography gutterBottom variant="h5" component="h1">
            Region
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            {region}
          </Typography>
          <Typography gutterBottom variant="h5" component="h1">
            State
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            {state}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="medium"
            color="primary"
            variant="contained"
            style={{ margin: "0 auto" }}
            onClick={handleLogOut}
          >
            Log Out
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default Profile;
