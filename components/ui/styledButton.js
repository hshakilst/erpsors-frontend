import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    "& .MuiButton-containedPrimary": {
      color: "#F7F7FC",
      background: "#5F2EEA",
    },
    "& .MuiButton-root": {
      padding: "0.5rem 1.875rem",
      fontSize: "1rem",
      fontWeight: 600,
      borderRadius: "2.5rem",
      textTransform: "capitalize",
    },
  },
});

const StyledButton = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button
        className={classes.root}
        variant="contained"
        color="primary"
        href="#contained-buttons"
        onClick={props.onClick}
        style={props.style}
        endIcon={props.endIcon}
        {...props}
      >
        {props.label}
      </Button>
    </div>
  );
};

export default StyledButton;
