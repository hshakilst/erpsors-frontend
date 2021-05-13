import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import BaseLayout from "@/components/layouts/baseLayout";
import StyledButton from "@/components/ui/styledButton";
import { Divider, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import { getSession } from "@auth0/nextjs-auth0";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: "#EFF0F6",
      padding: theme.spacing(1.5),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      paddingTop: "1rem",
      paddingBottom: "1rem",
      borderRadius: "1rem",
      "& .MuiPaper-root": {
        boxShadow: "none",
      },
    },
    gridItem: {
      flexDirection: "column",
      flexGrow: 1,
      justifyContent: "center",
      textAlign: "center",
    },
  })
);

const Index = (props) => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <BaseLayout>
      <div className={classes.root}>
        <Grid container spacing={2} justify="center">
          <Grid className={classes.gridItem} item xs={6}>
            <Paper elevation={2} className={classes.paper}>
              <Typography variant="h3">{"ERPSORS"}</Typography>
              <Typography variant="h6">{"Landing Page"}</Typography>
              <Divider style={{ marginTop: 16 }} />
              <StyledButton
                style={{ marginTop: 16 }}
                label={"Sign In"}
                onClick={() => router.push("/api/auth/login")}
              ></StyledButton>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </BaseLayout>
  );
};

export const getServerSideProps = ({ req, res }) => {
  const session = getSession(req, res);
  if (session?.user)
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  return { props: {} };
};
export default Index;
