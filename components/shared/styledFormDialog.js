import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import dynamic from "next/dynamic";

const StyledFormItems = dynamic(
  () => import("@/components/items/styledFormItems"),
  { ssr: false, loading: () => <p>...</p> }
);

export default function StyledFormDialog({
  label,
  data,
  open,
  handleClose,
  ...props
}) {
  // const [open, setOpen] = React.useState(show);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{label}</DialogTitle>
        <DialogContent>
          <DialogContentText>{`Update ${label}`}</DialogContentText>
          <Typography variant="h6">{JSON.stringify(data)}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
