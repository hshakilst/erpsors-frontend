import React from "react";
import {
  makeStyles,
  createStyles,
  fade,
  useTheme,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import ShortTextOutlinedIcon from "@material-ui/icons/ShortTextOutlined";
import TextField from "@material-ui/core/TextField";
import StyledDatePicker from "@/components/ui/styledDatePicker";
import StyledSelectForm from "@/components/ui/styledSelectForm";
import { useForm } from "react-hook-form";
import MenuItem from "@material-ui/core/MenuItem";
import TodayIcon from "@material-ui/icons/Today";
import EventIcon from "@material-ui/icons/Event";
import FilterListIcon from "@material-ui/icons/FilterList";
import dynamic from "next/dynamic";

const StyledTableItems = dynamic(
  () => import("@/components/items/styledTableItems"),
  { ssr: false, loading: () => <p>...</p> }
);

const StyledTablePurchaseOrders = dynamic(
  () => import("@/components/purchase-orders/styledTablePurchaseOrders"),
  { ssr: false, loading: () => <p>...</p> }
);

const StyledTableStoreIssues = dynamic(
  () => import("@/components/store-issues/styledTableStoreIssues"),
  { ssr: false, loading: () => <p>...</p> }
);

const StyledTableStoreReceipts = dynamic(
  () => import("@/components/store-receipts/styledTableStoreReceipts"),
  { ssr: false, loading: () => <p>...</p> }
);

const StyledTableStoreRequisitions = dynamic(
  () => import("@/components/store-requisitions/styledTableStoreRequisitions"),
  { ssr: false, loading: () => <p>...</p> }
);

const StyledTableSuppliers = dynamic(
  () => import("@/components/suppliers/styledTableSuppliers"),
  { ssr: false, loading: () => <p>...</p> }
);

const StyledTableWarehouses = dynamic(
  () => import("@/components/warehouses/styledTableWarehouses"),
  { ssr: false, loading: () => <p>...</p> }
);

const StyledTableReports = dynamic(
  () => import("@/components/reports/styledTableReports"),
  { ssr: false, loading: () => <p>...</p> }
);

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(0),
    },
    rootGrid: {
      flexGrow: 1,
      padding: theme.spacing(1),
      borderRadius: "1rem",
    },
    paper: {
      padding: theme.spacing(0),
      // textAlign: "left",
      paddingLeft: "1.25rem",
      borderRadius: "1rem",

      "& .MuiButton-outlined": {
        border: "none",
        marginLeft: 0,
        "&:hover": {
          backgroundColor: theme.palette.grey.inputBackground,
        },
      },
    },
    gridDropdown: {
      flexDirection: "column",
      flexGrow: 1,
      justifyContent: "end",
      textAlign: "center",
      "& .MuiSelect-select:focus": {
        background: theme.palette.grey.inputBackground,
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
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
      [theme.breakpoints.up("xs")]: {
        marginLeft: theme.spacing(3),
        width: "left",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      top: 2,
      left: "-2.5rem",
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
    inputInput: {
      padding: theme.spacing(1.8, 2, 0, 0),
      paddingLeft: `calc(1em + ${theme.spacing(0)}px)`,
      fontSize: "1rem",
      fontWeight: 400,
      color: theme.palette.grey.title,
      letterSpacing: "0.047rem",
    },
    searchTableCard: {
      height: "3.5rem",
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      paddingLeft: "1.25rem",
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
        marginRight: theme.spacing(2),
      },
      [theme.breakpoints.up("xs")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
        marginRight: theme.spacing(2),
      },
      "& .MuiInput-underline:before": {
        border: "none",
      },
      "& .MuiInputBase-root.Mui-disabled": {
        fontSize: ".975rem",
        fontWeight: 400,
        color: theme.palette.grey.title,
        paddingLeft: "5.5rem",
      },
      "& .MuiIconButton-root": {
        color: theme.palette.grey.title,
      },
    },
    searchIconTableCard: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      left: "-2.5rem",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: theme.palette.grey.title,
      paddingLeft: "1.6rem",
    },
  })
);

// const TextFieldComponent = (props) => {
//   return <TextField {...props} disabled={true} />;
// };

export default function StyledTableCard(props) {
  const theme = useTheme();
  const classes = useStyles();
  const { register, handleSubmit, errors, control, reset, watch } = useForm();
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  /***
   * when rendering watchedTableType value is becoming undefined so passing the peops value
   ***/
  let watchedTableType = watch("tableType") || props.defaultValue;

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Card className={classes.root}>
      <Box>
        <div className={classes.rootGrid}>
          <Box>
            <Grid container spacing={2}>
              <Grid
                className={classes.gridItem}
                item
                lg={3}
                md={3}
                sm={12}
                xs={12}
              >
                <Paper
                  className={classes.paper}
                  style={{ background: theme.palette.grey.inputBackground }}
                >
                  <div className={classes.searchTableCard}>
                    <div className={classes.searchIconTableCard}>
                      <ShortTextOutlinedIcon fontSize="large" />
                    </div>
                    <StyledSelectForm
                      classes={{
                        root: classes.gridDropdown,
                      }}
                      name={"tableType"}
                      //FIXME:Add validation pattern
                      control={control}
                      defaultValue={props.defaultValue}
                      // error={errors.type ? true : false}
                    >
                      <MenuItem value="items">{"Items"}</MenuItem>
                      <MenuItem value="suppliers">{"Suppliers"}</MenuItem>
                      <MenuItem value="warehouses">{"Warehouses"}</MenuItem>
                      <MenuItem value="requisitions">{"Requisitions"}</MenuItem>
                      <MenuItem value="purchases">{"Purchase"}</MenuItem>
                      <MenuItem value="receipts">{"Store Receipts"}</MenuItem>
                      <MenuItem value="issues">{"Store Issues"}</MenuItem>
                      <MenuItem value="reports">{"Reports"}</MenuItem>
                    </StyledSelectForm>
                  </div>
                </Paper>
              </Grid>
              <Grid
                item
                className={classes.gridItem}
                lg={9}
                md={9}
                sm={12}
                xs={12}
              >
                <Paper
                  className={classes.paper}
                  style={{ background: theme.palette.grey.inputBackground }}
                >
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon fontSize="large" />
                    </div>
                    <TextField
                      placeholder="Search…"
                      fullWidth
                      InputProps={{
                        disableUnderline: true,
                      }}
                      classes={{
                        root: classes.inputInput,
                      }}
                    />
                  </div>
                </Paper>
              </Grid>
              <Grid
                item
                className={classes.gridItem}
                lg={4}
                md={6}
                sm={12}
                xs={12}
              >
                <Paper
                  className={classes.paper}
                  style={{ background: theme.palette.grey.inputBackground }}
                >
                  <div className={classes.searchTableCard}>
                    <div className={classes.searchIconTableCard}>
                      <TodayIcon fontSize="large" />
                    </div>
                    <StyledDatePicker
                      label={"From"}
                      name="fromDate"
                      //TODO:"Render option menu implement list of warehouse(Code(Secondary Text), Name(PrimaryText))"
                      //TODO:"Render input field implement Chips of warehouse(Code + Name)
                      inputRef={register({
                        required: true,
                      })}
                      error={errors.reqDate ? true : false}
                      value={selectedDate}
                      onChange={handleDateChange}
                      control={control}
                    />
                  </div>
                </Paper>
              </Grid>
              <Grid
                item
                className={classes.gridItem}
                lg={4}
                md={6}
                sm={12}
                xs={12}
              >
                <Paper
                  className={classes.paper}
                  style={{ background: theme.palette.grey.inputBackground }}
                >
                  <div className={classes.searchTableCard}>
                    <div className={classes.searchIconTableCard}>
                      <EventIcon fontSize="large" />
                    </div>
                    <StyledDatePicker
                      label={"To"}
                      name="toDate"
                      //TODO:"Render option menu implement list of warehouse(Code(Secondary Text), Name(PrimaryText))"
                      //TODO:"Render input field implement Chips of warehouse(Code + Name)"
                      inputRef={register({
                        required: true,
                      })}
                      error={errors.reqDate ? true : false}
                      value={selectedDate}
                      onChange={handleDateChange}
                      control={control}
                    />
                  </div>
                </Paper>
              </Grid>
              <Grid
                item
                className={classes.gridItem}
                lg={4}
                md={12}
                sm={12}
                xs={12}
              >
                <Paper
                  className={classes.paper}
                  style={{ background: theme.palette.grey.inputBackground }}
                >
                  <div className={classes.searchTableCard}>
                    <div className={classes.searchIconTableCard}>
                      <FilterListIcon fontSize="large" />
                    </div>
                    <TextField
                      fullWidth
                      InputProps={{
                        disableUnderline: true,
                      }}
                      classes={{
                        root: classes.inputRoot,
                      }}
                      label={"Filter By"}
                      size={"small"}
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
                <Paper>
                  <Box>
                    {() => {
                      switch (watchedTableType) {
                        case "items":
                          return <StyledTableItems />;
                          break;
                        case "suppliers":
                          return <StyledTableSuppliers />;
                          break;
                        case "warehouses":
                          return <StyledTableWarehouses />;
                          break;
                        case "requisitions":
                          return <StyledTableStoreRequisitions />;
                          break;
                        case "purchases":
                          return <StyledTablePurchaseOrders />;
                          break;
                        case "receipts":
                          return <StyledTableStoreReceipts />;
                          break;
                        case "issues":
                          return <StyledTableStoreIssues />;
                          break;
                        case "reports":
                          return <StyledTableReports />;
                          break;

                        default:
                          return null;
                          break;
                      }
                    }}
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </div>
      </Box>
    </Card>
  );
}
