import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Checkbox, Button, Typography } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";

type UserSubmitForm = {
  username: string;
  password: string;
  rememberMe: boolean;
};

const LoginForm: React.FC = () => {
  const { t } = useTranslation();
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
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (data: UserSubmitForm) => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://api.training.div3.pgtest.co/api/v1/auth/login",
        {
          method: "POST",
          body: JSON.stringify({
            email: data.username,
            password: data.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      if (result.code === 200) {
        setErrorNoti(false);
        notifySuccess();
        if (data.rememberMe) {
          localStorage.setItem("token", result.data.token);
        }
        setTimeout(() => navigate("/home"), 1000);
      } else {
        setErrorNoti(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errorNoti && (
          <Typography color="error">{t("valueInvalid")}</Typography>
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
                label={t("email")}
                size="medium"
                {...field}
                {...register("username")}
              />
            )}
          />
          {errors?.username?.type === "required" && (
            <Typography color="error">{t("emailRequire")}</Typography>
          )}
          {errors?.username?.type === "pattern" && (
            <Typography color="error">{t("emailInvalid")}</Typography>
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
                label={t("password")}
                type="password"
                {...field}
                {...register("password")}
              />
            )}
          />
          {errors?.password?.type === "required" && (
            <Typography color="error">{t("passwordRequire")}</Typography>
          )}
          {errors?.password?.type === "maxLength" && (
            <Typography color="error">{t("maxPasswordInvalid")}</Typography>
          )}
          {errors?.password?.type === "minLength" && (
            <Typography color="error">{t("minPasswordInvalid")}</Typography>
          )}
        </section>

        <section>
          <label>{t("rememberMe")}</label>
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
          <Button
            disabled={loading}
            type="submit"
            variant="contained"
            color="primary"
          >
            {loading && (
              <CircularProgress
                style={{ position: "relative", right: "7px" }}
                size="15px"
              />
            )}
            {t("login")}
          </Button>
        </section>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
