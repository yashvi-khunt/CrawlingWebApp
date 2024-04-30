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
import { useNavigate } from "react-router-dom";
import { FormInputText } from "../../components";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useAddUserMutation,
  useRolesWithNamesQuery,
} from "../../redux/api/userApi";
import { openSnackbar } from "../../redux/slice/snackbarSlice";
import FormAutoCompleteField from "../../components/form/FormAutoCompleteField";

const AddUser = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [addUserApi, { data, error }] = useAddUserMutation();
  const dispatch = useDispatch();

  const { data: roleHelper } = useRolesWithNamesQuery();
  const onSubmit = (data: unknown) => {
    console.log(data);
    addUserApi({ ...data, roleId: data.roleId.value });
  };

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
                <h1>Add User</h1>
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
                </div>
                {error && (
                  <div className="text-danger">{error?.data.message}</div>
                )}

                <button type="submit" className="btn btn-primary mt-3">
                  Add
                </button>
                <a href="/users" className="btn btn-link mt-3">
                  Cancel
                </a>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AddUser;
