import { useForm } from "react-hook-form";
import GoogleAuthButton from "../../components/GoogleAuthButton";
import {
  useGoogleLoginMutation,
  useLoginMutation,
} from "../../redux/api/authApi";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { login } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [googleLogin, { data: apisuccess, error: apiError }] =
    useGoogleLoginMutation();
  const [loginApi, { data: loginResponse, error: loginError }] =
    useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onSubmit = (data) => {
    loginApi(data as authTypes.loginRegisterParams);
  };

  useEffect(() => {
    setError(loginError?.data.message);
  }, [loginError]);

  useEffect(() => {
    if (loginResponse?.success) {
      dispatch(login(loginResponse.data));
      navigate("/");
    }
  }, [loginResponse]);

  const clearError = () => {
    setError(null);
  };

  const handleSuccess = (response) => {
    console.log(response);
    googleLogin({ token: response.credential });
  };
  const handleFailure = (response) => {
    console.log(response);
  };

  useEffect(() => {
    console.log(apisuccess);
    if (apisuccess?.status) {
      dispatch(login(apisuccess?.data?.token));
      navigate("/");
    }
  }, [apisuccess?.data]);

  useEffect(() => {
    setError(apiError?.data.message);
  }, [apiError]);

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <a href="/" className="h1">
              <b>Admin</b>LTE
            </a>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            <form onSubmit={handleSubmit(onSubmit)} onChange={clearError}>
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
              {error && (
                <Grid
                  item
                  xs={12}
                  textAlign="center"
                  color="red"
                  marginBottom={2}
                >
                  {error}
                </Grid>
              )}
              <div className="row">
                <div className="col">
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign In
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
            <p className="mb-1">
              <a href="/auth/forgot-password">Forgot password?</a>
            </p>
            <p className="mb-0">
              <a href="/auth/register" className="text-center">
                Register a new membership
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
