import React, { useState } from "react";
import { DropzoneDialog } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import {
  makeStyles,
  createStyles,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { ReactExcel, readFile, generateObjects } from "@ramonak/react-excel";

const useStyles = makeStyles((theme) =>
  createStyles({
    previewChip: {
      minWidth: 160,
      maxWidth: 210,
    },
    paper: {
      borderRadius: 16,
    },
    dropzone: {
      borderRadius: 16,
    },
  })
);

export default function StyledDropzoneDialog(props) {
  const [initialData, setInitialData] = useState(undefined);
  const [currentSheet, setCurrentSheet] = useState({});
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setInitialData(undefined);
    setCurrentSheet({});
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    //read excel file
    readFile(file)
      .then((readedData) => setInitialData(readedData))
      .catch((error) => console.error(error));
  };

  const save = () => {
    const result = generateObjects(currentSheet);
    //save array of objects to backend
    console.log(result);
  };

  return (
    <>
      <Button
        startIcon={<AddOutlinedIcon />}
        variant={"text"}
        color="primary"
        style={{ borderRadius: 16 }}
        onClick={handleOpen}
      >
        Import Data
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload a File</DialogTitle>
        <DialogContent>
          <input type="file" accept=".xlsx, .csv" onChange={handleUpload} />
          <ReactExcel
            initialData={initialData}
            onSheetUpdate={(currentSheet) => setCurrentSheet(currentSheet)}
            activeSheetClassName="active-sheet"
            reactExcelClassName="react-excel"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              save();
              handleClose();
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
