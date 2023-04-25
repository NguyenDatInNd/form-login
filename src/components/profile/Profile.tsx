import React from "react";
import { fetchInforUser } from "../../redux/reducer";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";

function Profile() {
    const dispatch = useAppDispatch()
    React.useEffect(()=> {
        dispatch(fetchInforUser(document.cookie.split("=")[1]))
    }, [dispatch])
    const { email, name, description, avatar, region, state } = useSelector((state: RootState) => state.InforUser);
  return (
    <>
      <h4>{name}</h4>
      <h4>{email}</h4>
      <h4>{description}</h4>
      <h4>{region}</h4>
      <h4>{state}</h4>
      <img src={`http://api.training.div3.pgtest.co/${avatar}`}/>
    </>
  );
}

export default Profile;
