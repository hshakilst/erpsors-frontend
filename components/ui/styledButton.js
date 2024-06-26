import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles,createStyles,useTheme } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) =>
  createStyles({
  root: {
    "& .MuiButton-containedPrimary": {
      color: "#F7F7FC",
      background: theme.palette.primary.main,
    },
    "& .MuiButton-root": {
      padding: "0.5rem 1.875rem",
      fontSize: "1rem",
      fontWeight: 600,
      borderRadius: "2.5rem",
      textTransform: "capitalize",
    },
  },
}));

const StyledButton = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button
        className={classes.root}
        variant="contained"
        color="primary"
        endIcon={props.endIcon}
        {...props}
      >
        {props.label}
      </Button>
    </div>
  );
};

export default StyledButton;
