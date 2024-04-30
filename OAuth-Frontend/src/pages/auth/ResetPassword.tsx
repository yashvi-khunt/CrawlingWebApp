import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../redux/api/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { openSnackbar } from "../../redux/slice/snackbarSlice";

function ResetPassword() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [resetApi, { data, error }] = useResetPasswordMutation();
  const [searchParams] = useSearchParams();

  const onSubmit = (data: unknown) => {
    console.log(data);
    resetApi({
      newPassword: data.password,
      email: searchParams.get("userEmail"),
      token: searchParams.get("token")?.split(" ").join("+"),
    } as authTypes.resetPasswordParams);
  };

  useEffect(() => {
    if (data?.success) {
      dispatch(
        openSnackbar({
          severity: "success",
          message: data.message,
        })
      );
      navigate("/auth/login");
    }
    if (error?.data && !error?.data.success) {
      console.log("he");
      dispatch(
        openSnackbar({ severity: "error", message: error?.data.message })
      );
    }
  }, [data?.data, error?.data]);

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
            <p className="login-box-msg">
              You are only one step away from your new password, recover your
              password now.
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
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
              <div className="row">
                <div className="col-12">
                  <button type="submit" className="btn btn-primary btn-block">
                    Change password
                  </button>
                </div>
              </div>
            </form>
            <p className="mt-3 mb-1">
              <a href="/auth/login">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
