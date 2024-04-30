import { ArrowBack, Key, KeyboardBackspace } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FormInputPassword } from "../../components/index";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useChangePasswordMutation } from "../../redux/api/userApi";
import { useEffect } from "react";
import { openSnackbar } from "../../redux/slice/snackbarSlice";

const ChangePassword = () => {
  const {
    handleSubmit,
    register,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userEmail = useAppSelector((state) => state.auth.userEmail);

  const [changeApi, { data, error }] = useChangePasswordMutation();

  const onSubmit = (data: unknown) => {
    changeApi({ email: userEmail, password: data.password });
  };

  useEffect(() => {
    if (data?.success) {
      dispatch(
        openSnackbar({
          severity: "success",
          message: data.message,
        })
      );
      navigate("/profile");
    }

    if (error?.data && !error?.data.success) {
      dispatch(
        openSnackbar({
          severity: "error",
          message: error?.data.message,
        })
      );
      reset();
    }
  }, [data?.data, error?.data]);

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Change Password</h1>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="card card-primary">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="form-group col-12 col-md-6">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    {...register("password", {
                      required: "Password field is required.",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@+._-])[a-zA-Z@+._-\d]{8,}$/,
                        message:
                          "Password should have atleast one uppercase,one lowercase, one special character and should be of the minimum length 8.",
                      },
                    })}
                  />
                  {errors.password && (
                    <span className="error invalid-feedback">
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <div className="form-group col-12 col-md-6">
                  <label htmlFor="confirm-password">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirm-password"
                    {...register("confirmPassword", {
                      required: "Confirm Password field is required.",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@+._-])[a-zA-Z@+._-\d]{8,}$/,
                        message:
                          "Password should have atleast one uppercase,one lowercase, one special character and should be of the minimum length 8.",
                      },
                      validate: (val) => {
                        if (watch("password") !== val) {
                          return "Password and Confirm password should be same.";
                        }
                      },
                    })}
                  />
                  {errors.confirmPassword && (
                    <span className="error invalid-feedback">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>
              </div>
              {error && (
                <div className="text-danger">{error?.data.message}</div>
              )}

              <button type="submit" className="btn btn-primary mt-3">
                Change Password
              </button>
              <a href="/profile" className="btn btn-link mt-3">
                <div className="d-flex align-items-center">Cancel</div>
              </a>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChangePassword;
