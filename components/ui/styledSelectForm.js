import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
// import { Grid, IconButton } from "@material-ui/core";
import { Controller } from "react-hook-form";

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

export default function styledSelectForm({
  name,
  label,
  control,
  defaultValue,
  children,
  ...props
}) {
  const classes = useStyles();
  const labelId = `${name}-label`;
  // const [items, setAge] = React.useState("");

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  return (
    <FormControl className={classes.formControl} {...props}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        render={(params) => (
          <Select {...params} >
            {children}
          </Select>
        )}
        name={name}
        defaultValue={defaultValue}
        control={control}
      />
    </FormControl>
  );
}
