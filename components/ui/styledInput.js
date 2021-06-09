import React from "react";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const StyledInput = (props) => {
  const theme = useTheme();
  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiOutlinedInput-root": {
        marginRight: -8,
        marginLeft: 8,
        fontSize: "1rem",
        fontWeight: "400",
        letterSpacing: "0.047rem",
        marginBottom: 0,
      },
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderStyle: "none",
        marginBottom: -2,
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderStyle: "none",
      },
      "& .MuiInputLabel-outlined": {
        marginLeft: 8,
        fontSize: "1rem",
        fontWeight: "400",
        letterSpacing: "0.047rem",
      },
      "& .MuiInputLabel-outlined.Mui-focused": {
        color: props.error ? "#C30052" : theme.palette.grey.title,
      },
      "& .MuiGrid-root.MuiGrid-container": {
        borderRadius: "1rem",
        paddingTop: 8,
        paddingLeft: 12,
        paddingRight: 12,
        paddingBottom: 4,
        backgroundColor: props.error ? "#FFDFED" : theme.palette.grey.inputBackground,
        margin: "auto",
      },
      "& .MuiIconButton-root": {
        paddingLeft: 0,
        paddingRight: 0,
        color: "black",
        marginBottom: 4,
        backgroundColor: "transparent",
      },
      "& .MuiSvgIcon-fontSizeSmall": {
        fontSize: "1rem",
      },
      "& .Mui-error": {
        transitions: theme.transitions.create(["border"]),
      },
    },
  }));

  const classes = useStyles();

  return (
    <Container className={classes.root}  style={props.style}>
      <Grid container alignItems={"center"}>
        <Grid item xs={1}>
          {props.startIcon}
        </Grid>
        <Grid item xs={10}>
          <TextField
            name={props.name}
            onClick={props.onClick}
            label={props.label}
            variant="outlined"
            type={props.type}
            size="small"
            error={props.error}
            inputRef={props.inputRef}
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton>{props.endIcon}</IconButton>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StyledInput;
