import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import StyledInventoryHistory from "@/components/ui/styledInventoryHistory";
import BaseLayout from "@/components/layouts/baseLayout";
import StyledTableReports from "@/components/reports/styledTableReports";
import StyledTableCard from "@/components/ui/styledTableCard";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

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
      "& .MuiPaper-elevation1": {
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

const Reports = (props) => {
  const classes = useStyles();

  return (
    <BaseLayout>
      <div className={classes.root}>
        <Grid container spacing={2}>
          {/* <Grid className={classes.gridItem} item lg={8} md={6} sm={12} xs={12}>
            <Paper className={classes.paper}>
              <StyledFormItems></StyledFormItems>
            </Paper>
          </Grid> */}
          {/* <Grid item className={classes.gridItem} lg={4} md={6} sm={12} xs={12}>
            <Paper className={classes.paper}>
              <StyledInventoryHistory
                style={{ paddingBottom: "16.2rem" }}
              ></StyledInventoryHistory>
            </Paper>
          </Grid> */}
          <Grid
            item
            className={classes.gridItem}
            lg={12}
            md={12}
            sm={12}
            xs={12}
          >
            <Paper className={classes.paper}>
              <StyledTableCard>
                <StyledTableReports></StyledTableReports>
              </StyledTableCard>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </BaseLayout>
  );
};

export default withPageAuthRequired(Reports);
