import React from "react";
import {
  makeStyles,
  createStyles,
  alpha,
  useTheme,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { Link } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TocOutlinedIcon from "@material-ui/icons/TocOutlined";
import StyledButton from "../ui/styledButton";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
    },
    media: {
      height: 0,
      paddingTop: "56.25%",
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    rootGrid: {
      flexGrow: 1,
      backgroundColor: theme.palette.grey.inputBackground,
      padding: theme.spacing(2),
      borderRadius: "1rem",
    },
    paper: {
      backgroundColor: theme.palette.grey.background,
      padding: theme.spacing(0),
      textAlign: "left",
      paddingLeft: "1.25rem",
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
    search: {
      height: "3.5rem",
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      left: "-40px",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: theme.palette.grey.title,
    },
    inputRoot: {
      fontSize: "1rem",
      fontWeight: 400,
      color: theme.palette.grey.title,
      letterSpacing: "0.047rem",
      lineHeight: 0,
      paddingLeft: "1.25rem",
      "& .MuiInputLabel-animated": {
        fontSize: "1rem",
        fontWeight: 400,
        color: theme.palette.grey.title,
        letterSpacing: "0.047rem",
        lineHeight: 0,
        paddingLeft: "1.25rem",
        paddingTop: "0.5rem",
      },
    },
    inputInput: {
      padding: theme.spacing(1.5, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "100%",
      },
    },
  })
);

export default function StyledFormFloorReceipts() {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Box>
        <div style={{ float: "left", textAlign: "left" }}>
          <Typography
            style={{
              fontSize: "1.125rem",
              fontWeight: 400,
              color: theme.palette.grey.title,
              letterSpacing: "0.047rem",
            }}
          >
            Floor Received
          </Typography>
          <Typography
            style={{
              fontSize: "0.75rem",
              fontWeight: 200,
              color: theme.palette.grey.body,
              letterSpacing: "0.047rem",
            }}
          >
            Create a floor received report
          </Typography>
        </div>
        <div style={{ float: "right" }}>
          <div
            style={{
              textAlign: "right",
              float: "left",
              marginRight: "0.313rem",
            }}
          >
            <AddOutlinedIcon
              style={{ color: theme.palette.grey.title, fontSize: "1.125rem" }}
            ></AddOutlinedIcon>
          </div>
          <div style={{ textAlign: "right", float: "left" }}>
            <Link
              component="button"
              variant="body2"
              style={{
                fontWeight: 500,
                fontSize: "0.875rem",
                color: theme.palette.primary.main,
                letterSpacing: "0.063rem",
              }}
              onClick={() => {
                console.info("I'm a button.");
              }}
            >
              Add multiple
            </Link>
          </div>
        </div>
      </Box>
      <Box style={{ marginTop: "3.438rem" }}>
        <div className={classes.rootGrid}>
          <Grid container spacing={2}>
            <Grid className={classes.gridItem} item xs={12}>
              <Paper className={classes.paper}>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <TocOutlinedIcon fontSize="large" />
                  </div>
                  <TextField
                    fullWidth
                    InputProps={{
                      disableUnderline: true,
                    }}
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    label={"Store issue Code"}
                    size={"small"}
                  />
                </div>
              </Paper>
            </Grid>
            <Grid className={classes.gridItem} item xs={6}>
              <Paper className={classes.paper}>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <TocOutlinedIcon fontSize="large" />
                  </div>
                  <TextField
                    fullWidth
                    InputProps={{
                      disableUnderline: true,
                    }}
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    label={"Item"}
                    size={"small"}
                  />
                </div>
              </Paper>
            </Grid>
            <Grid className={classes.gridItem} item xs={6}>
              <Paper className={classes.paper}>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <TocOutlinedIcon fontSize="large" />
                  </div>
                  <TextField
                    fullWidth
                    InputProps={{
                      disableUnderline: true,
                    }}
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    label={"Received Qty."}
                    size={"small"}
                  />
                </div>
              </Paper>
            </Grid>
            <Grid item className={classes.gridItem} xs={6}>
              <Paper className={classes.paper}>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <TocOutlinedIcon fontSize="large" />
                  </div>
                  <TextField
                    fullWidth
                    InputProps={{
                      disableUnderline: true,
                    }}
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    label={"Warehouse"}
                    size={"small"}
                  />
                </div>
              </Paper>
            </Grid>
            <Grid item className={classes.gridItem} xs={6}>
              <Paper className={classes.paper}>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <TocOutlinedIcon fontSize="large" />
                  </div>
                  <TextField
                    fullWidth
                    InputProps={{
                      disableUnderline: true,
                    }}
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    label={"Notes"}
                    size={"small"}
                  />
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Box>
      <div style={{ float: "right", marginTop: "1rem" }}>
        <div style={{ float: "left" }}>
          <StyledButton
            label={"Add"}
            style={{
              background: "none",
              padding: "0.25rem 1.5rem",
              color: theme.palette.primary.main,
              border: "0.125rem solid #5F2EEA",
              boxShadow: "none",
              marginRight: "0.625rem",
            }}
          ></StyledButton>
        </div>
        <div style={{ float: "left" }}>
          <StyledButton
            label={"Clear"}
            style={{
              background: "none",
              padding: "0.25rem 1.5rem",
              color: theme.palette.primary.main,
              border: "0.125rem solid #D6D8E7",
              boxShadow: "none",
            }}
          ></StyledButton>
        </div>
      </div>
    </Card>
  );
}
