import { Box } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useTheme, makeStyles, createStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& .MuiPaper-root": {
        borderRadius: 16,
      },
    },
  })
);

export default function withStyledUpdateForm(WrappedComponent) {
  return ({ data, label, open, handleClose, ...props }) => {
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.root}
        {...props}
      >
        <DialogTitle
          id="form-dialog-title"
          style={{
            float: "left",
            textAlign: "left",
            marginTop: 4,
            fontSize: "1.125rem",
            fontWeight: 400,
            color: theme.palette.grey.title,
            letterSpacing: "0.047rem",
          }}
        >
          {label}
        </DialogTitle>
        <DialogContentText
          style={{
            paddingLeft: "1.5rem",
            marginTop: -16,
            fontSize: "0.75rem",
            fontWeight: 200,
            color: theme.palette.grey.body,
            letterSpacing: "0.047rem",
          }}
        >
          {`Update ${label}`}
        </DialogContentText>
        <DialogContent style={{ marginTop: -8, marginBottom: "1rem" }}>
          <Box>
            <WrappedComponent data={data} handleClose={handleClose} />
          </Box>
        </DialogContent>
      </Dialog>
    );
  };
}
