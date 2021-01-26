import React from "react";
import StyledInput from "@/components/ui/styledInput";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import StyledButton from "@/components/ui/styledButton";
import NextLink from "next/link";
import { Box, Grid, Typography, Paper, Link } from "@material-ui/core";
import useUser from "@/libs/useUser";
import fetcher from "@/libs/fetcher";
import { withSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import BaseLayout from "@/components/layouts/baseLayout";

function SignUp(props) {
  const { mutateUser } = useUser({
    redirectTo: "/dashboard",
    redirectIfFound: true,
  });
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    let name = data.name;
    let email = data.email;
    let password = data.password;

    const body = {
      name: name,
      email: email,
      password: password,
    };

    try {
      await mutateUser(
        fetcher("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
      );
    } catch (error) {
      props.enqueueSnackbar(
        //FIXME: Change below code before deploying to production
        `${error.data.code}: ${error.data.message} ${JSON.stringify(error)}`,
        {
          variant: "error",
        }
      );
    }
  };

  const onClickHandle = () => {
    if (errors.name) {
      props.enqueueSnackbar("Invalid Name.", {
        variant: "error",
        autoHideDuration: 10000,
      });
    }
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
        style={{ minHeight: "100vh" }}
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
                        label={"Name"}
                        startIcon={
                          <PersonOutlineOutlinedIcon
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
                        name="name"
                        inputRef={register({
                          required: true,
                          min: 6,
                          pattern: /^[a-zA-Z ]{2,30}$/,
                        })}
                        error={errors.name ? true : false}
                      />
                      {/* <StyledInput
                        label={"Username"}
                        startIcon={
                          <AlternateEmailOutlinedIcon
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
                      /> */}
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
                        name="email"
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
                        onClick={onClickHandle}
                      />
                      <NextLink href="/login">
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
                            Already have an account?
                          </Link>
                        </Typography>
                      </NextLink>
                    </form>
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

export default withSnackbar(SignUp);
