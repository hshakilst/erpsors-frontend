import React, { useState } from "react";

import { makeStyles, createStyles, fade } from "@material-ui/core/styles";
import {
  IconButton,
  Link,
  Fade,
  Card,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { AddOutlined, TocOutlined, Add, Remove } from "@material-ui/icons";

import StyledButton from "@/components/ui/styledButton";
import StyledDatePicker from "@/components/ui/styledDatePicker";
import StyledAutoCompleteForm from "@/components/ui/styledAutoCompleteForm";

import { useForm } from "react-hook-form";
import { withSnackbar } from "notistack";

import { useCreateStoreRequisition } from "@/actions/store-requisitions";
import { useGetAllItemCodes } from "@/actions/items";
import { useGetAllWarehouseCodes } from "@/actions/warehouses";
import useAsync from "@/libs/useAsync";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
    },
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
      backgroundColor: "#EFF0F7",
      padding: theme.spacing(2),
      borderRadius: "1rem",
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
      "& .MuiTouchRipple-root": {
        top: 0,
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
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
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
      color: "#14142B",
    },
    inputRoot: {
      lineHeight: 0,
      // paddingLeft: "1.25rem",
      "& .MuiInputLabel-animated": {
        lineHeight: 0,
        fontSize: ".975rem",
        fontWeight: 400,
        color: "#14142B",
        lineHeight: 0,
        paddingLeft: "1.25rem",
        paddingTop: "0.5rem",
      },
      "& .MuiInputBase-input": {
        fontSize: ".975rem",
        fontWeight: 400,
        color: "#14142B",
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
    add: {
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
  })
);

const StyledFormStoreRequisitions = (props) => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    errors,
    control,
    reset,
    getValues,
    setValue,
    formState,
  } = useForm();

  const [inputFields, setInputFields] = useState([
    {
      action: "+",
    },
  ]);

  //TODO: Implement this async mechanism unto all the other forms
  const {
    execute: createRequisition,
    status,
    loading,
    value,
    error,
  } = useAsync((code, items, reqQty, warehouse, notes) => {
    return useCreateStoreRequisition(code, items, reqQty, warehouse, notes)
      .then((error, data) => {
        if (!error)
          props.enqueueSnackbar(`${JSON.stringify(data)}`, {
            variant: "success",
          });
        else
          props.enqueueSnackbar(`${JSON.stringify(data)}`, {
            variant: "error",
          });
      })
      .catch((error) => {
        props.enqueueSnackbar(`${JSON.stringify(error)}`, {
          variant: "error",
        });
      });
  }, false);

  const onSubmit = (data) => {
    console.log(data);
    let code = data.code;
    let items = data.items;
    let reqQty = data.reqQty;
    let warehouse = data.warehouse;
    let notes = data.notes;
    // createStoreRequisition.run(code, items, reqQty, warehouse, notes);
    // console.log(createStoreRequisition.loading);
    createRequisition(code, items, reqQty, warehouse, notes);
  };

  const onError = (errors) => {
    props.enqueueSnackbar(
      //FIXME: Change below code before deploying to production
      `${JSON.stringify(errors)}`,
      {
        variant: "error",
      }
    );
  };

  const handleChangeInput = (index, event) => {
    setValue(index, event.target.value);
  };

  const handleAddFields = () => {
    setInputFields([...inputFields, { action: "-" }]);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  return (
    <Card className={classes.root}>
      <Box>
        <div style={{ float: "left", textAlign: "left" }}>
          <Typography
            style={{
              fontSize: "1.125rem",
              fontWeight: 400,
              color: "#14142B",
            }}
          >
            Store Requisitions
          </Typography>
          <Typography
            style={{
              fontSize: "0.75rem",
              fontWeight: 200,
              color: "#4E4B66",
            }}
          >
            Create a store requisition
          </Typography>
        </div>
        <div style={{ float: "right", marginTop: ".5rem" }}>
          <div
            style={{
              height: "1.3rem",
              width: "1.3rem",
              textAlign: "right",
              float: "left",
              marginRight: "0.313rem",
              border: "0.063rem solid #D9DBE9",
              borderRadius: "1rem",
              cursor: "pointer",
            }}
          >
            <AddOutlined
              style={{
                color: "#14142B",
                fontSize: "1.125rem",
                marginRight: "0.018rem",
              }}
            ></AddOutlined>
          </div>
          <div
            className={classes.add}
            style={{ textAlign: "right", float: "left" }}
          >
            <Link
              component="button"
              variant="body2"
              style={{
                fontWeight: 500,
                fontSize: "0.875rem",
                color: "#5F2EEA",
                letterSpacing: "0.063rem",
              }}
              onClick={() => {
                console.info("I'm a button.");
              }}
            >
              Add multiple
            </Link>
          </div>
        </div>
      </Box>
      <form component="form" onSubmit={handleSubmit(onSubmit, onError)}>
        <Box style={{ marginTop: "3.438rem" }}>
          <div className={classes.rootGrid}>
            <Grid container spacing={2}>
              <Grid
                className={classes.gridItem}
                item
                lg={12}
                md={12}
                sm={12}
                xs={12}
              >
                <Paper className={classes.paper}>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <TocOutlined fontSize="large" />
                    </div>
                    <TextField
                      fullWidth
                      InputProps={{
                        disableUnderline: true,
                      }}
                      classes={{
                        root: classes.inputRoot,
                      }}
                      label={"Code"}
                      size={"small"}
                      name={"code"}
                      //FIXME:Add validation pattern
                      inputRef={register({
                        required: true,
                      })}
                      error={errors.code ? true : false}
                      required
                    />
                  </div>
                </Paper>
              </Grid>
              <Grid
                className={classes.gridItem}
                item
                lg={12}
                md={12}
                sm={12}
                xs={12}
              >
                <Paper className={classes.paper}>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <TocOutlined fontSize="large" />
                    </div>
                    <StyledDatePicker
                      InputProps={{
                        disableUnderline: true,
                      }}
                      classes={{
                        root: classes.inputRoot,
                      }}
                      label={"Date"}
                      name={"date"}
                      inputRef={register({
                        required: true,
                      })}
                      // error={errors.date ? true : false}
                      required
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
                      <TocOutlined fontSize="large" />
                    </div>
                    <StyledAutoCompleteForm
                      label={"Warehouse"}
                      name="warehouse"
                      defaultValue={null}
                      //TODO:"Render option menu implement list of warehouse(Code(Secondary Text), Name(PrimaryText))"
                      //TODO:"Render input field implement Chips of warehouse(Code + Name)"
                      control={control}
                      fetchOptions={useGetAllWarehouseCodes}
                      required
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
                      <TocOutlined fontSize="large" />
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

        {/* add multiple items form */}
        <Box style={{ marginTop: "1rem" }}>
          {inputFields.map((inputField, index) => (
            <Fade in={true} key={index}>
              <div
                className={classes.rootGrid}
                style={{ marginBottom: ".5rem" }}
              >
                <Grid container spacing={2} justify="center">
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
                          <TocOutlined fontSize="large" />
                        </div>
                        <StyledAutoCompleteForm
                          label={"Item"}
                          name={`items[${index}].item`}
                          onChange={(event) =>
                            handleChangeInput(`items[${index}].item`, event)
                          }
                          defaultValue={null}
                          //TODO:"Render option menu implement list of warehouse(Code(Secondary Text), Name(PrimaryText))"
                          //TODO:"Render input field implement Chips of warehouse(Code + Name)"
                          control={control}
                          fetchOptions={useGetAllItemCodes}
                          required
                        />
                      </div>
                    </Paper>
                  </Grid>
                  <Grid
                    item
                    className={classes.gridItem}
                    lg={5}
                    md={12}
                    sm={12}
                    xs={12}
                  >
                    <Paper className={classes.paper}>
                      <div className={classes.search}>
                        <div className={classes.searchIcon}>
                          <TocOutlined fontSize="large" />
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
                          name={`items[${index}].reqQty`}
                          onChange={(event) =>
                            handleChangeInput(`items[${index}].reqQty`, event)
                          }
                          //FIXME:Add validation pattern
                          inputRef={register({
                            required: true,
                          })}
                          // error={errors.reqQty ? true : false}
                          required
                          type={"number"}
                        />
                      </div>
                    </Paper>
                  </Grid>
                  <Grid
                    item
                    className={classes.gridItem}
                    lg={1}
                    md={4}
                    sm={4}
                    xs={4}
                  >
                    <Paper
                      style={{
                        marginTop: ".3rem",
                        backgroundColor: "#fff",
                        borderRadius: "1rem",
                      }}
                    >
                      {inputField.action === "+" ? (
                        <IconButton
                          aria-label={`add-item-${index}`}
                          style={{ borderRadius: "1rem", width: "100%" }}
                          onClick={() => handleAddFields()}
                        >
                          <Add style={{ color: "#14142B" }}></Add>
                        </IconButton>
                      ) : (
                        <IconButton
                          aria-label={`add-item-${index}`}
                          style={{ borderRadius: "1rem", width: "100%" }}
                          onClick={() => handleRemoveFields(index)}
                        >
                          <RemoveIcon style={{ color: "#14142B" }}></RemoveIcon>
                        </IconButton>
                      )}
                    </Paper>
                  </Grid>
                </Grid>
              </div>
            </Fade>
          ))}
        </Box>
        <div style={{ float: "right", marginTop: "1rem" }}>
          <div style={{ float: "left" }}>
            <StyledButton
              label={"Add"}
              style={{
                background: "none",
                padding: "0.25rem 1.5rem",
                color: "#5F2EEA",
                border: "0.125rem solid #5F2EEA",
                boxShadow: "none",
                marginRight: "0.625rem",
              }}
              type="submit"
              disabled={loading}
            >
              {loading && (
                <CircularProgress
                  style={{ marginLeft: -10, marginRight: 8 }}
                  size={20}
                />
              )}
            </StyledButton>
          </div>
          <div style={{ float: "left" }}>
            <StyledButton
              label={"Clear"}
              style={{
                background: "none",
                padding: "0.25rem 1.5rem",
                color: "#5F2EEA",
                border: "0.125rem solid #D6D8E7",
                boxShadow: "none",
              }}
              onClick={() => reset()}
            ></StyledButton>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default withSnackbar(StyledFormStoreRequisitions);
