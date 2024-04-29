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
  const { handleSubmit, register, control } = useForm();

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
        <Container maxWidth="xl">
          <Box display="flex" gap={2} alignItems="center" mb={2}>
            <IconButton onClick={() => navigate("/users")}>
              <KeyboardBackspace />
            </IconButton>
            <Typography variant="h5" ml={-2}>
              Add Employee
            </Typography>
          </Box>
          <Container
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
            maxWidth="xs"
          >
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
              width="100%"
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
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
                    label="Email"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormAutoCompleteField
                    name="roleId"
                    options={roleHelper}
                    label="Role"
                    control={control}
                    defaultValue={roleHelper && roleHelper[0]}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "#7d56d4" }}
              >
                Add
              </Button>
            </Box>
          </Container>
        </Container>
      </div>
    </>
  );
};

export default AddUser;
