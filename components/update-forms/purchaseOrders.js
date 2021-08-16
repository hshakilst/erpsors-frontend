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
import { useUpdatePurchaseOrderById } from "@/adapters/purchase-orders";
import StyledAutoCompleteForm from "@/components/ui/styledAutoCompleteForm";
import { useGetAllStoreRequisitionCodes } from "@/adapters/store-requisitions";
import { useGetAllItemCodes } from "@/adapters/items";
import { useGetAllSupplierCodes } from "@/adapters/suppliers";
import LogRocket from "logrocket";
import StyledButton from "@/components/ui/styledButton";
import StyledDatePicker from "@/components/ui/styledDatePicker";
import StyledSelectForm from "@/components/ui/styledSelectForm";
import MenuItem from "@material-ui/core/MenuItem";
import { Typography } from "@material-ui/core";

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

const PurchaseOrders = ({ data, handleClose, ...props }) => {
  const theme = useTheme();
  const classes = useStyles();
  const { register, handleSubmit, errors, control, } =
    useForm();

  React.useEffect(() => {

  }, [data]);

  const onSubmit = (form) => {
    let updateData = {};
    updateData.reqCode = form.reqCode?.code;
    updateData.item = form.item?.code;
    updateData.rate = form.rate;
    updateData.appQty = form.appQty;
    updateData.supplier = form.supplier?.code;
    updateData.purMode = form.purMode;
    updateData.creDays = form.creDays;
    updateData.purBy = form.purBy;
    updateData.notes = form.notes;
    updateData.totalAmount = form.totalAmount;
    updateData.date = form.date;
    updateData.id = data.id;
    console.log(updateData);

    for (const property in updateData) {
      if (!updateData[property]) delete updateData[property];
    }
    if (Object.keys(updateData).length > 1)
      Promise.resolve(useUpdatePurchaseOrderById(updateData))
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
                component: "Purchase Order Update Form",
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
              component: "Purchase Order Update Form",
            },
          });
        });
    else
      props.enqueueSnackbar(`No changes applied`, {
        variant: "error",
        autoHideDuration: 5000,
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
    <Grid container spacing={2}>
      <Grid item className={classes.gridItem} xs={6}>
        <div className={classes.rootGrid}>
          <Grid container spacing={2}>
            <Grid item className={classes.gridItem} xs={12}>
              <Paper className={classes.paper}>
                <div>
                  <Typography
                    style={{padding:16, textAlign:"center"}}
                  >{`Date: ${data.date}`}</Typography>
                </div>
              </Paper>
            </Grid>
            <Grid item className={classes.gridItem} xs={12}>
              <Paper className={classes.paper}>
                <div>
                  <Typography
                    style={{padding:16,textAlign:"center"}}
                  >{`Requisition Code: ${data.reqCode}`}</Typography>
                </div>
              </Paper>
            </Grid>
            <Grid item className={classes.gridItem} xs={12}>
              <Paper className={classes.paper}>
                <div style={{padding:0}}>
                  <Typography
                    style={{padding:16,textAlign:"center"}}
                  >{`Item Code: ${data.item}`}</Typography>
                </div>
              </Paper>
            </Grid>
            <Grid item className={classes.gridItem} xs={12}>
              <Paper className={classes.paper}>
                <div>
                  <Typography
                    style={{padding:16,textAlign:"center"}}
                  >{`Supplier: ${data.supplier ? data.supplier : "(empty)"}`}</Typography>
                </div>
              </Paper>
            </Grid>
            <Grid item className={classes.gridItem} xs={12}>
              <Paper className={classes.paper}>
                <div>
                  <Typography
                    style={{padding:16,textAlign:"center"}}
                  >{`Approved Qty: ${data.appQty}`}</Typography>
                </div>
              </Paper>
            </Grid>
            <Grid item className={classes.gridItem} xs={12}>
              <Paper className={classes.paper}>
                <div>
                  <Typography
                    style={{padding:16,textAlign:"center"}}
                  >{`Total Amount: ${data.totalAmount}`}</Typography>
                </div>
              </Paper>
            </Grid>
            <Grid item className={classes.gridItem} xs={12}>
              <Paper className={classes.paper}>
                <div>
                  <Typography
                    style={{padding:16,textAlign:"center"}}
                  >{`Rate: ${data.rate}`}</Typography>
                </div>
              </Paper>
            </Grid>
            <Grid item className={classes.gridItem} xs={12}>
              <Paper className={classes.paper}>
                <div>
                  <Typography
                    style={{padding:16,textAlign:"center"}}
                  >{`Purchase Mode: ${data.purMode}`}</Typography>
                </div>
              </Paper>
            </Grid>
            <Grid item className={classes.gridItem} xs={12}>
              <Paper className={classes.paper}>
                <div>
                  <Typography
                    style={{padding:16,textAlign:"center"}}
                  >{`Credit Days: ${data.creDays}`}</Typography>
                </div>
              </Paper>
            </Grid>
            <Grid item className={classes.gridItem} xs={12}>
              <Paper className={classes.paper}>
                <div>
                  <Typography
                    style={{padding:16,textAlign:"center"}}
                  >{`Purchased By: ${data.purBy}`}</Typography>
                </div>
              </Paper>
            </Grid>
            <Grid item className={classes.gridItem} xs={12}>
              <Paper className={classes.paper}>
                <div>
                  <Typography
                    style={{padding:16,textAlign:"center"}}
                  >{`Notes: ${data.notes}`}</Typography>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Grid>
      <Grid item className={classes.gridItem} xs={6}>
        <form component="form" onSubmit={handleSubmit(onSubmit, onError)}>
          <Box>
            <div className={classes.rootGrid}>
              <Grid container spacing={2}>
                <Grid item className={classes.gridItem} xs={12}>
                  <Paper className={classes.paper}>
                    <div className={classes.search}>
                      <div className={classes.searchIcon}>
                        <TocOutlinedIcon fontSize="large" />
                      </div>
                      <StyledDatePicker
                        label={"Date"}
                        name="date"
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
                <Grid className={classes.gridItem} item xs={12}>
                  <Paper className={classes.paper}>
                    <div className={classes.search}>
                      <div className={classes.searchIcon}>
                        <TocOutlinedIcon fontSize="large" />
                      </div>
                      <StyledAutoCompleteForm
                        label={"Store Req. Code"}
                        name="reqCode"
                        //TODO:"Render option menu implement list of warehouse(Code(Secondary Text), Name(PrimaryText))"
                        //TODO:"Render input field implement Chips of warehouse(Code + Name)"
                        control={control}
                        fetchOptions={useGetAllStoreRequisitionCodes}
                      />
                    </div>
                  </Paper>
                </Grid>
                <Grid item className={classes.gridItem} xs={12}>
                  <Paper className={classes.paper}>
                    <div className={classes.search}>
                      <div className={classes.searchIcon}>
                        <TocOutlinedIcon fontSize="large" />
                      </div>
                      <StyledAutoCompleteForm
                        label={"Item"}
                        name="item"
                        //TODO:"Render option menu implement list of warehouse(Code(Secondary Text), Name(PrimaryText))"
                        //TODO:"Render input field implement Chips of warehouse(Code + Name)"
                        control={control}
                        fetchOptions={useGetAllItemCodes}
                      />
                    </div>
                  </Paper>
                </Grid>
                <Grid className={classes.gridItem} item xs={12}>
                  <Paper className={classes.paper}>
                    <div className={classes.search}>
                      <div className={classes.searchIcon}>
                        <TocOutlinedIcon fontSize="large" />
                      </div>
                      <StyledAutoCompleteForm
                        label={"Supplier"}
                        name="supplier"
                        //TODO:"Render option menu implement list of warehouse(Code(Secondary Text), Name(PrimaryText))"
                        //TODO:"Render input field implement Chips of warehouse(Code + Name)"
                        control={control}
                        fetchOptions={useGetAllSupplierCodes}
                      />
                    </div>
                  </Paper>
                </Grid>
                <Grid item className={classes.gridItem} xs={12}>
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
                        name={"appQty"}
                        //FIXME:Add validation pattern
                        inputRef={register({
                          required: false,
                        })}
                        error={errors.appQty ? true : false}
                      />
                    </div>
                  </Paper>
                </Grid>
                <Grid item className={classes.gridItem} xs={12}>
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
                        label={"Total Amount"}
                        size={"small"}
                        name={"totalAmount"}
                        //FIXME:Add validation pattern
                        inputRef={register({
                          required: false,
                        })}
                        error={errors.totalAmount ? true : false}
                      />
                    </div>
                  </Paper>
                </Grid>
                <Grid item className={classes.gridItem} xs={12}>
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
                        name={"rate"}
                        //FIXME:Add validation pattern
                        inputRef={register({
                          required: false,
                        })}
                        error={errors.rate ? true : false}
                      />
                    </div>
                  </Paper>
                </Grid>
                <Grid item className={classes.gridItem} xs={12}>
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
                        error={errors.purMode ? true : false}
                      >
                        <MenuItem value="cash">{"Cash/Cheque"}</MenuItem>
                        <MenuItem value="credit">{"Credit"}</MenuItem>
                      </StyledSelectForm>
                    </div>
                  </Paper>
                </Grid>
                <Grid item className={classes.gridItem} xs={12}>
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
                        error={errors.creDays ? true : false}
                      >
                        <MenuItem value="7">{"7 Days"}</MenuItem>
                        <MenuItem value="15">{"15 Days"}</MenuItem>
                        <MenuItem value="30">{"30 Days"}</MenuItem>
                      </StyledSelectForm>
                    </div>
                  </Paper>
                </Grid>
                <Grid item className={classes.gridItem} xs={12}>
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
                        name={"purBy"}
                        //FIXME:Add validation pattern
                        inputRef={register({
                          required: false,
                        })}
                        error={errors.purBy ? true : false}
                      />
                    </div>
                  </Paper>
                </Grid>
                <Grid item className={classes.gridItem} xs={12}>
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
                type={"submit"}
              ></StyledButton>
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
              ></StyledButton>
            </div>
          </div>
        </form>
      </Grid>
    </Grid>
  );
};

export default withSnackbar(PurchaseOrders);
