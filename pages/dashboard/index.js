import React from "react";
import { makeStyles, createStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import BaseLayout from "@/components/layouts/baseLayout";
import { CircularProgress, Divider, Typography } from "@material-ui/core";
import { withPageAuthRequired, useUser } from "@auth0/nextjs-auth0";
import StyledAvatar from "@/components/ui/styledAvatar";
import LogRocket from "logrocket";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.grey.inputBackground,
      padding: theme.spacing(1.5),
      // paddingTop: "6rem",
      marginLeft: 240,
      [theme.breakpoints.down("xs")]: {
        marginLeft: 0,
      },
      [theme.breakpoints.up("lg")]: {
        flexGrow: 1,
        backgroundColor: theme.palette.grey.inputBackground,
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

const Dashboard = ({user}) => {
  const theme = useTheme();
  const classes = useStyles()

  if(user) LogRocket.identify(user.email,user);

  return (
    <BaseLayout>
      <div className={classes.root}>
        <Grid container spacing={2} justify="center">
          <Grid className={classes.gridItem} item xs={6}>
            <Paper elevation={2} className={classes.paper}>
              <Typography variant="h5">{"Profile"}</Typography>
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
                  <Typography variant="subtitle1">{`@${user.nickname}`}</Typography>
                  <Typography variant="h6">{user.name}</Typography>
                  <Typography variant="body1">{user.email}</Typography>
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
