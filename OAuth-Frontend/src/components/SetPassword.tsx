import React from "react";
import { useForm } from "react-hook-form";

function SetPassword() {
  const { register, handleSubmit, errors, watch } = useForm();
  const password = React.useRef({});
  password.current = watch("password", "");

  const onSubmit = (data) => {
    // Handle form submission here
    console.log(data);
  };

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
              You are only one step away from your password, set your password
              now.
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
              </div>
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Retype password"
                  {...register("confirm-password", {
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
              </div>
              {errors.confirmPassword && (
                <div className="invalid-feedback">
                  {errors.confirmPassword.message}
                </div>
              )}
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

export default SetPassword;
