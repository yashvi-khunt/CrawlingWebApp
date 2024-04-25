import React from "react";
import { useForm } from "react-hook-form";

function ForgotPassword() {
  const { register, handleSubmit, errors } = useForm();

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
              You forgot your password? Here you can easily retrieve a new
              password.
            </p>
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
              </div>
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
              <div className="row">
                <div className="col-12">
                  <button type="submit" className="btn btn-primary btn-block">
                    Request new password
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

export default ForgotPassword;
