import { ArrowBack, KeyboardBackspace } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { FormInputText } from "../../components";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useEditUserMutation,
  useRolesWithNamesQuery,
  useUserDetailsQuery,
} from "../../redux/api/userApi";
import { openSnackbar } from "../../redux/slice/snackbarSlice";
import FormAutoCompleteField from "../../components/form/FormAutoCompleteField";

const EditUser = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { email } = useParams();
  const [editUserApi, { data, error }] = useEditUserMutation();
  const dispatch = useDispatch();

  const { data: roleHelper } = useRolesWithNamesQuery();
  const onSubmit = (data: unknown) => {
    console.log(data, { ...data, roleId: data.roleId.value });
    editUserApi({ ...data, roleId: data.roleId.value });
  };

  const { data: userDetails } = useUserDetailsQuery(email ?? "");

  useEffect(() => {
    if (data?.success) {
      dispatch(
        openSnackbar({
          severity: "success",
          message: data.message,
        })
      );
      navigate("/users");
    }
  }, [data]);

  useEffect(() => {
    // console.log(error?.data.message);
    if (error?.data && !error?.data.success)
      dispatch(
        openSnackbar({
          severity: "error",
          message: error?.data.message,
        })
      );
  }, [error?.data]);
  console.log(roleHelper);

  return (
    <>
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Edit User</h1>
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
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      defaultValue={email}
                      {...register("email", {
                        required: "Email field is required.",
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: "Please enter a valid email address.",
                        },
                      })}
                    />
                    {errors.email && (
                      <span className="error invalid-feedback">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                  <div className="form-group col-12 col-md-6">
                    <label htmlFor="roleId">Role</label>
                    <select
                      className="form-control"
                      id="roleId"
                      {...register("roleId")}
                    >
                      {roleHelper &&
                        roleHelper.map((role, index) => (
                          <option key={index} value={role.value}>
                            {role.label}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group col-12 col-md-6">
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
                      <span className="error invalid-feedback">
                        {errors.firstName.message}
                      </span>
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
                      <span className="error invalid-feedback">
                        {errors.lastName.message}
                      </span>
                    )}
                  </div>
                </div>
                {error && (
                  <div className="text-danger">{error?.data.message}</div>
                )}

                <button type="submit" className="btn btn-primary mt-3">
                  Edit
                </button>
                <Link to="/users" className="btn btn-link mt-3">
                  Cancel
                </Link>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default EditUser;
