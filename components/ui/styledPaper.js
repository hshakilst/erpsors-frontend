import React from "react";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const StyledPaper = (props) => {
  return (
    <Box display="flex" flexWrap={"wrap"} flexDirection="column" alignItems="center">
      <Paper
        display="flex"
        flexDirection="column"
        alignItems="center"
        style={{ borderRadius: 16 }}
        className={props.className}
        {...props}
      >
        {props.children}
      </Paper>
    </Box>
  );
};

export default StyledPaper;
