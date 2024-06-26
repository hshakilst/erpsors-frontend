import React from "react";
import {
  makeStyles,
  createStyles,
  alpha,
  useTheme,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { Link } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TocOutlinedIcon from "@material-ui/icons/TocOutlined";
import StyledButton from "../ui/styledButton";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import { withSnackbar } from "notistack";
import { useCreateStoreIssue } from "@/adapters/store-issues";
import StyledAutoCompleteForm from "@/components/ui/styledAutoCompleteForm";
import { useGetAllWarehouseCodes } from "@/adapters/warehouses";
import { useGetAllItemCodes, useGetItemById } from "@/adapters/items";
import StyledDatePicker from "@/components/ui/styledDatePicker";
import LogRocket from "logrocket";

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
      backgroundColor: theme.palette.grey.inputBackground,
      padding: theme.spacing(2),
      borderRadius: "1rem",
    },
    paper: {
      backgroundColor: theme.palette.grey.background,
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
      // paddingLeft: "1.25rem",
      "& .MuiInputLabel-animated": {
        fontSize: ".975rem",
        fontWeight: 400,
        color: theme.palette.grey.title,
        lineHeight: 0,
        paddingLeft: "1.25rem",
        paddingTop: "0.5rem",
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
    selectRootContainer: {
      paddingLeft: "1.25rem",
      paddingTop: ".55rem",
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

const StyledFormStoreIssues = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  const { register, handleSubmit, errors, control, watch, reset } = useForm();

  let watchItem = watch("item");
  let { data: itemData } = useGetItemById(watchItem?.id);

  const onSubmit = async (data) => {
    let date = data.date;
    let code = data.code;
    let reqCode = data.reqCode;
    let item = data.item?.code;
    let issRate = data.issRate;
    let issQty = data.issQty;
    let warehouse = data.warehouse?.code;
    let notes = data.notes;

    try {
      const { error, data } = await useCreateStoreIssue({
        date,
        code,
        reqCode,
        item,
        issRate,
        issQty,
        warehouse,
        notes,
      });
      if (!error)
        props.enqueueSnackbar(`Issue ${code} : Insertion successful.`, {
          variant: "success",
          autoHideDuration: 5000,
        });
      else {
        props.enqueueSnackbar(`Issue ${code} : Insertion failed.`, {
          variant: "error",
          autoHideDuration: 5000,
        });
        LogRocket.captureException(data, {
          tags: { source: "FaunaDB Error" },
          extra: {
            component: "Store Issue Form",
          },
        });
      }
    } catch (error) {
      props.enqueueSnackbar(
        `Something went wrong.\n${error?.name}:${error?.description}`,
        {
          variant: "error",
          autoHideDuration: 5000,
        }
      );
      LogRocket.captureException(error, {
        tags: { function: "onSubmit" },
        extra: {
          component: "Store Issue Form",
        },
      });
    }
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
    <Card className={classes.root}>
      <Box>
        <div style={{ float: "left", textAlign: "left" }}>
          <Typography
            style={{
              fontSize: "1.125rem",
              fontWeight: 400,
              color: theme.palette.grey.title,
              letterSpacing: "0.047rem",
            }}
          >
            Store Issues
          </Typography>
          <Typography
            style={{
              fontSize: "0.75rem",
              fontWeight: 200,
              color: theme.palette.grey.body,
              letterSpacing: "0.047rem",
            }}
          >
            Create a store issue
          </Typography>
        </div>
        <div style={{ float: "right" }}>
          <div
            style={{
              textAlign: "right",
              float: "left",
              marginRight: "0.313rem",
            }}
          >
            <AddOutlinedIcon
              style={{ color: theme.palette.grey.title, fontSize: "1.125rem" }}
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
                color: theme.palette.primary.main,
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
                      name="date"
                      //TODO:"Render option menu implement list of warehouse(Code(Secondary Text), Name(PrimaryText))"
                      //TODO:"Render input field implement Chips of warehouse(Code + Name)"
                      required
                      inputRef={register({
                        required: true,
                      })}
                      error={errors.date ? true : false}
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
                      required
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
                    {/* //TODO:After Implementing floor requisitions implement StyledAutoComplete */}
                    {/* <StyledAutoCompleteForm
                      label={"Floor Req. Code"}
                      name="reqCode"
                      defaultValue={null}
                      //TODO:"Render option menu implement list of warehouse(Code(Secondary Text), Name(PrimaryText))"
                      //TODO:"Render input field implement Chips of warehouse(Code + Name)"
                      control={control}
                    /> */}
                    <TextField
                      fullWidth
                      InputProps={{
                        disableUnderline: true,
                      }}
                      classes={{
                        root: classes.inputRoot,
                      }}
                      label={"Floor Req. Code"}
                      size={"small"}
                      name={"reqCode"}
                      //FIXME:Add validation pattern
                      inputRef={register({
                        required: true,
                      })}
                      required
                      error={errors.reqCode ? true : false}
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
                      label={"Item"}
                      name="item"
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
                      label={"Issue Rate"}
                      size={"small"}
                      name={"issRate"}
                      //FIXME:Add validation pattern
                      inputRef={register({
                        required: true,
                      })}
                      value={itemData ? itemData.valueRate : ""}
                      error={errors.issRate ? true : false}
                      readOnly
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
                      label={"Issued Qty."}
                      size={"small"}
                      name={"issQty"}
                      //FIXME:Add validation pattern
                      inputRef={register({
                        required: true,
                      })}
                      error={errors.issQty ? true : false}
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
                      <TocOutlinedIcon fontSize="large" />
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
      </form>
    </Card>
  );
};

export default withSnackbar(StyledFormStoreIssues);
