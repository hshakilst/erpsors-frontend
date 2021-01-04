import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      maxWidth:"30ch"
    },
  },
  success: {
    color: "#FCFCFC !important",
    backgroundColor: "#00BA88 !important",
  },
  error: {
    color: "#FCFCFC !important",
    backgroundColor: "#ed2e7e !important",
  },
  info: {
    color: "#FCFCFC !important",
    backgroundColor: "#5F2EEA !important",
  },
  warning: {
    color: "#FCFCFC !important",
    backgroundColor: "#F4B740 !important",
  },
}));

const notistackRef = React.createRef();

const onClickDismiss = (key) => () => {
  notistackRef.current.closeSnackbar(key);
};

const StyledSnackbar = (props) => {
  const classes = useStyles();
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      ref={notistackRef}
      action={(key) => (
        <IconButton
          color="inherit"
          onClick={onClickDismiss(key)}
          component="span"
          aria-label="close"
        >
          <CloseOutlinedIcon />
        </IconButton>
      )}
      classes={{
        root: classes.root,
        variantSuccess: classes.success,
        variantError: classes.error,
        variantWarning: classes.warning,
        variantInfo: classes.info,
      }}
    >
      {props.children}
    </SnackbarProvider>
  );
};

export default StyledSnackbar;
