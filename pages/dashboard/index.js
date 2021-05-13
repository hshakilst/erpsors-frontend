import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import BaseLayout from "@/components/layouts/baseLayout";
import { CircularProgress, Divider, Typography } from "@material-ui/core";
import { withPageAuthRequired, useUser } from "@auth0/nextjs-auth0";
import StyledAvatar from "@/components/ui/styledAvatar";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: "#EFF0F6",
      padding: theme.spacing(1.5),
      // paddingTop: "6rem",
      marginLeft: 240,
      [theme.breakpoints.down("xs")]: {
        marginLeft: 0,
      },
      [theme.breakpoints.up("lg")]: {
        flexGrow: 1,
        backgroundColor: "#EFF0F6",
        padding: theme.spacing(1.5),
        // paddingTop: "6rem",
        marginLeft: 240,
      },
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

const Dashboard = (props) => {
  const classes = useStyles();
  const { user, isLoading, error } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  console.log(user);

  return (
    <BaseLayout>
      <div className={classes.root}>
        <Grid container spacing={2} justify="center">
          <Grid className={classes.gridItem} item xs={6}>
            <Paper elevation={2} className={classes.paper}>
              <Typography variant="h5">{"Profile"}</Typography>
              {isLoading && <CircularProgress size={20} />}

              <Divider style={{ marginTop: 8 }} />
              {error && (
                <Typography variant="overline">
                  {"Error fetching data."}
                </Typography>
              )}
              {user && (
                <>
                  <div
                    style={{
                      display: "flex",
                      margin: 4,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <StyledAvatar
                      image={user.picture}
                      text={user.name || user.nickname}
                      style={{ height: 100, width: 100 }}
                    />
                  </div>
                  <Typography variant="subtitle">{`@${user.nickname}`}</Typography>
                  <Typography variant="h6">{user.name}</Typography>
                  <Typography variant="body1">{user.email}</Typography>
                  {/* email: "hshakilst@gmail.com" email_verified: true family_name:
                  "Hossain" given_name: "Shakil" locale: "en" name: "Shakil
                  Hossain" nickname: "hshakilst" picture:
                  "https://lh3.googleusercontent.com/a-/AOh14GjZpMYL59Fm5QUUCsnGmF8g1YvR0lm1N_o_rkjc_A=s96-c"
                  sub: "google-oauth2|104000670350585681270" updated_at:
                  "2021-05-13T09:25:24.412Z" */}
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      </div>
    </BaseLayout>
  );
};

export const getServerSideProps = withPageAuthRequired();

export default Dashboard;
