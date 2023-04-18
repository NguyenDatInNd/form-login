import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Typography, MenuItem } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

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

  React.useEffect(() => {
    fetch("http://api.training.div3.pgtest.co/api/v1/location")
      .then((res) => res.json())
      .then((data) => {
        setCountryData(data.data);
      });
  }, []);

  React.useEffect(() => {
    if (cityId)
      fetch(`http://api.training.div3.pgtest.co/api/v1/location?pid=${cityId}`)
        .then((res) => res.json())
        .then((data) => {
          setCityData(data.data);
        });
  }, [cityId]);

  const [errorNoti, setErrorNoti] = React.useState(false);
  const onSubmit = (data: UserSignUpForm) => {
    fetch("http://api.training.div3.pgtest.co/api/v1/auth/register", {
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
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          setErrorNoti(false);
          notifySuccess();
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
          <Typography color="error">Email này đã được đăng ký!</Typography>
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
                label="Địa chỉ email"
                {...field}
                {...register("email")}
              />
            )}
          />
          {errors?.email?.type === "required" && (
            <Typography color="error">Nhập email của bạn</Typography>
          )}
          {errors?.email?.type === "pattern" && (
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
          <Controller
            name="repeatPassword"
            control={control}
            rules={{ required: true, validate: (value) => value === password }}
            render={({ field }) => (
              <TextField
                error={!!errors?.repeatPassword}
                style={{ height: "55px", width: "300px" }}
                label="Xác nhận lại mật khẩu"
                type="password"
                {...field}
                {...register("repeatPassword")}
              />
            )}
          />
          {errors?.repeatPassword?.type === "validate" && (
            <Typography color="error">Mật khẩu không trùng nhau</Typography>
          )}
          {errors?.repeatPassword?.type === "required" && (
            <Typography color="error">Nhập lại mật khẩu</Typography>
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
                label="Họ và tên"
                {...field}
                {...register("name")}
              />
            )}
          />
          {errors?.name?.type === "required" && (
            <Typography color="error">Nhập tên của bạn</Typography>
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
                label="Giới tính"
                {...field}
                {...register("gender")}
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
            <Typography color="error">Chọn giới tính của bạn</Typography>
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
                label="Quốc gia"
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
            <Typography color="error">Chọn quốc gia của bạn</Typography>)}
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
                {...field}
                label="Thành Phố"
                {...register("state")}
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
            <Typography color="error">Chọn thành phố của bạn</Typography>)}
        </section>

        <section>
          <Button
            style={{ marginTop: "10px" }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Đăng ký
          </Button>
        </section>
      </form>
      <ToastContainer />
    </div>
  );
};

export default FormSignUp;
