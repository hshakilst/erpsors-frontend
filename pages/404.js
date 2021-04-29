import { makeStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import React from "react";
import BaseLayout from "@/components/layouts/baseLayout";
import StyledButton from "@/components/ui/styledButton";
import Image from "next/image";
import Router from "next/router";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      backgroundColor: "#EFF0F6",
      [theme.breakpoints.up("lg")]: {
        flexGrow: 1,
        backgroundColor: "#EFF0F6",
        padding: theme.spacing(2),
      },
    },
    box: {
      backgroundColor: "#fff",
      borderRadius: "1rem",
    },
    image: {
      //   paddingTop: "8rem",
      //   paddingBottom: "8rem",
      textAlign: "center",
      [theme.breakpoints.down("sm")]: {
        textAlign: "center",
        paddingTop: "2rem",
        paddingBottom: "0rem",
      },
      [theme.breakpoints.down("xs")]: {
        textAlign: "center",
        paddingTop: "2rem",
        paddingBottom: "0rem",
      },
    },
    text: {
      //   paddingTop: "9rem",
      //   paddingBottom: "6rem",
      paddingRight: "8rem",
      [theme.breakpoints.down("sm")]: {
        textAlign: "center",
        paddingTop: "0rem",
        paddingBottom: "2rem",
        paddingRight: "0rem",
      },
      [theme.breakpoints.down("xs")]: {
        textAlign: "center",
        paddingTop: "0rem",
        paddingBottom: "2rem",
        paddingRight: "0rem",
      },
    },
  })
);

export default function NotFound(props) {
  const classes = useStyles();

  return (
    <BaseLayout>
      <div className={classes.root}>
        <Box className={classes.box} p={12} height="95vh">
          <Grid container spacing={2} justify="center" alignItems="center">
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Box className={classes.image}>
                <Image
                  src="/images/astronaut.png"
                  alt="Picture of the astronaut"
                  width={500}
                  height={400}
                  layout="intrinsic"
                ></Image>
              </Box>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Box className={classes.text}>
                <Typography
                  style={{
                    fontWeight: 700,
                    color: "#14142B",
                    paddingTop: "4rem",
                  }}
                  variant="h1"
                >
                  404
                </Typography>
                <Typography
                  style={{
                    fontWeight: 500,
                    color: "#14142B",
                    paddingTop: "2rem",
                  }}
                  variant="h4"
                >
                  UH OH! You're lost.
                </Typography>
                <Typography
                  style={{
                    fontWeight: 300,
                    color: "#14142B",
                    paddingTop: ".5rem",
                  }}
                >
                  The page you are looking for does not exist. How you got here
                  is a mystery. But you can click the button below to go back to
                  the homepage.
                </Typography>
                <div>
                  <StyledButton
                    label={"HOME"}
                    style={{
                      background: "none",
                      padding: "0.25rem 1.5rem",
                      color: "#5F2EEA",
                      border: "0.125rem solid #5F2EEA",
                      boxShadow: "none",
                      marginRight: "0.625rem",
                      marginTop: "1rem",
                    }}
                    onClick={() => Router.push("/")}
                  ></StyledButton>
                </div>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </BaseLayout>
  );
}
