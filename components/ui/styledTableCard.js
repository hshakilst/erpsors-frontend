import React from "react";
import { makeStyles, createStyles, fade } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import ShortTextOutlinedIcon from "@material-ui/icons/ShortTextOutlined";
import TocOutlinedIcon from "@material-ui/icons/TocOutlined";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import StyledCardAppBar from "@/components/ui/styledCardAppBar";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import StyledSelectTable from "./styledSelectTable";
import StyledDatagridTable from "./styledData-grid";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(0),
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
      padding: theme.spacing(1),
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
      paddingTop: theme.spacing(1.3),
      paddingBottom: theme.spacing(1.3),
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
      textAlign: "center",
      "& .MuiAppBar-colorPrimary": {
        background: "#EFF0F6",
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
    gridDropdownOne: {
      display: "none",
      [theme.breakpoints.down("xs")]: {
        display: "block",
      },
      [theme.breakpoints.down("sm")]: {
        display: "block",
      },
      flexDirection: "column",
      flexGrow: 1,
      justifyContent: "end",
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
    gridDropdownTwo: {
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
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
    gridItemOne: {
      display: "none",
      [theme.breakpoints.down("xs")]: {
        display: "block",
      },
      [theme.breakpoints.down("sm")]: {
        display: "block",
      },
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
    gridItemTwo: {
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
      flexDirection: "column",
      flexGrow: 1,
      justifyContent: "right",
      textAlign: "right",
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
      padding: theme.spacing(1.8, 2, 0, 0),
      paddingLeft: `calc(1em + ${theme.spacing(0)}px)`,
      fontSize: "1rem",
      fontWeight: 400,
      color: "#14142B",
      letterSpacing: "0.047rem",
    },
    inputInput: {
      padding: theme.spacing(2.5, 0, 0, 0),
      paddingLeft: `calc(1em + ${theme.spacing(0)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
    },
    searchTableCard: {
      height: "3.5rem",
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      paddingLeft: "1.25rem",
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
        marginRight: theme.spacing(2),
      },
      [theme.breakpoints.up("xs")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
        marginRight: theme.spacing(2),
      },
      "& .MuiInput-underline:before": {
        border: "none",
      },
      "& .MuiInputBase-root.Mui-disabled": {
        fontSize: ".975rem",
        fontWeight: 400,
        color: "#14142B",
        paddingLeft: "5.5rem",
      },
      "& .MuiIconButton-root": {
        color: "#14142B",
      },
    },
    searchIconTableCard: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      left: "-2.5rem",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#14142B",
      paddingLeft: "1.6rem",
    },
    inputRootTableCard: {
      lineHeight: 0,
      "& .MuiInputLabel-animated": {
        fontSize: ".975rem",
        fontWeight: 400,
        color: "#14142B",
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
    inputRootTableCardFilter: {
      lineHeight: 0,
      "& .MuiInputLabel-animated": {
        fontSize: ".975rem",
        fontWeight: 400,
        color: "#14142B",
        lineHeight: 0,
        paddingLeft: "1.25rem",
        paddingTop: "0.5rem",
      },
      "& .MuiInputBase-inputMarginDense": {
        fontSize: "1rem",
        fontWeight: 400,
        color: "#14142B",
        letterSpacing: "0.047rem",
      },
      "& .MuiInputBase-input": {
        fontSize: ".975rem",
        fontWeight: 400,
        color: "#14142B",
        letterSpacing: "0.047rem",
        paddingTop: "0.4rem",
        paddingLeft: "1.25rem",
      },
    },
    inputInputTableCard: {
      padding: theme.spacing(1.5, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
    },
  })
);

const TextFieldComponent = (props) => {
  return <TextField {...props} disabled={true} />;
};

export default function StyledTableCard(props) {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Card className={classes.root}>
      <Box>
        <div className={classes.rootGrid}>
          <Box>
            <Grid container spacing={2}>
              <Grid
                className={classes.gridDropdownOne}
                item
                lg={3}
                md={3}
                sm={10}
                xs={9}
              >
                <Paper
                  className={classes.paperDropdown}
                  style={{ background: "#EFF0F6" }}
                >
                  <Box>
                    <Grid
                      container
                      spacing={0}
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <Grid
                        item
                        lg={3}
                        md={3}
                        sm={3}
                        xs={3}
                        style={{ textAlign: "left" }}
                      >
                        <ShortTextOutlinedIcon
                          style={{
                            fontSize: "2rem",
                            color: "14142B",
                          }}
                        ></ShortTextOutlinedIcon>
                      </Grid>
                      <Grid
                        item
                        lg={9}
                        md={9}
                        sm={9}
                        xs={9}
                        style={{ textAlign: "left" }}
                      >
                        <StyledSelectTable></StyledSelectTable>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Grid>
              <Grid
                className={classes.gridDropdownTwo}
                item
                lg={3}
                md={3}
                sm={12}
                xs={12}
              >
                <Paper
                  className={classes.paperDropdown}
                  style={{ background: "#EFF0F6" }}
                >
                  <Box>
                    <Grid
                      container
                      spacing={0}
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <Grid
                        item
                        lg={3}
                        md={3}
                        sm={3}
                        xs={3}
                        style={{ textAlign: "left" }}
                      >
                        <ShortTextOutlinedIcon
                          style={{
                            fontSize: "2rem",
                            color: "14142B",
                          }}
                        ></ShortTextOutlinedIcon>
                      </Grid>
                      <Grid
                        item
                        lg={9}
                        md={9}
                        sm={9}
                        xs={9}
                        style={{ textAlign: "left" }}
                      >
                        <StyledSelectTable></StyledSelectTable>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Grid>
              <Grid
                item
                className={classes.gridItemOne}
                lg={2}
                md={2}
                sm={2}
                xs={3}
                style={{ margin: "auto" }}
              >
                <Paper className={classes.paperIcon}>
                  <StyledCardAppBar></StyledCardAppBar>
                </Paper>
              </Grid>
              <Grid
                item
                className={classes.gridItem}
                lg={7}
                md={7}
                sm={12}
                xs={12}
              >
                <Paper
                  className={classes.paper}
                  style={{ background: "#EFF0F6" }}
                >
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon style={{ fontSize: "1.875rem" }} />
                    </div>
                    <TextField
                      placeholder="Search…"
                      fullWidth
                      InputProps={{
                        disableUnderline: true,
                      }}
                      classes={{
                        root: classes.inputRoot,
                      }}
                    />
                  </div>
                </Paper>
              </Grid>
              <Grid
                item
                className={classes.gridItemTwo}
                lg={2}
                md={2}
                sm={2}
                xs={2}
                style={{ margin: "auto" }}
              >
                <Paper className={classes.paperIcon}>
                  <StyledCardAppBar></StyledCardAppBar>
                </Paper>
              </Grid>
              <Grid
                item
                className={classes.gridItem}
                lg={4}
                md={6}
                sm={12}
                xs={12}
              >
                <Paper
                  className={classes.paper}
                  style={{ background: "#EFF0F6", zIndex: "99" }}
                >
                  <div className={classes.searchTableCard}>
                    <div className={classes.searchIconTableCard}>
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
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        maxDate={new Date()}
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                        TextFieldComponent={TextFieldComponent}
                      />
                    </MuiPickersUtilsProvider>
                  </div>
                </Paper>
              </Grid>
              <Grid
                item
                className={classes.gridItem}
                lg={4}
                md={6}
                sm={12}
                xs={12}
              >
                <Paper
                  className={classes.paper}
                  style={{ background: "#EFF0F6" }}
                >
                  <div className={classes.searchTableCard}>
                    <div className={classes.searchIconTableCard}>
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
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        maxDate={new Date()}
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                        TextFieldComponent={TextFieldComponent}
                      />
                    </MuiPickersUtilsProvider>
                  </div>
                </Paper>
              </Grid>
              <Grid
                item
                className={classes.gridItem}
                lg={4}
                md={12}
                sm={12}
                xs={12}
              >
                <Paper
                  className={classes.paper}
                  style={{ background: "#EFF0F6" }}
                >
                  <div className={classes.searchTableCard}>
                    <div className={classes.searchIconTableCard}>
                      <TocOutlinedIcon fontSize="large" />
                    </div>
                    <TextField
                      fullWidth
                      InputProps={{
                        disableUnderline: true,
                      }}
                      classes={{
                        root: classes.inputRootTableCardFilter,
                      }}
                      label={"Filter By"}
                      size={"small"}
                    />
                  </div>
                </Paper>
              </Grid>
              <Grid
                item
                className={classes.gridItem}
                lg={12}
                md={12}
                sm={12}
                xs={12}
              >
                <Paper className={classes.paperTable}>
                  <Box>{props.children}</Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </div>
      </Box>
    </Card>
  );
}
