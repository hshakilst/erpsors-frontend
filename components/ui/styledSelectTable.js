import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%",
    "& label + .MuiInput-formControl": {
      marginTop: "0",
    },
    "& .MuiInputLabel-formControl": {
      top: "-12px",
      left: 0,
      position: "absolute",
    },
    "& .MuiFormLabel-root": {
      fontSize: "1rem",
      fontWeight: 400,
      color: theme.palette.grey.title,
      letterSpacing: "0.047rem",
    },
    "& .MuiSelect-icon": {
      color: theme.palette.grey.title,
      top: "calc(50% - 9px)",
      right: 0,
      position: "absolute",
    },
    "& .MuiSelect-select:focus": {
      background: theme.palette.grey.inputBackground,
    },
    "& .MuiInput-underline:before": {
      border: "none",
      content: "none",
    },
    "& .MuiInput-underline:after": {
      border: "none",
      content: "none",
    },
    "& .MuiMenu-list": {
      backgroundColor: theme.palette.grey.inputBackground,
      fontSize: "1rem",
      fontWeight: 400,
      color: theme.palette.grey.title,
      letterSpacing: "0.047rem",
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
  },
}));

export default function SimpleSelect() {
  const theme = useTheme();
  const classes = useStyles();
  const [items, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Items</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={items}
          onChange={handleChange}
          label="Items"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
