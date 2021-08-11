import React from "react";
import {
  makeStyles,
  createStyles,
  alpha,
  useTheme,
} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TocOutlinedIcon from "@material-ui/icons/TocOutlined";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import { withSnackbar } from "notistack";
import { useUpdateStoreRequisitionById } from "@/adapters/store-requisitions";
import StyledAutoCompleteForm from "@/components/ui/styledAutoCompleteForm";
import { useGetAllWarehouseCodes } from "@/adapters/warehouses";
import { useGetAllItemCodes } from "@/adapters/items";
import LogRocket from "logrocket";
import StyledButton from "@/components/ui/styledButton";
import StyledDatePicker from "@/components/ui/styledDatePicker";

const useStyles = makeStyles((theme) =>
  createStyles({
    media: {
      height: 0,
      paddingTop: "56.25%",
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    rootGrid: {
      flexGrow: 1,
      backgroundColor: theme.palette.grey.inputBackground,
      padding: theme.spacing(2),
      borderRadius: "1rem",
      "& .MuiPaper-elevation1": {
        boxShadow: "none",
      },
      "& .MuiPaper-root": {
        borderRadius: "1rem",
      },
    },
    paper: {
      backgroundColor: "#fff",
      padding: theme.spacing(0),
      textAlign: "left",
      paddingLeft: "1.25rem",
      borderRadius: "1rem",
      "& .MuiPaper-elevation1": {
        boxShadow: "none",
      },
    },
    gridItem: {
      flexDirection: "column",
      flexGrow: 1,
      justifyContent: "center",
      textAlign: "center",
    },
    search: {
      height: "3.5rem",
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
      [theme.breakpoints.up("xs")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      left: "-40px",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: theme.palette.grey.title,
    },
    inputRoot: {
      lineHeight: 0,
      "& .MuiInputLabel-formControl": {
        [theme.breakpoints.down("sm")]: {
          top: "-5px",
          left: 0,
          position: "absolute",
          transform: "translate(0, 24px) scale(1)",
        },
      },
      "& .MuiInputLabel-animated": {
        fontSize: ".975rem",
        fontWeight: 400,
        color: theme.palette.grey.title,
        lineHeight: 0,
        paddingLeft: "1.25rem",
        paddingTop: "0.5rem",
        [theme.breakpoints.down("sm")]: {
          lineHeight: 1,
          paddingTop: 0,
        },
      },
      "& .MuiInputBase-input": {
        fontSize: ".975rem",
        fontWeight: 400,
        color: theme.palette.grey.title,
        letterSpacing: "0.047rem",
        paddingTop: "0.4rem",
        paddingLeft: "1.25rem",
      },
      [theme.breakpoints.up("md")]: {
        width: "100%",
      },
      [theme.breakpoints.up("sm")]: {
        width: "100%",
      },
      [theme.breakpoints.up("xs")]: {
        width: "100%",
      },
    },
    selectRoot: {
      paddingLeft: "1.25rem",
    },
    ware: {
      "& .MuiInputLabel-animated": {
        paddingLeft: ".5rem",
      },
      "& .MuiAutocomplete-popupIndicator": {
        marginRight: "-23px",
      },
    },
  })
);

const StoreRequisitions = ({ data, handleClose, ...props }) => {
  const theme = useTheme();
  const classes = useStyles();
  const { register, handleSubmit, errors, control, reset, setValue } =
    useForm();

  React.useEffect(() => {
    setValue("date,", data.date);
    setValue("code", data.code);
    setValue("item", { code: data.item });
    setValue("reqQty", data.reqQty);
    setValue("warehouse", { code: data.warehouse });
    setValue("notes", data.notes);
    setValue("reqDate", data.reqDate);

    return () => {
      reset();
      setValue("date", null);
      setValue("reqDate", null);
    };
  }, [data]);

  const onSubmit = (form) => {
    let updateData = {};
    updateData.date = form.date;
    updateData.item = form.item?.code;
    updateData.reqQty = form.reqQty;
    updateData.warehouse = form.warehouse?.code;
    updateData.notes = form.notes;
    updateData.reqDate = form.reqDate;
    updateData.id = data.id;

    for (const property in updateData) {
      if (!updateData[property]) delete updateData[property];
    }
    Promise.resolve(useUpdateStoreRequisitionById(updateData))
      .then(({ error, data }) => {
        if (!error)
          props.enqueueSnackbar(`Update successful.`, {
            variant: "success",
            autoHideDuration: 5000,
          });
        else {
          props.enqueueSnackbar(`Update failed.`, {
            variant: "error",
            autoHideDuration: 5000,
          });
          LogRocket.captureException(data, {
            tags: { source: "FaunaDB Error" },
            extra: {
              component: "Requisition Update Form",
            },
          });
        }
      })
      .catch((error) => {
        props.enqueueSnackbar(`Something went wrong.`, {
          variant: "error",
          autoHideDuration: 5000,
        });
        LogRocket.captureException(error, {
          tags: { function: "onSubmit" },
          extra: {
            component: "Requisition Update Form",
          },
        });
      });
  };

  const onError = (errors) => {
    if (errors) {
      props.enqueueSnackbar("Please check your inputs.", {
        variant: "error",
        autoHideDuration: 10000,
      });
    }
  };

  return (
    <form component="form" onSubmit={handleSubmit(onSubmit, onError)}>
      <Box>
        <div className={classes.rootGrid}>
          <Grid container spacing={2}>
            <Grid
              item
              className={classes.gridItem}
              lg={6}
              md={12}
              sm={12}
              xs={12}
            >
              <Paper className={classes.paper}>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <TocOutlinedIcon fontSize="large" />
                  </div>
                  <StyledDatePicker
                    label={"Date"}
                    name={"date"}
                    //TODO:"Render option menu implement list of warehouse(Code(Secondary Text), Name(PrimaryText))"
                    //TODO:"Render input field implement Chips of warehouse(Code + Name)"
                    inputRef={register({
                      required: false,
                    })}
                    error={errors.date ? true : false}
                  />
                </div>
              </Paper>
            </Grid>
            <Grid
              item
              className={classes.gridItem}
              lg={6}
              md={12}
              sm={12}
              xs={12}
            >
              <Paper className={classes.paper}>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <TocOutlinedIcon fontSize="large" />
                  </div>
                  <StyledAutoCompleteForm
                    label={"Item"}
                    name={"item"}
                    defaultValue={null}
                    //TODO:"Render option menu implement list of warehouse(Code(Secondary Text), Name(PrimaryText))"
                    //TODO:"Render input field implement Chips of warehouse(Code + Name)"
                    control={control}
                    fetchOptions={useGetAllItemCodes}
                  />
                </div>
              </Paper>
            </Grid>
            <Grid
              item
              className={classes.gridItem}
              lg={6}
              md={12}
              sm={12}
              xs={12}
            >
              <Paper className={classes.paper}>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <TocOutlinedIcon fontSize="large" />
                  </div>
                  <TextField
                    fullWidth
                    InputProps={{
                      disableUnderline: true,
                    }}
                    classes={{
                      root: classes.inputRoot,
                    }}
                    label={"Required Qty."}
                    size={"small"}
                    name={"reqQty"}
                    //FIXME:Add validation pattern
                    inputRef={register({
                      required: false,
                    })}
                    error={errors.reqQty ? true : false}
                  />
                </div>
              </Paper>
            </Grid>
            <Grid
              className={classes.gridItem}
              item
              lg={6}
              md={12}
              sm={12}
              xs={12}
            >
              <Paper className={classes.paper}>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <TocOutlinedIcon fontSize="large" />
                  </div>
                  <StyledAutoCompleteForm
                    label={"Warehouse"}
                    name={"warehouse"}
                    defaultValue={null}
                    //TODO:"Render option menu implement list of warehouse(Code(Secondary Text), Name(PrimaryText))"
                    //TODO:"Render input field implement Chips of warehouse(Code + Name)"
                    control={control}
                    fetchOptions={useGetAllWarehouseCodes}
                  />
                </div>
              </Paper>
            </Grid>
            <Grid
              item
              className={classes.gridItem}
              lg={6}
              md={12}
              sm={12}
              xs={12}
            >
              <Paper className={classes.paper}>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <TocOutlinedIcon fontSize="large" />
                  </div>
                  <StyledDatePicker
                    label={"Required By"}
                    name={"reqDate"}
                    //TODO:"Render option menu implement list of warehouse(Code(Secondary Text), Name(PrimaryText))"
                    //TODO:"Render input field implement Chips of warehouse(Code + Name)"
                    inputRef={register({
                      required: false,
                    })}
                    error={errors.reqDate ? true : false}
                  />
                </div>
              </Paper>
            </Grid>
            <Grid
              item
              className={classes.gridItem}
              lg={12}
              md={12}
              sm={12}
              xs={12}
            >
              <Paper className={classes.paper}>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <TocOutlinedIcon fontSize="large" />
                  </div>
                  <TextField
                    fullWidth
                    InputProps={{
                      disableUnderline: true,
                    }}
                    classes={{
                      root: classes.inputRoot,
                    }}
                    label={"Notes"}
                    size={"small"}
                    name={"notes"}
                    //FIXME:Add validation pattern
                    inputRef={register({
                      required: false,
                    })}
                    error={errors.notes ? true : false}
                  />
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Box>
      <div style={{ float: "right", marginTop: "1rem" }}>
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
          />
        </div>
        <div style={{ float: "left" }}>
          <StyledButton
            label={"Cancel"}
            style={{
              background: "none",
              padding: "0.25rem 1.5rem",
              color: theme.palette.primary.main,
              border: "0.125rem solid #D6D8E7",
              boxShadow: "none",
            }}
            onClick={handleClose}
          />
        </div>
      </div>
    </form>
  );
};

export default withSnackbar(StoreRequisitions);
