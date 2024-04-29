import { KeyboardBackspace } from "@mui/icons-material";
import {
  Container,
  Box,
  IconButton,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FormInputText } from "../../components";
import {
  useEditUserMutation,
  useUserDetailsQuery,
} from "../../redux/api/userApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { openSnackbar } from "../../redux/slice/snackbarSlice";

export default function ProfileEdit() {
  const { handleSubmit, register, control } = useForm();
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
  console.log(userDetails?.firstName, userDetails?.lastName);

  return (
    <>
      <div className="content-wrapper">
        <Container maxWidth="xl">
          <Box display="flex" gap={2} alignItems="center" mb={2}>
            <IconButton onClick={() => navigate("/profile")}>
              <KeyboardBackspace />
            </IconButton>
            <Typography variant="h5" ml={-2}>
              Edit Profile
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
                  {userDetails && (
                    <FormInputText
                      control={control}
                      defaultValue={userDetails?.firstName}
                      {...register("firstName", {
                        pattern: {
                          value: /^[a-zA-Z]*$/,
                          message: "Name should contain alphabets only.",
                        },
                      })}
                      label="First name"
                    />
                  )}
                </Grid>
                <Grid item xs={12}>
                  {userDetails && (
                    <FormInputText
                      control={control}
                      defaultValue={userDetails?.lastName}
                      {...register("lastName", {
                        pattern: {
                          value: /^[a-zA-Z]*$/,
                          message: "Name should contain alphabets only.",
                        },
                      })}
                      label="Last name"
                    />
                  )}
                </Grid>

                {error && (
                  <Grid item xs={12} textAlign="center" color="red">
                    {error?.data.message}
                  </Grid>
                )}
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "#7d56d4" }}
              >
                Edit Profile
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    href="/profile"
                    sx={{ textDecoration: "none", color: "gray" }}
                    variant="body2"
                  ></Link>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Container>
      </div>
    </>
  );
}
