import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Checkbox, Button, Typography } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

type UserSubmitForm = {
  username: string;
  password: string;
  rememberMe: boolean;
};

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserSubmitForm>({
    defaultValues: { username: "", password: "" },
  });

  const notifySuccess = () => {
    toast.success("Success register !", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const [errorNoti, setErrorNoti] = React.useState(false);

  const onSubmit = (data: UserSubmitForm) => {
    fetch("http://api.training.div3.pgtest.co/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: data.username, password: data.password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.code === 200) {
          setErrorNoti(false);
          notifySuccess();
           if (data.rememberMe) {localStorage.setItem("token", result.data.token)};
          setTimeout(() => navigate("/home"), 1000);
        } else {
          setErrorNoti(true);
        }
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errorNoti && (
          <Typography color="error">Invalid username / password</Typography>
        )}
        <section>
          <Controller
            name="username"
            control={control}
            rules={{ required: true, pattern: /^\S+@\S+$/i }}
            render={({ field }) => (
              <TextField
                error={!!errors?.username}
                style={{ height: "55px", width: "300px" }}
                label="Địa chỉ email"
                size="medium"
                {...field}
                {...register("username")}
              />
            )}
          />
          {errors?.username?.type === "required" && (
            <Typography color="error">Nhập email của bạn</Typography>
          )}
          {errors?.username?.type === "pattern" && (
            <Typography color="error">Email chưa đúng định dạng</Typography>
          )}
        </section>
        <section>
          <Controller
            name="password"
            control={control}
            rules={{ required: true, maxLength: 20, minLength: 4 }}
            render={({ field }) => (
              <TextField
                error={!!errors?.password}
                style={{ height: "55px", width: "300px" }}
                size="medium"
                label="Mật khẩu"
                type="password"
                {...field}
                {...register("password")}
              />
            )}
          />
          {errors?.password?.type === "required" && (
            <Typography color="error">Nhập mật khẩu của bạn</Typography>
          )}
          {errors?.password?.type === "maxLength" && (
            <Typography color="error">Mật khẩu quá dài!</Typography>
          )}
          {errors?.password?.type === "minLength" && (
            <Typography color="error">Mật khẩu quá ngắn!</Typography>
          )}
        </section>

        <section>
          <label>Lưu thông tin đăng nhập</label>
          <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <Checkbox
                onClick={() => setRememberMe(!rememberMe)}
                {...field}
                {...register("rememberMe")}
              />
            )}
          />
        </section>

        <section>
          <Button type="submit" variant="contained" color="primary">
            Đăng nhập
          </Button>
        </section>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
