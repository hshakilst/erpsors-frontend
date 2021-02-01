import React from "react";
import Paper from "@material-ui/core/Paper";

const StyledPaper = (props) => {
  return (
    <Paper style={props.style} className={props.className} {...props}>
      {props.children}
    </Paper>
  );
};

export default StyledPaper;
