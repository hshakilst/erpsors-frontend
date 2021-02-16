import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Grid, IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%",
    "& label + .MuiInput-formControl": {
      marginTop: ".8rem",
    },
    "& .MuiInputLabel-formControl": {
      top: "0px",
      left: 22,
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
      background: "#fff",
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

export default function styledSelectForm(props) {
  const classes = useStyles();
  const [items, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">
        {props.label}
      </InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={items}
        onChange={handleChange}
        label="Items"
        {...props}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
}
