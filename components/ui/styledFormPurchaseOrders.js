import React from "react";
import { makeStyles, createStyles, fade } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { Link } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TocOutlinedIcon from "@material-ui/icons/TocOutlined";
import StyledButton from "./styledButton";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import { withSnackbar } from "notistack";
import { useCreatePurchaseOrder } from "@/actions/purchase-orders";
import StyledSelectForm from "@/components/ui/styledSelectForm";
import MenuItem from "@material-ui/core/MenuItem";
import StyledAutoCompleteForm from "@/components/ui/styledAutoCompleteForm";
import { useGetAllStoreRequisitionCodes } from "@/actions/store-requisitions";
import { useGetAllSupplierCodes } from "@/actions/suppliers";
import { useGetAllItemCodes } from "@/actions/items";

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
    selectRoot: {
      paddingLeft: "1.25rem",
      // [theme.breakpoints.up("md")]: {
      //   width: "100%",
      // },
      // [theme.breakpoints.up("sm")]: {
      //   width: "100%",
      // },
      // [theme.breakpoints.up("xs")]: {
      //   width: "100%",
      // },
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

const StyledFormPurchaseOrders = (props) => {
  const classes = useStyles();
  const { register, handleSubmit, errors, control, watch, reset } = useForm();
  const watchPurMode = watch("purMode");

  const onSubmit = async (data) => {
    console.log(data);
    let code = data.code;
    let reqCode = data.reqCode;
    let item = data.item;
    let rate = data.rate;
    let appQty = data.appQty;
    let supplier = data.supplier;
    let purMode = data.purMode;
    let creDays = data.creDays;
    let purBy = data.purBy;
    let notes = data.notes;

    try {
      const { error, data } = await useCreatePurchaseOrder(
        code,
        reqCode,
        item,
        rate,
        appQty,
        supplier,
        purMode,
        creDays,
        purBy,
        notes
      );
      if (!error)
        props.enqueueSnackbar(`${JSON.stringify(data)}`, {
          variant: "success",
        });
      else
        props.enqueueSnackbar(`${JSON.stringify(data)}`, {
          variant: "error",
        });
    } catch (error) {
      props.enqueueSnackbar(
        //FIXME: Change below code before deploying to production
        `${JSON.stringify(error)}`,
        {
          variant: "error",
        }
      );
    }
  };

  const onError = (errors) => {
    if (errors) {
      props.enqueueSnackbar("Errors", {
        variant: "error",
        autoHideDuration: 10000,
      });
    }
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
            Purchase Orders
          </Typography>
          <Typography
            style={{
              fontSize: "0.75rem",
              fontWeight: 200,
              color: "#4E4B66",
            }}
          >
            Create a purchase order
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
            <AddOutlinedIcon
              style={{
                color: "#14142B",
                fontSize: "1.125rem",
                marginRight: "0.018rem",
              }}
            ></AddOutlinedIcon>
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
                      label={"Code"}
                      size={"small"}
                      required
                      name={"code"}
                      //FIXME:Add validation pattern
                      inputRef={register({
                        required: true,
                      })}
                      error={errors.code ? true : false}
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
                      label={"Store Req. Code"}
                      name="reqCode"
                      defaultValue={null}
                      //TODO:"Render option menu implement list of warehouse(Code(Secondary Text), Name(PrimaryText))"
                      //TODO:"Render input field implement Chips of warehouse(Code + Name)"
                      control={control}
                      required={true}
                      fetchOptions={useGetAllStoreRequisitionCodes}
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
                      name="item"
                      defaultValue={null}
                      //TODO:"Render option menu implement list of warehouse(Code(Secondary Text), Name(PrimaryText))"
                      //TODO:"Render input field implement Chips of warehouse(Code + Name)"
                      control={control}
                      required={true}
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
                      label={"Rate"}
                      size={"small"}
                      required={true}
                      name={"rate"}
                      //FIXME:Add validation pattern
                      inputRef={register({
                        required: true,
                      })}
                      error={errors.rate ? true : false}
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
                      label={"Approved Qty."}
                      size={"small"}
                      required={true}
                      name={"appQty"}
                      //FIXME:Add validation pattern
                      inputRef={register({
                        required: true,
                      })}
                      error={errors.appQty ? true : false}
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
                      label={"Supplier"}
                      name="supplier"
                      defaultValue={null}
                      //TODO:"Render option menu implement list of warehouse(Code(Secondary Text), Name(PrimaryText))"
                      //TODO:"Render input field implement Chips of warehouse(Code + Name)"
                      control={control}
                      required={true}
                      fetchOptions={useGetAllSupplierCodes}
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
                    <StyledSelectForm
                      label={"Mode of Purchase"}
                      classes={{
                        root: classes.selectRoot,
                      }}
                      name={"purMode"}
                      //FIXME:Add validation pattern
                      control={control}
                      defaultValue={""}
                      required={true}
                      // error={errors.type ? true : false}
                    >
                      <MenuItem value="cash">{"Cash/Cheque"}</MenuItem>
                      <MenuItem value="credit">{"Credit"}</MenuItem>
                    </StyledSelectForm>
                  </div>
                </Paper>
              </Grid>
              {watchPurMode === "credit" && (
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
                      <StyledSelectForm
                        label={"Credit Days"}
                        classes={{
                          root: classes.selectRoot,
                        }}
                        name={"creDays"}
                        //FIXME:Add validation pattern
                        control={control}
                        defaultValue={""}
                        // error={errors.type ? true : false}
                      >
                        <MenuItem value="7">{"7 Days"}</MenuItem>
                        <MenuItem value="15">{"15 Days"}</MenuItem>
                        <MenuItem value="30">{"30 Days"}</MenuItem>
                      </StyledSelectForm>
                    </div>
                  </Paper>
                </Grid>
              )}

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
                    <TextField
                      fullWidth
                      InputProps={{
                        disableUnderline: true,
                      }}
                      classes={{
                        root: classes.inputRoot,
                      }}
                      label={"Purchased By"}
                      size={"small"}
                      required={true}
                      name={"purBy"}
                      //FIXME:Add validation pattern
                      inputRef={register({
                        required: true,
                      })}
                      error={errors.purQty ? true : false}
                    />
                  </div>
                </Paper>
              </Grid>
              <Grid
                item
                className={classes.gridItem}
                lg={!(watchPurMode === "credit") ? 12 : 6}
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
                        required: true,
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
                color: "#5F2EEA",
                border: "0.125rem solid #5F2EEA",
                boxShadow: "none",
                marginRight: "0.625rem",
              }}
              type={"submit"}
            ></StyledButton>
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
              onClick={() => {
                reset();
              }}
            ></StyledButton>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default withSnackbar(StyledFormPurchaseOrders);
