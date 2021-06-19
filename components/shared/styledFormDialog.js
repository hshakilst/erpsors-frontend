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
import StyledButton from "@/components/ui/styledButton";

const StyledTableItems = dynamic(
  () => import("@/components/update-forms/items"),
  { ssr: false, loading: () => <p>...</p> }
);

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
  // const [open, setOpen] = React.useState(show);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      className={classes.root}
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
      <DialogContent style={{ marginTop: -8 }}>
        <Box>
          <StyledTableItems />
        </Box>
      </DialogContent>
      <DialogActions>
        <div
          style={{
            float: "right",
            marginTop: 8,
            marginBottom: 4,
            marginRight: "1.75rem",
          }}
        >
          <div style={{ float: "left" }}>
            <StyledButton
              label={"Add"}
              style={{
                background: "none",
                padding: "0.25rem 1.5rem",
                color: theme.palette.primary.main,
                border: "0.125rem solid #5F2EEA",
                boxShadow: "none",
                marginRight: "0.625rem",
              }}
              type="submit"
            ></StyledButton>
          </div>
          <div style={{ float: "left" }}>
            <StyledButton
              label={"Clear"}
              style={{
                background: "none",
                padding: "0.25rem 1.5rem",
                color: theme.palette.primary.main,
                border: "0.125rem solid #D6D8E7",
                boxShadow: "none",
              }}
              onClick={() => reset()}
            />
          </div>
        </div>
      </DialogActions>
    </Dialog>
  );
}
