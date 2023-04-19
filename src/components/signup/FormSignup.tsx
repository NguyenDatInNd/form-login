import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Typography, MenuItem } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";

type UserSignUpForm = {
  email: string;
  password: string;
  repeatPassword: string;
  name: string;
  gender: string;
  region: string;
  state: string;
};

const FormSignUp: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<UserSignUpForm>({
    defaultValues: {
      name: "",
      password: "",
      email: "",
      repeatPassword: "",
      gender: "",
      state: "",
      region: "",
    },
  });

  const password = watch("password");

  const notifySuccess = () => {
    toast.success("Success sign up !", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const SelectGender = [
    { value: "male", label: "Nam" },
    { value: "female", label: "Nữ" },
    { value: "other", label: "Khác" },
  ];

  const [countryData, setCountryData] = React.useState<Array<any>>([]);
  const [cityId, setCityId] = React.useState<string>("");
  const [cityData, setCityData] = React.useState<Array<any>>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://api.training.div3.pgtest.co/api/v1/location");
      const data = await res.json();
      setCountryData(data.data);
    }
    fetchData();
  }, []);

  React.useEffect(() => {
    async function fetchCityData() {
      if (cityId) {
        const res = await fetch(`http://api.training.div3.pgtest.co/api/v1/location?pid=${cityId}`);
        const data = await res.json();
        setCityData(data.data);
      }
    }
    fetchCityData();
  }, [cityId]);

  const [errorNoti, setErrorNoti] = React.useState(false);
  const onSubmit = async (data: UserSignUpForm) => {
    try {
      setLoading(true);
      const response = await fetch("http://api.training.div3.pgtest.co/api/v1/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          repeatPassword: data.repeatPassword,
          name: data.name,
          gender: data.gender,
          region: data.region,
          state: data.state,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      if (responseData.code === 200) {
        setErrorNoti(false);
        notifySuccess();
        setTimeout(() => navigate("/home"), 1000);
      } else {
        setErrorNoti(true);
      }
    } catch (error) {
      console.error(error);
      // handle error
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errorNoti && (
          <Typography color="error">{t('emailError')}</Typography>
        )}
        <section>
          <Controller
            name="email"
            control={control}
            rules={{ required: true, pattern: /^\S+@\S+$/i }}
            render={({ field }) => (
              <TextField
                error={!!errors?.email || !!errorNoti}
                style={{ height: "55px", width: "300px" }}
                label={t('email')}
                {...field}
                {...register("email")}
              />
            )}
          />
          {errors?.email?.type === "required" && (
            <Typography color="error">{t('emailRequire')}</Typography>
          )}
          {errors?.email?.type === "pattern" && (
            <Typography color="error">{t('emailInvalid')}</Typography>
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
                label={t('password')}
                type="password"
                {...field}
                {...register("password")}
              />
            )}
          />
          {errors?.password?.type === "required" && (
            <Typography color="error">{t('passwordRequire')}</Typography>
          )}
          {errors?.password?.type === "maxLength" && (
            <Typography color="error">{t('maxPasswordInvalid')}</Typography>
          )}
          {errors?.password?.type === "minLength" && (
            <Typography color="error">{t('minPasswordInvalid')}</Typography>
          )}
        </section>

        <section>
          <Controller
            name="repeatPassword"
            control={control}
            rules={{ required: true, validate: (value) => value === password }}
            render={({ field }) => (
              <TextField
                error={!!errors?.repeatPassword}
                style={{ height: "55px", width: "300px" }}
                label={t('repeatPassword')}
                type="password"
                {...field}
                {...register("repeatPassword")}
              />
            )}
          />
          {errors?.repeatPassword?.type === "validate" && (
            <Typography color="error">{t('matchPasswordInvalid')}</Typography>
          )}
          {errors?.repeatPassword?.type === "required" && (
            <Typography color="error">{t('passwordRequire')}</Typography>
          )}
        </section>

        <section>
          <Controller
            name="name"
            control={control}
            rules={{ required: true, maxLength: 20 }}
            render={({ field }) => (
              <TextField
                error={!!errors?.name}
                style={{ height: "55px", width: "300px" }}
                label={t('name')}
                {...field}
                {...register("name")}
              />
            )}
          />
          {errors?.name?.type === "required" && (
            <Typography color="error">{t('nameRequire')}</Typography>
          )}
        </section>

        <section>
          <Controller
            name="gender"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                select
                error={!!errors?.gender}
                style={{ height: "55px", width: "300px" }}
                label={t('gender')}
                {...register("gender")}
                {...field}
              >
                {SelectGender.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          {errors?.gender?.type === "required" && (
            <Typography color="error">{t('genderRequire')}</Typography>
          )}
        </section>

        <section>
          <Controller
            name="region"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                select
                error={!!errors?.region}
                style={{ height: "55px", width: "300px" }}
                {...field}
                label={t('region')}
                {...register("region")}
                value={cityId}
                onChange={(e) => {
                  setCityId(e.target.value as string);
                }}
              >
                {countryData?.map((option, id) => (
                  <MenuItem key={id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          {errors?.region?.type === "required" && (
            <Typography color="error">{t('regionRequire')}</Typography>)}
        </section>

        <section>
          <Controller
            name="state"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                select
                error={!!errors?.state}
                style={{ height: "55px", width: "300px" }}
                {...register("state")}
                {...field}
                label={t('state')}
              >
                {cityData?.map((option, id) => (
                  <MenuItem key={id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          {errors?.state?.type === "required" && (
            <Typography color="error">{t('stateRequire')}</Typography>)}
        </section>

        <section>
          <Button
            style={{ marginTop: "10px" }}
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
           {t('register')}
          </Button>
        </section>
      </form>
      <ToastContainer />
    </div>
  );
};

export default FormSignUp;
