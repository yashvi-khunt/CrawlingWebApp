import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import {
  useEditUserMutation,
  useUserDetailsQuery,
} from "../../redux/api/userApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { openSnackbar } from "../../redux/slice/snackbarSlice";

export default function ProfileEdit() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [updateApi, { data: updateResponse, error }] = useEditUserMutation();
  const dispatch = useAppDispatch();

  const userEmail = useAppSelector((state) => state.auth.userData?.email);
  const { data: userDetails } = useUserDetailsQuery(userEmail ?? "");

  const onSubmit = (data: object) => {
    updateApi({
      ...data,
      roleId: "",
      email: userEmail,
    } as authTypes.updateUserProps);
  };

  useEffect(() => {
    if (updateResponse?.success) {
      dispatch(
        openSnackbar({
          severity: "success",
          message: updateResponse.message,
        })
      );
      navigate("/profile");
    }
  }, [updateResponse?.data]);

  return (
    <>
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Edit Profile</h1>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="card card-primary">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="form-group col-12 col-md-6 ">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      defaultValue={userDetails?.firstName}
                      {...register("firstName", {
                        pattern: {
                          value: /^[a-zA-Z]*$/,
                          message: "Name should contain alphabets only.",
                        },
                      })}
                    />
                    {errors.firstName && (
                      <>
                        <span className="error invalid-feedback">
                          {errors.firstName.message}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="form-group col-12 col-md-6">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      defaultValue={userDetails?.lastName}
                      {...register("lastName", {
                        pattern: {
                          value: /^[a-zA-Z]*$/,
                          message: "Name should contain alphabets only.",
                        },
                      })}
                    />
                    {errors.lastName && (
                      <>
                        <span className="error invalid-feedback">
                          {errors.lastName.message}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                {error && (
                  <div className="text-danger">{error?.data.message}</div>
                )}

                <button type="submit" className="btn btn-primary mt-3">
                  Edit Profile
                </button>
                <Link to="/profile" className="btn btn-link mt-3">
                  Cancel
                </Link>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
