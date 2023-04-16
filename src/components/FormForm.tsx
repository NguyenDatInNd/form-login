import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

type UserSubmitForm = {
  username: string;
  password: string;
  rememberMe: boolean;
};

const LoginForm: React.FC = () => {
  const [rememberMe, setRememberMe]= React.useState(false)
  const validationSchema = Yup.object().shape({
      username: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(validationSchema)
  });
  
  const notify = () => {

    toast.success("Success register !", {
      position: toast.POSITION.TOP_CENTER
    });
  }

  const onSubmit = (data: UserSubmitForm) => {
    notify()
    console.log(data);
  };

  return (
    <div className="register-form">
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="form-group">
          <label>Địa chỉ email</label>
          <input
            type="text"
            {...register('username')}
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.username?.message}</div>
        </div>

        <div className="form-group">
          <label>Mật khẩu</label>
          <input
            type="password"
            {...register('password')}
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
        </div>

        <div className="form-group">
          <label>Lưu thông tin đăng nhập</label>
          <input
            type="checkbox"
            {...register('rememberMe')}
            onClick={()=>  setRememberMe(!rememberMe)}
          />
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Register  
          </button>
        </div>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default LoginForm;
