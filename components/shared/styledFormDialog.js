import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import dynamic from "next/dynamic";
import Box from "@material-ui/core/Box";
import { useTheme, makeStyles, createStyles } from "@material-ui/core/styles";
import StyledTableItems from "@/components/update-forms/items";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& .MuiPaper-root": {
        borderRadius: 16,
      },
    },
  })
);

export default function StyledFormDialog({
  label,
  data,
  open,
  handleClose,
  ...props
}) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      className={classes.root}
      {...props}
    >
      <DialogTitle
        id="form-dialog-title"
        style={{ float: "left", textAlign: "left", marginTop: 4 }}
      >
        <Typography
          style={{
            fontSize: "1.125rem",
            fontWeight: 400,
            color: theme.palette.grey.title,
            letterSpacing: "0.047rem",
          }}
        >
          {label}
        </Typography>
      </DialogTitle>
      <DialogContentText style={{ paddingLeft: "1.5rem", marginTop: -16 }}>
        <Typography
          style={{
            fontSize: "0.75rem",
            fontWeight: 200,
            color: theme.palette.grey.body,
            letterSpacing: "0.047rem",
          }}
        >
          {`Update ${label}`}
        </Typography>
      </DialogContentText>
      <DialogContent style={{ marginTop: -8, marginBottom: "1rem" }}>
        <Box>
          <StyledTableItems data={data} handleClose={handleClose} />
        </Box>
      </DialogContent>
    </Dialog>
  );
}
