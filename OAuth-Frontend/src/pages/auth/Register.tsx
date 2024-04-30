import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import GoogleAuthButton from "../../components/GoogleAuthButton";
import {
  useGoogleLoginMutation,
  useRegisterMutation,
} from "../../redux/api/authApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/slice/authSlice";
import { Grid } from "@mui/material";

function Register() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm();

  const [registerApi, { data, error: registerError }] = useRegisterMutation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onSubmit = (data) => {
    // Handle form submission here
    setEmail(data.email);
    registerApi(data as authTypes.loginRegisterParams);
  };

  const [googleLogin, { data: apisuccess, error: apiError }] =
    useGoogleLoginMutation();

  useEffect(() => {
    setError(registerError?.data.message);
  }, [registerError]);

  useEffect(() => {
    if (data?.success) navigate(`/auth/sent-confirm-email?email=${email}`);
  }, [data?.data]);

  useEffect(() => {
    console.log(apisuccess);
    if (apisuccess?.status) {
      dispatch(login(apisuccess?.data?.token));
      navigate("/");
    }
  }, [apisuccess?.data]);

  useEffect(() => {
    console.log(apiError);
  }, [apiError]);

  const handleSuccess = (response) => {
    console.log(response);
    googleLogin({ token: response.credential });
  };
  const handleFailure = (response) => {
    console.log(response);
  };

  return (
    <div className="hold-transition register-page">
      <div className="register-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <a href="/" className="h1">
              <b>Admin</b>LTE
            </a>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Register a new membership</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email field is required.",
                    },
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Please enter a valid email address.",
                    },
                  })}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
                {errors.email && (
                  <>
                    <span className="error invalid-feedback">
                      {errors.email.message}
                    </span>
                  </>
                )}
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password field is required.",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@+._-])[a-zA-Z@+._-\d]{8,}$/,
                      message:
                        "Password should have atleast one uppercase,one lowercase, one special character and should be of the minimum length 8.",
                    },
                  })}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
                {errors.password && (
                  <>
                    <span className="error invalid-feedback">
                      {errors.password.message}
                    </span>
                  </>
                )}
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Retype password"
                  {...register("confirmPassword", {
                    required: {
                      value: true,
                      message: "Confirm Password field is required.",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@+._-])[a-zA-Z@+._-\d]{8,}$/,
                      message:
                        "Password should have atleast one uppercase,one lowercase, one special character and should be of the minimum length 8.",
                    },
                    validate: (val: string) => {
                      if (watch("password") != val) {
                        return "Password and Confirm password should be same.";
                      }
                    },
                  })}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
                {errors.confirmPassword && (
                  <>
                    <span className="error invalid-feedback">
                      {errors.confirmPassword.message}
                    </span>
                  </>
                )}
              </div>
              {error && (
                <Grid item xs={12} textAlign="center" color="red">
                  {error}
                </Grid>
              )}
              <div className="row">
                <div className="col">
                  <button type="submit" className="btn btn-primary btn-block">
                    Register
                  </button>
                </div>
              </div>
            </form>
            <div className="social-auth-links text-center mt-2 mb-3">
              <GoogleAuthButton
                onSuccess={handleSuccess}
                onFailure={handleFailure}
              />
            </div>
            <a href="/auth/login" className="text-center">
              I already have a membership
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
