import React from "react";
import { useForm } from "react-hook-form";
import StyledInput from "@/components/ui/styledInput";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import StyledButton from "@/components/ui/styledButton";
import NextLink from "next/link";
import BaseLayout from "@/components/layouts/baseLayout";
import { Box, Grid, Typography, Paper, Link } from "@material-ui/core";
import { withSnackbar } from "notistack";
import { useAuth } from "@/libs/auth";
import { useGetUser } from "@/adapters/user";
import Redirect from "@/components/shared/redirect";
import { useRouter } from "next/router";
import axios from "axios";

function Login(props) {
  const auth = useAuth();
  const { register, handleSubmit, errors } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    let email = data.email;
    let password = data.password;

    try {
      const { error, data } = await auth.sessionLoginWithEmailAndPassword(
        email,
        password
      );
      if (!error) {
        props.enqueueSnackbar(`${data}`, {
          variant: "success",
        });
        router.push("/inventory");
      } else
        props.enqueueSnackbar(`${JSON.stringify(data)}`, {
          variant: "error",
        });
    } catch (error) {
      props.enqueueSnackbar(
        //FIXME: Change below code before deploying to production
        `${error}`,
        {
          variant: "error",
        }
      );
    }
  };

  const onError = (errors) => {
    if (errors.email) {
      props.enqueueSnackbar("Invalid Email address.", {
        variant: "error",
        autoHideDuration: 10000,
      });
    }
    if (errors.password) {
      props.enqueueSnackbar(
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.",
        {
          variant: "error",
          autoHideDuration: 10000,
        }
      );
    }
  };

  return (
    <BaseLayout>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh"}}
      >
        <Grid
          item
          style={{ width: "25rem", marginTop: "6rem", marginBottom: "6rem" }}
        >
          <Paper elevation={2} style={{ borderRadius: 16 }}>
            <Box textAlign="center" p={5}>
              <Grid
                container
                direction="column"
                alignItems="center"
                justify="center"
              >
                <Grid item>
                  <Typography
                    variant="h4"
                    component="h1"
                    style={{
                      fontWeight: 700,
                      fontSize: "2rem",
                      color: "#14142b",
                      letterSpacing: "0.063rem",
                      lineHeight: "2.125rem",
                    }}
                  >
                    Welcome to
                  </Typography>
                  <Typography
                    variant="h4"
                    component="h1"
                    style={{
                      fontWeight: 700,
                      fontSize: "2rem",
                      color: "#14142b",
                      letterSpacing: "0.063rem",
                      lineHeight: "2.125rem",
                      paddingBottom: "2.5rem",
                    }}
                  >
                    ERPSORS
                  </Typography>
                  <Box>
                    <form onSubmit={handleSubmit(onSubmit, onError)}>
                      <StyledInput
                        name="email"
                        label={"Email"}
                        startIcon={
                          <MailOutlineOutlinedIcon
                            style={{ fill: "#14142b" }}
                            fontSize={"default"}
                          />
                        }
                        endIcon={
                          <HighlightOffOutlinedIcon
                            style={{ fill: "#14142b" }}
                            fontSize={"small"}
                          />
                        }
                        style={{ marginBottom: "35px" }}
                        type={"email"}
                        inputRef={register({
                          required: true,
                          min: 6,
                          pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
                        })}
                        error={errors.email ? true : false}
                      />
                      <StyledInput
                        name="password"
                        label={"Password"}
                        startIcon={
                          <LockOutlinedIcon
                            style={{ fill: "#14142b" }}
                            fontSize={"default"}
                          />
                        }
                        endIcon={
                          <HighlightOffOutlinedIcon
                            style={{ fill: "#14142b" }}
                            fontSize={"small"}
                          />
                        }
                        style={{ marginBottom: "35px" }}
                        type={"password"}
                        inputRef={register({
                          required: true,
                          min: 8,
                          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/,
                        })}
                        error={errors.password ? true : false}
                      />
                      <StyledButton label={"Log In"} type="submit" />
                    </form>
                    <NextLink href="/register">
                      <Typography
                        style={{
                          marginTop: "20px",
                        }}
                      >
                        <Link
                          style={{
                            fontWeight: 600,
                            fontSize: "16px",
                            color: "#4e4b66",
                            letterSpacing: "1px",
                            cursor: "pointer",
                          }}
                        >
                          Need an account?
                        </Link>
                      </Typography>
                    </NextLink>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </BaseLayout>
  );
}

export default withSnackbar(Login);
