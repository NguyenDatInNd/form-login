import React, { useRef, useState, ChangeEvent } from "react";
import { fetchInforUser } from "../../redux/reducer";
// import { TypeConstant, ResolveType, ActionCreatorTypeMetadata } from './type-helpers';
import { RootState, useAppDispatch } from "../../redux/store";
import ReactCrop from "react-image-crop";
import { useSelector } from "react-redux";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";

export interface IUser {
  id: number;
  email: string;
  name: string;
  gender: string;
  avatar: string;
  region: number;
  state: number;
  description: string;
}

const getCanvasBlob = (canvas: any): any => {
  return new Promise(function (resolve) {
    canvas.toBlob(
      (blob: any) => {
        resolve(blob);
      },
      "image/jpeg",
      1
    );
  });
};

const generateAvatarUpload = async (canvas: any, crop: any) => {
  if (!crop || !canvas) {
    return null;
  }
  let file = null;
  const blobCanvas: Blob = await getCanvasBlob(canvas);
  file = new File([blobCanvas], "avatar.jpeg", { type: "image/jpeg" });
  return file;
};

// export const setUserInfo = createCustomAction('auth/setUserInfo', (data: IUser) => ({
//   data,
// }));

// export declare function createCustomAction<TType extends TypeConstant, TArgs extends any[] = [], TReturn extends any = {}>(type: TType, createHandler?: (...args: TArgs) => TReturn): ((...args: TArgs) => ResolveType<{
//   type: TType;
// } & TReturn>) & ActionCreatorTypeMetadata<TType>;

function Profile() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  React.useEffect(() => {
    dispatch(fetchInforUser(document.cookie.split("=")[1]));
  }, [dispatch]);

  const { email, name, description, avatar, region, state } = useSelector(
    (state: RootState) => state.InforUser
  );

  const handleLogOut = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login");
  };

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<any>(null);
  const [image, setImage] = useState(avatar);
  const [crop, setCrop] = useState<any>({ unit: "%", width: 30, aspect: 1 });
  const [completedCrop, setCompletedCrop] = useState<any>(null);
  const previewCanvasRef = useRef<any>(null);
  const [openModal, setOpenModal] = useState(false);

  const changeAvatar = () => {
    if (avatarInputRef.current !== null) avatarInputRef.current.click();
  };

  
  const onChooseAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    if (files !== null && files.length) reader.readAsDataURL(files[0]);
    setOpenModal(true);
  };

  React.useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY,
    );
  }, [completedCrop]);
  
  const handleClose = () => {
    setOpenModal(false);
  };
  const onLoad = React.useCallback((img: any) => {
    imgRef.current = img;
  }, []);

  const uploadAvatar =async () => {
    const file = await generateAvatarUpload(previewCanvasRef.current,completedCrop);
    if (file){
      const formData = new FormData();
      formData.append('file',file,file.name);
      const json = await fetch("http://api.training.div3.pgtest.co/api/v1/user", 
      {
        method: "PUT",
        body: formData,
        headers :{
          'content-type': 'multipart/form-data',
          Authorization: document.cookie.split("=")[1]|| '',
        }
      }
      )
      
      // if (json.data && json.data.code === RESPONSE_STATUS_SUCCESS) {
      //   // dispatch(fetchUpdateUser(json.data.data));
      // }
    }
  }

  return (
    <div>
      {!!avatar && (
        <Card style={{ height: "500px", width: "500px", margin: "0 auto" }}>
          <Avatar
            src={avatar ? `http://api.training.div3.pgtest.co/${avatar}` : ""}
            style={{
              height: "120px",
              width: "120px",
              margin: "0 auto",
              cursor: "pointer",
            }}
          >
            {avatar ? "" : name?.charAt(0)?.toUpperCase()}
          </Avatar>
          <CardContent>
            <div style={{ cursor: "pointer" }} onClick={changeAvatar}>
              <input
                ref={avatarInputRef}
                hidden
                type="file"
                onChange={onChooseAvatar}
                accept="image/*"
              />
              <span className="profilepic__text">Upload Avatar</span>
            </div>
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
      )}
      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>Upload</DialogTitle>

        <DialogContent>
          <ReactCrop
            src={image ? image : ""}
            crop={crop}
            onChange={(newCrop: any) => {
              console.log("====================================");
              console.log(newCrop);
              console.log("====================================");
              setCrop(newCrop);
            }}
            onImageLoaded={onLoad}
            onComplete={(c) => setCompletedCrop(c)}
          />
          <div>
            <canvas
              ref={previewCanvasRef}
              style={{
                width: Math.round(completedCrop?.width ?? 0),
                height: Math.round(completedCrop?.height ?? 0),
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button  onClick={() => {setOpenModal(false);}}>Close</Button>
          <Button onClick={() => {
              setOpenModal(false);uploadAvatar();}}>
            Save Image
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Profile;
