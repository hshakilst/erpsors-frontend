import React from "react";
import {
  makeStyles,
  createStyles,
  alpha,
  useTheme,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TocOutlinedIcon from "@material-ui/icons/TocOutlined";
import StyledButton from "@/components/ui/styledButton";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import { withSnackbar } from "notistack";
import { useCreateItem } from "@/adapters/items";
import { useGetAllWarehouseCodes } from "@/adapters/warehouses";
import StyledSelectForm from "@/components/ui/styledSelectForm";
import MenuItem from "@material-ui/core/MenuItem";
import StyledDropzoneDialog from "@/components/dropzone/StyledDropzoneDialog";
import StyledDatePicker from "@/components/ui/styledDatePicker";
import StyledAutoCompleteForm from "@/components/ui/styledAutoCompleteForm";
import { useGetAllSupplierCodes } from "@/adapters/suppliers";
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
  })
);

const StyledFormItems = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  const { register, handleSubmit, errors, control, reset, watch, setValue } =
    useForm();
  const [amount, setAmount] = React.useState("");
  let watchedQty = Number(watch("qty")) || 0;
  let watchedValueRate = Number(watch("valueRate")) || 0;

  React.useEffect(() => {
    setAmount(
      isNaN(watchedValueRate * watchedQty)
        ? ""
        : String(watchedValueRate * watchedQty)
    );
  }, [watchedQty, watchedValueRate]);

  const onSubmit = async (data) => {
    let opnDate = data.opnDate;
    let code = data.code;
    let name = data.name;
    let type = data.type;
    let qty = data.qty;
    let totalAmount = data.totalAmount;
    let valueRate = data.valueRate;
    let unit = data.unit;
    let status = data.status;
    let shelfLife = data.shelfLife;
    let group = data.group;
    let image = data.image;
    let notes = data.notes;
    let warehouse = data.warehouse?.code;
    let supplier = data.supplier?.code;

    try {
      const { error, data } = await useCreateItem({
        opnDate,
        code,
        name,
        type,
        qty,
        totalAmount,
        valueRate,
        unit,
        status,
        shelfLife,
        group,
        image,
        notes,
        warehouse,
        supplier,
      });
      if (!error)
        props.enqueueSnackbar(`Item ${code} : Insertion successful.`, {
          variant: "success",
          autoHideDuration: 5000,
        });
      else {
        props.enqueueSnackbar(`Item ${code} : Insertion failed.`, {
          variant: "error",
          autoHideDuration: 5000,
        });
        LogRocket.captureException(data, {
          tags: { source: "FaunaDB Error" },
          extra: {
            component: "Item Form",
          },
        });
      }
    } catch (error) {
      props.enqueueSnackbar(
        `Something went wrong.\nError:${JSON.stringify(error)}`,
        {
          variant: "error",
          autoHideDuration: 5000,
        }
      );
      LogRocket.captureException(error, {
        tags: { function: "onSubmit" },
        extra: {
          component: "Item Form",
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
            }}
          >
            Items
          </Typography>
          <Typography
            style={{
              fontSize: "0.75rem",
              fontWeight: 200,
              color: theme.palette.grey.body,
            }}
          >
            Create an item
          </Typography>
        </div>
        <div style={{ float: "right", marginTop: ".5rem" }}>
          <div style={{ textAlign: "right", float: "left" }}>
            <StyledDropzoneDialog />
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
                      label={"Opening Date"}
                      name="opnDate"
                      //TODO:"Render option menu implement list of warehouse(Code(Secondary Text), Name(PrimaryText))"
                      //TODO:"Render input field implement Chips of warehouse(Code + Name)"
                      required
                      inputRef={register({
                        required: true,
                      })}
                      error={errors.opnDate ? true : false}
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
                      label={"Type"}
                      classes={{
                        root: classes.selectRoot,
                      }}
                      name={"type"}
                      //FIXME:Add validation pattern
                      control={control}
                      defaultValue={""}
                      required
                      error={errors.type ? true : false}
                    >
                      <MenuItem value="raw-materials">
                        {"Raw Materials"}
                      </MenuItem>
                      <MenuItem value="chemicals">{"Chemicals"}</MenuItem>
                      <MenuItem value="packing-material">
                        {"Packing Materials"}
                      </MenuItem>
                      <MenuItem value="wip">{"Work In Process"}</MenuItem>
                      <MenuItem value="finished-goods">
                        {"Finished Goods"}
                      </MenuItem>
                      <MenuItem value="git">{"Goods In Transit"}</MenuItem>
                      <MenuItem value="mro">{"MRO Goods"}</MenuItem>
                      <MenuItem value="fixed-assets">{"Fixed Assets"}</MenuItem>
                      <MenuItem value="consumables">{"Consumables"}</MenuItem>
                    </StyledSelectForm>
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
                      error={errors.code ? true : false}
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
                      label={"Name"}
                      size={"small"}
                      name={"name"}
                      //FIXME:Add validation pattern
                      inputRef={register({
                        required: true,
                      })}
                      error={errors.name ? true : false}
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
                      label={"Opening Qty."}
                      size={"small"}
                      name={"qty"}
                      //FIXME:Add validation pattern
                      inputRef={register({
                        required: true,
                      })}
                      error={errors.qty ? true : false}
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
                      name={"valueRate"}
                      //FIXME:Add validation pattern
                      inputRef={register({
                        required: true,
                      })}
                      required
                      error={errors.valueRate ? true : false}
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
                      value={amount}
                      onChange={(event) => {
                        setAmount(event.target.value);
                      }}
                      label={"Total Amount"}
                      size={"small"}
                      name={"totalAmount"}
                      //FIXME:Add validation pattern
                      inputRef={register({
                        required: true,
                      })}
                      error={errors.totalAmount ? true : false}
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
                      <TocOutlinedIcon fontSize="large" />
                    </div>
                    <StyledSelectForm
                      label={"Unit"}
                      classes={{
                        root: classes.selectRoot,
                      }}
                      name={"unit"}
                      control={control}
                      defaultValue={""}
                      required
                    >
                      <MenuItem value="pairs">{"Pairs"}</MenuItem>
                      <MenuItem value="pieces">{"Pieces"}</MenuItem>
                      <MenuItem value="kgs">{"KGs"}</MenuItem>
                      <MenuItem value="grams">{"Grams"}</MenuItem>
                      <MenuItem value="meters">{"Meters"}</MenuItem>
                      <MenuItem value="centimeters">{"Centimeters"}</MenuItem>
                      <MenuItem value="yards">{"Yards"}</MenuItem>
                      <MenuItem value="feet">{"Feet"}</MenuItem>
                      <MenuItem value="inches">{"Inches"}</MenuItem>
                      <MenuItem value="litres">{"Litres"}</MenuItem>
                      <MenuItem value="packets">{"Packets"}</MenuItem>
                      <MenuItem value="pounds">{"Pounds"}</MenuItem>
                      <MenuItem value="units">{"Units"}</MenuItem>
                    </StyledSelectForm>
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
                      <TocOutlinedIcon fontSize="large" />
                    </div>
                    <StyledSelectForm
                      label={"Status"}
                      classes={{
                        root: classes.selectRoot,
                      }}
                      name={"status"}
                      //FIXME:Add validation pattern
                      // inputRef={register({
                      //   required: true,
                      // })}
                      // error={errors.status ? true : false}
                      control={control}
                      defaultValue={""}
                      required
                    >
                      <MenuItem value="active">{"Active"}</MenuItem>
                      <MenuItem value="inactive">{"Inactive"}</MenuItem>
                    </StyledSelectForm>
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
                      label={"Shelf Life Days"}
                      size={"small"}
                      name={"shelfLife"}
                      //FIXME:Add validation pattern
                      inputRef={register({
                        required: false,
                      })}
                      error={errors.shelfLife ? true : false}
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
                      label={"Group"}
                      classes={{
                        root: classes.selectRoot,
                      }}
                      name={"group"}
                      //FIXME:Add validation pattern
                      // inputRef={register({
                      //   required: true,
                      // })}
                      // error={errors.group ? true : false}
                      control={control}
                      defaultValue={""}
                    >
                      <MenuItem value="none">{"(None)"}</MenuItem>
                    </StyledSelectForm>
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
                      label={"Image"}
                      size={"small"}
                      name={"image"}
                      //FIXME:Add validation pattern
                      inputRef={register({
                        required: false,
                      })}
                      error={errors.image ? true : false}
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

export default withSnackbar(StyledFormItems);
