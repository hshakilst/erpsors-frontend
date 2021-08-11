import React, { Fragment, useState } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {
  makeStyles,
  createStyles,
  alpha,
  useTheme,
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    inputRoot: {
      lineHeight: 0,
      // paddingLeft: "1.25rem",
      "& .MuiInputLabel-animated": {
        fontSize: ".975rem",
        fontWeight: 400,
        color: theme.palette.grey.title,
        lineHeight: 0,
        paddingLeft: "1.25rem",
        paddingTop: "0.4rem",
      },
      "& .MuiInputBase-input": {
        fontSize: ".975rem",
        fontWeight: 400,
        color: theme.palette.grey.title,
        letterSpacing: "0.047rem",
        paddingTop: "0.4rem",
        paddingLeft: "1.25rem",
      },
      [theme.breakpoints.up("md")]: {
        width: "100%",
      },
      [theme.breakpoints.up("sm")]: {
        width: "100%",
      },
      [theme.breakpoints.up("xs")]: {
        width: "100%",
      },
    },
  })
);

export default function StyledDatePicker(props) {
  const theme = useTheme();
  const classes = useStyles();
  const [selectedDate, handleDateChange] = useState(null);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        autoOk
        clearable
        label={props.label}
        format="yyyy-MM-dd"
        InputProps={{
          disableUnderline: true,
        }}
        classes={{
          root: classes.inputRoot,
        }}
        value={selectedDate}
        onChange={handleDateChange}
        {...props}
      />
    </MuiPickersUtilsProvider>
  );
}
