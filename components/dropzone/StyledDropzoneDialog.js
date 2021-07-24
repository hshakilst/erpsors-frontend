import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import {
  makeStyles,
  createStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Box,
  Fade,
  Hidden,
  Typography,
  Divider,
} from "@material-ui/core";
import {
  ReactExcel,
  readFile,
  generateObjects,
} from "@/components/excel-utils/excelRenderer";
import ItemsSchema from "@/validators/items";
import { useTheme } from "@material-ui/core/styles";
import { useCreateItem } from "@/adapters/items";

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
  const theme = useTheme();
  const [initialData, setInitialData] = useState(undefined);
  const [currentSheet, setCurrentSheet] = useState({});
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const [progress, setProgress] = React.useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setInitialData(undefined);
    setCurrentSheet({});
    setLoading(false);
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    //read excel file
    readFile(file)
      .then((readData) => setInitialData(readData))
      .catch((error) => console.error(error));
  };

  const save = async () => {
    setLoading(true);
    await Promise.resolve(generateObjects(currentSheet)).then((objects) => {
      objects.map((object) => {
        ItemsSchema.validate(object, {
          abortEarly: true,
          strict: true,
          stripUnknown: true,
        })
          .then(async (object) => {
            await Promise.resolve(useCreateItem(object)).then(({ error }) => {
              if (!error) setProgress((prevState) => prevState + 1);
            });
          })
          .catch((error) => {
            if (error.name === "ValidationError") {
              setErrors((prevState) => [...prevState, object]);
            } else {
              console.log(error);
            }
          });
      });
    });
  };

  return (
    <div>
      <Button
        startIcon={<AddOutlinedIcon />}
        variant={"text"}
        color="primary"
        style={{ borderRadius: 16 }}
        onClick={handleOpen}
      >
        <Hidden xsDown>{"Import Data"}</Hidden>
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Upload a File</DialogTitle>
        <DialogContent>
          {!loading ? (
            <>
              <Box textAlign={"center"} hidden={loading}>
                <input
                  type="file"
                  accept=".xlsx, .csv"
                  onChange={handleUpload}
                  style={{
                    border: "2px dashed #4E4B66",
                    padding: 20,
                    width: "80%",
                  }}
                />
                <ReactExcel
                  initialData={initialData}
                  onSheetUpdate={(currentSheet) =>
                    setCurrentSheet(currentSheet)
                  }
                  activeSheetClassName="active-sheet"
                  reactExcelClassName="react-excel"
                />
              </Box>
            </>
          ) : (
            <Fade in={loading}>
              <Box>
                <LinearProgress variant="determinate" value={100} />
                <Typography style={{ marginTop: 4 }}>{progress}</Typography>
                <Divider />
                {errors.length > 0 ? (
                  errors?.map((error, idx) => (
                    <Typography
                      key={idx}
                    >{`Error Uploading Item ${error.code}`}</Typography>
                  ))
                ) : (
                  <Typography>{"Upload Successful!"}</Typography>
                )}
              </Box>
            </Fade>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button disabled={loading} onClick={save} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
