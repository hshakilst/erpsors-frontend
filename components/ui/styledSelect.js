import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 80,
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
      color: "#14142B",
      letterSpacing: "0.047rem",
    },
    "& .MuiSelect-icon": {
      color: "#14142B",
      top: "calc(50% - 9px)",
      right: 0,
      position: "absolute",
    },
    "& .MuiSelect-select:focus": {
      background: "#EFF0F6",
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
      backgroundColor: "#EFF0F6",
      fontSize: "1rem",
      fontWeight: 400,
      color: "#14142B",
      letterSpacing: "0.047rem",
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
  },
}));

export default function SimpleSelect() {
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
