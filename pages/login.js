import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useUser from "@/libs/useUser";
import fetcher from "@/libs/fetcher";
import StyledInput from "@/components/ui/styledInput";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import StyledButton from "@/components/ui/styledButton";
import NextLink from "next/link";
import {
  Box,
  Grid,
  Typography,
  CssBaseline,
  NoSsr,
  Paper,
  Link,
} from "@material-ui/core";
import { withSnackbar } from "notistack";

function Login(props) {
  const { mutateUser } = useUser({
    redirectTo: "/dashboard",
    redirectIfFound: true,
  });
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    let email = data.email;
    let password = data.password;

    const body = {
      email: email,
      password: password,
    };

    try {
      await mutateUser(
        fetcher("/api/v1/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
      );
    } catch (error) {
      props.enqueueSnackbar(
        //FIXME: Change below code before deploying to production
        `${error.data.code}: ${error.data.message}`,
        {
          variant: "error",
        }
      );
    }
  };
  return (
    <NoSsr>
      <CssBaseline>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh", minWidth: "100vw" }}
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
                      <form onSubmit={handleSubmit(onSubmit)}>
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
                        <StyledButton
                          label={"Log In"}
                          type="submit"
                          onClick={() => {
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
                          }}
                        />
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
      </CssBaseline>
    </NoSsr>
  );
}

export default withSnackbar(Login);
