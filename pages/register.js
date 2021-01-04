import React from "react";
import StyledInput from "@/components/ui/styledInput";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import AlternateEmailOutlinedIcon from "@material-ui/icons/AlternateEmailOutlined";
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

function SignUp() {
  return (
    <NoSsr>
      <CssBaseline>
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
                      />
                      <StyledInput
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
                      />
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
                      />
                      <StyledButton label={"Sign Up"} />
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

export default SignUp;
