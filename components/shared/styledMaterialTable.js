import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import MaterialTable from "material-table";
import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import UpdateIcon from "@material-ui/icons/Update";

const useStyles = makeStyles((theme) =>
  createStyles({
    // root: {
    //   flexGrow: 1,
    //   backgroundColor: "#EFF0F6",
    //   padding: theme.spacing(1.5),
    //   // paddingTop: "6rem",
    //   marginLeft: 240,
    //   [theme.breakpoints.down("xs")]: {
    //     marginLeft: 0,
    //   },
    //   [theme.breakpoints.up("lg")]: {
    //     flexGrow: 1,
    //     backgroundColor: "#EFF0F6",
    //     padding: theme.spacing(1.5),
    //     // paddingTop: "6rem",
    //     marginLeft: 240,
    //   },
    // },
    paper: {
      color: "#14142B",
      padding: theme.spacing(2),
      textAlign: "center",
      paddingTop: "1rem",
      paddingBottom: "1rem",
      borderRadius: "1rem",
      "& .MuiPaper-root": {
        color: "#14142B",
        boxShadow: "none",
      },
      "& .MuiTableCell-footer": {
        color: "#14142B",
        borderBottom: "none",
      },
      "& .MuiCheckbox-colorSecondary.Mui-checked": {
        color: "#5F2EEA",
      },
      // "&  .MTableToolbar-highlight-148": {
      //   color: "#5F2EEA",
      //   backgroundColor: "transparent",
      // },
      "& .MuiToolbar-root": {
        color: "#14142B",
        backgroundColor: "#D9DBE9",
        borderTopLeftRadius: "1rem",
        borderTopRightRadius: "1rem",
      },
      "& .MuiTableCell-head": {
        color: "#14142B",
        backgroundColor: "#EFF0F6",
      },
      "& .MuiTablePagination-toolbar": {
        color: "#14142B",
        backgroundColor: "#D9DBE9",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: "1rem",
        borderBottomRightRadius: "1rem",
      },
    },
    // gridItem: {
    //   flexDirection: "column",
    //   flexGrow: 1,
    //   justifyContent: "center",
    //   textAlign: "center",
    // },
  })
);

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const StyledMaterialTable = (props) => {
  const classes = useStyles();
  // const [columns, setColumns] = React.useState(props.columns);
  const [data, setData] = React.useState(props.data);
  // const { error, data, loading, mutate, isValidating } = props.fetch();
  // const [rows, setRows] = React.useState([]);
  // if (data && !loading) setRows(data);
  // React.useEffect(() => {
  //   if (!isValidating) setRows(data);
  // }, [data]);

  // const [data, setData] = React.useState([
  //   { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
  //   { name: "Zerya Betül", surname: "Baran", birthYear: 2017, birthCity: 34 },
  // ]);

  return (
    <Paper className={classes.paper}>
      <MaterialTable
        title={props.label}
        icons={tableIcons}
        columns={props.columns}
        data={data}
        isLoading={props.loading}
        editable={{
          // onRowAdd: (newData) =>
          //   new Promise((resolve, reject) => {
          //     setTimeout(() => {
          //       setData([...data, newData]);

          //       resolve();
          //     }, 1000);
          //   }),
          // onRowUpdate: (newRow, oldRow) =>
          //   new Promise((resolve, reject) => {
          //     setTimeout(() => {
          //       const rowUpdate = [...rows];
          //       const index = oldData.tableData.id;
          //       rowUpdate[index] = newRow;
          //       setRows([...rowUpdate]);

          //       resolve();
          //     }, 1000);
          //   }),
          onRowDelete: (oldRow) =>
            new Promise((resolve, reject) => {
              setTimeout(async () => {
                await props.deleteById(oldRow.id);
                const rows = [...data];
                const index = oldRow.tableData.id;
                rows.splice(index, 1);
                setData([...rows]);

                resolve();
              }, 1000);
            }),
        }}
        actions={[
          {
            icon: (props) => <UpdateIcon {...props} />,
            tooltip: "Refresh",
            isFreeAction: true,
            onClick: () =>
              new Promise((resolve, reject) => {
                setTimeout(async () => {
                  await props.refresh();
                  resolve();
                }, 1000);
              }),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
          exportButton: true,
          selection: true,
          filtering: true,
          columnsButton: true,
          columnResizable: true,
        }}
      />
    </Paper>
  );
};

export default StyledMaterialTable;
