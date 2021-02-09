import React from "react";
import { makeStyles, createStyles, fade } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import StyledDropdown from "./styledDropdown";
import ShortTextOutlinedIcon from "@material-ui/icons/ShortTextOutlined";
import TocOutlinedIcon from "@material-ui/icons/TocOutlined";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import StyledCardAppBar from "./styledCardAppBar";

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
      padding: theme.spacing(2),
      borderRadius: "1rem",
    },
    paper: {
      padding: theme.spacing(0),
      textAlign: "left",
      paddingLeft: "1.25rem",
      borderRadius: "1rem",
      "& .MuiPaper-elevation1": {
        boxShadow: "none",
      },
      "& .MuiButton-outlined": {
        border: "none",
        marginLeft: 0,
        "&:hover": {
          backgroundColor: "#EFF0F6",
        },
      },
    },
    paperDropdown: {
      paddingTop: theme.spacing(1.7),
      paddingBottom: theme.spacing(1.7),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      borderRadius: "1rem",
      "& .MuiButton-text": {
        padding: 0,
      },
    },
    paperTable: {
      padding: theme.spacing(0),
      textAlign: "left",
      borderRadius: "1rem",
      "& .MuiPaper-elevation1": {
        boxShadow: "none",
      },
      "& .MuiButton-outlined": {
        border: "none",
        marginLeft: 0,
        "&:hover": {
          backgroundColor: "#EFF0F6",
        },
      },
    },
    paperIcon: {
      marginBottom: theme.spacing(1),
      textAlign: "center",
      "& .MuiAppBar-colorPrimary": {
        background: "#fff",
        paddingRight: "20px",
      },
    },
    gridItem: {
      flexDirection: "column",
      flexGrow: 1,
      justifyContent: "center",
      textAlign: "center",
      "& .MuiButton-outlined": {
        padding: "0.5rem 0px",
        fontSize: "1rem",
        fontWeight: 400,
        color: "#14142B",
        letterSpacing: "0.047rem",
        textTransform: "capitalize",
        marginLeft: 0,
      },
      "& .MuiAppBar-colorPrimary": {
        background: "#fff",
      },
      "& .MuiMenu-paper": {
        fontSize: "1rem",
        fontWeight: 400,
        color: "red",
        letterSpacing: "0.047rem",
      },
    },
    search: {
      height: "3.5rem",
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
      [theme.breakpoints.up("xs")]: {
        marginLeft: theme.spacing(3),
        width: "left",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      top: 2,
      left: "-2.5rem",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#A0A3BD",
    },
    inputRoot: {
      fontSize: "1rem",
      fontWeight: 400,
      color: "#14142B",
      letterSpacing: "0.047rem",
    },
    inputInput: {
      padding: theme.spacing(2.5, 0, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(0)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "35ch",
      },
    },
    searchCardFour: {
      height: "3.5rem",
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIconCardFour: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      left: "-2.5rem",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#14142B",
    },
    inputRootCardFour: {
      fontSize: "1rem",
      fontWeight: 400,
      color: "#14142B",
      letterSpacing: "0.047rem",
      lineHeight: 0,
      paddingLeft: "1.25rem",
      "& .MuiInputLabel-animated": {
        fontSize: "1rem",
        fontWeight: 400,
        color: "#14142B",
        letterSpacing: "0.047rem",
        lineHeight: 0,
        paddingLeft: "1.25rem",
        paddingTop: "0.5rem",
      },
      "& .MuiInputBase-inputMarginDense": {
        paddingLeft: "5.5rem",
        paddingTop: "1.25rem",
        fontSize: "1rem",
        fontWeight: 400,
        color: "#14142B",
        letterSpacing: "0.047rem",
      },
    },
    inputInputCardFour: {
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

export default function StyledTableCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Box>
        <div className={classes.rootGrid}>
          <Box>
            <Grid container spacing={2}>
              <Grid className={classes.gridItem} item xs={3}>
                <Paper
                  className={classes.paperDropdown}
                  style={{ background: "#EFF0F6" }}
                >
                  <Box>
                    <div style={{ float: "left" }}>
                      <ShortTextOutlinedIcon
                        style={{
                          fontSize: "2rem",
                          color: "#14142B",
                        }}
                      ></ShortTextOutlinedIcon>
                    </div>
                    <div>
                      <StyledDropdown></StyledDropdown>
                    </div>
                  </Box>
                </Paper>
              </Grid>
              <Grid item className={classes.gridItem} xs={7}>
                <Paper
                  className={classes.paper}
                  style={{ background: "#EFF0F6" }}
                >
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon style={{ fontSize: "1.875rem" }} />
                    </div>
                    <InputBase
                      placeholder="Search…"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      inputProps={{ "aria-label": "search" }}
                    />
                  </div>
                </Paper>
              </Grid>
              <Grid item className={classes.gridItem} xs={2}>
                <Paper className={classes.paperIcon}>
                  <StyledCardAppBar></StyledCardAppBar>
                </Paper>
              </Grid>
              <Grid item className={classes.gridItem} xs={4}>
                <Paper
                  className={classes.paper}
                  style={{ background: "#EFF0F6", zIndex: "99" }}
                >
                  <div className={classes.searchCardFour}>
                    <div className={classes.searchIconCardFour}>
                      <TocOutlinedIcon fontSize="large" />
                      <Typography
                        style={{
                          fontSize: "1rem",
                          fontWeight: 400,
                          color: "#14142B",
                          letterSpacing: "0.047rem",
                          lineHeight: 0,
                          paddingLeft: "1.25rem",
                        }}
                      >
                        From
                      </Typography>
                    </div>
                    <TextField
                      fullWidth
                      type="date"
                      InputProps={{
                        disableUnderline: true,
                      }}
                      classes={{
                        root: classes.inputRootCardFour,
                      }}
                      size={"small"}
                    />
                  </div>
                </Paper>
              </Grid>
              <Grid item className={classes.gridItem} xs={4}>
                <Paper
                  className={classes.paper}
                  style={{ background: "#EFF0F6" }}
                >
                  <div className={classes.searchCardFour}>
                    <div className={classes.searchIconCardFour}>
                      <TocOutlinedIcon fontSize="large" />
                      <Typography
                        style={{
                          fontSize: "1rem",
                          fontWeight: 400,
                          color: "#14142B",
                          letterSpacing: "0.047rem",
                          lineHeight: 0,
                          paddingLeft: "1.25rem",
                        }}
                      >
                        To
                      </Typography>
                    </div>
                    <TextField
                      fullWidth
                      type="date"
                      InputProps={{
                        disableUnderline: true,
                      }}
                      classes={{
                        root: classes.inputRootCardFour,
                      }}
                      size={"small"}
                    />
                  </div>
                </Paper>
              </Grid>
              <Grid item className={classes.gridItem} xs={4}>
                <Paper
                  className={classes.paper}
                  style={{ background: "#EFF0F6" }}
                >
                  <div className={classes.searchCardFour}>
                    <div className={classes.searchIconCardFour}>
                      <TocOutlinedIcon fontSize="large" />
                    </div>
                    <TextField
                      fullWidth
                      InputProps={{
                        disableUnderline: true,
                      }}
                      classes={{
                        root: classes.inputRootCardFour,
                      }}
                      label={"Filter By"}
                      size={"small"}
                    />
                  </div>
                </Paper>
              </Grid>
              <Grid item className={classes.gridItem} xs={12}>
                <Paper className={classes.paperTable}>
                  <Box>
                    {props.children}
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </div>
      </Box>
    </Card>
  );
}
