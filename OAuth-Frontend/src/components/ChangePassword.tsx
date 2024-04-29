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
import { FormInputPassword } from "./index";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useChangePasswordMutation } from "../redux/api/userApi";
import { useEffect } from "react";
import { openSnackbar } from "../redux/slice/snackbarSlice";

const ChangePassword = () => {
  const { handleSubmit, register, control, watch, reset } = useForm();
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
    <Container maxWidth="xl">
      <Box display="flex" gap={2} alignItems="center" mb={2}>
        <IconButton onClick={() => navigate("/profile")}>
          <KeyboardBackspace />
        </IconButton>
        <Typography variant="h5" ml={-2}>
          Change Password
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
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormInputPassword
                control={control}
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
                label="Password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputPassword
                control={control}
                {...register("confirm-password", { required: true })}
                label="Confirm password"
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
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: "#7d56d4" }}
          >
            Change Password
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                href="/profile"
                sx={{ textDecoration: "none", color: "gray" }}
                variant="body2"
              >
                <Box justifyContent="center" display="flex" gap={0.2}>
                  <ArrowBack fontSize="small" color="inherit" /> Back to profile
                </Box>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Container>
  );
};

export default ChangePassword;
