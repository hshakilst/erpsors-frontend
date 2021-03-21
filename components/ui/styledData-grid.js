import * as React from "react";
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridColumnsToolbarButton,
  GridFilterToolbarButton,
  GridToolbarExport,
  GridDensitySelector,
} from "@material-ui/data-grid";
import { useDemoData } from "@material-ui/x-grid-data-generator";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      position: "relative",
      "& .MuiPaper-root": {
        backgroundColor: "#EFF0F6",
      },
      "& .MuiGrid-spacing-xs-2 > .MuiGrid-item": {
        paddingTop: ".01rem",
        paddingRight: ".5rem",
        [theme.breakpoints.down("xs")]: {
          paddingTop: "1rem",
        },
      },
      "& .MuiDataGrid-root ": {
        backgroundColor: "#EFF0F6",
        borderRadius: "1rem",
      },
      "& .MuiDataGrid-root .MuiDataGrid-toolbar": {
        float: "right",
        [theme.breakpoints.down("xs")]: {
          paddingRight: 0,
          paddingLeft: 0,
          float: "left",
        },
        paddingTop: ".5rem",
        paddingBottom: ".5rem",
      },
      "& .MuiButton-textPrimary": {
        fontSize: "1rem",
        fontWeight: 500,
        color: "#14142B",
        letterSpacing: "0.047rem",
      },
      "& .MuiTypography-body1": {
        float: "left",
      },
      "& .MuiDataGrid-root .MuiDataGrid-columnsContainer": {
        backgroundColor: "#D9DBE9",
      },
      "& .MuiDataGrid-root .MuiDataGrid-colCellTitle": {
        fontSize: "1rem",
        fontWeight: 500,
        color: "#14142B",
        letterSpacing: "0.047rem",
      },
      "& .MuiDataGrid-root .MuiDataGrid-footer": {
        backgroundColor: "#D9DBE9",
        borderBottomLeftRadius: "1rem",
        borderBottomRightRadius: "1rem",
      },
      "& .MuiButtonBase-root .MuiButton-label": {
        [theme.breakpoints.down("sm")]: {
          fontSize: 0,
        },
      },
      "& .MuiButton-startIcon": {
        margin: 0,
        marginLeft: "2.2rem",
        padding: 0,
      },
      "& .MuiButton-textSizeSmall": {
        paddingRight: 0,
        paddingLeft: 0,
      },
    },
  })
);

function CustomToolbar() {
  const classes = useStyles();
  return (
    <GridToolbarContainer>
      <Grid container spacing={2}>
        <Grid className={classes.gridItem} item xs={12}>
          <Paper className={classes.paper}>
            <div
              style={{ position: "absolute", top: "0.5rem", left: "0.8rem" }}
            >
              <Typography
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 500,
                  color: "#14142B",
                  letterSpacing: "0.047rem",
                  marginTop: ".1rem",
                }}
              >
                Items
              </Typography>
            </div>
          </Paper>
        </Grid>
        <Grid item className={classes.gridItem} xs={12}>
          <Paper className={classes.paper}>
            <div>
              <GridDensitySelector />
              <GridColumnsToolbarButton />
              <GridFilterToolbarButton />
              <GridToolbarExport />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </GridToolbarContainer>
  );
}

const riceFilterModel = {
  items: [
    { columnField: "commodity", operatorValue: "contains", value: "rice" },
  ],
};

export default function BasicToolbarFilteringGrid() {
  const classes = useStyles();
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100,
    maxColumns: 6,
  });

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.getValue("firstName") || ""} ${
          params.getValue("lastName") || ""
        }`,
    },
    { field: "city", headerName: "City", width: 100 },
    { field: "state", headerName: "State", width: 100 },
  ];

  const rows = [
    {
      id: 1,
      lastName: "Snow",
      firstName: "Jon",
      age: 35,
      city: "Milwaukee",
      state: "Wisconsin",
    },
    {
      id: 2,
      lastName: "Lannister",
      firstName: "Cersei",
      age: 42,
      city: "Dubuque",
      state: "Iowa",
    },
    {
      id: 3,
      lastName: "Lannister",
      firstName: "Jaime",
      age: 45,
      city: "Appleton",
      state: "Wisconsin",
    },
    {
      id: 4,
      lastName: "Stark",
      firstName: "Arya",
      age: 16,
      city: "Madison",
      state: "Wisconsin",
    },
    {
      id: 5,
      lastName: "Targaryenmnsdlfbsjbgjksbgksbfksfgbk",
      firstName: "Daenerys",
      age: null,
      city: "Green Bay",
      state: "Wisconsin",
    },
    {
      id: 6,
      lastName: "Melisandre",
      firstName: null,
      age: 150,
      city: "San Antonio",
      state: "Texas",
    },
    {
      id: 7,
      lastName: "Clifford",
      firstName: "Ferrara",
      age: 44,
      city: "Dallas",
      state: "Texas",
    },
    {
      id: 8,
      lastName: "Frances",
      firstName: "Rossini",
      age: 36,
      city: "Brooklyn",
      state: "New York",
    },
    {
      id: 9,
      lastName: "Roxie",
      firstName: "Harvey",
      age: 65,
      city: "Toledo",
      state: "Ohio",
    },
    {
      id: 10,
      lastName: "Larry",
      firstName: "King",
      age: 105,
      city: "Chicago",
      state: "Illiniois",
    },
    {
      id: 11,
      lastName: "Snow",
      firstName: "Jon",
      age: 35,
      city: "Milwaukee",
      state: "Wisconsin",
    },
    {
      id: 12,
      lastName: "Lannister",
      firstName: "Cersei",
      age: 42,
      city: "Dubuque",
      state: "Iowa",
    },
    {
      id: 13,
      lastName: "Lannister",
      firstName: "Jaime",
      age: 45,
      city: "Appleton",
      state: "Wisconsin",
    },
    {
      id: 14,
      lastName: "Stark",
      firstName: "Arya",
      age: 16,
      city: "Madison",
      state: "Wisconsin",
    },
    {
      id: 15,
      lastName: "Targaryenmnsdlfbsjbgjksbgksbfksfgbk",
      firstName: "Daenerys",
      age: null,
      city: "Green Bay",
      state: "Wisconsin",
    },
    {
      id: 16,
      lastName: "Melisandre",
      firstName: null,
      age: 150,
      city: "San Antonio",
      state: "Texas",
    },
    {
      id: 17,
      lastName: "Clifford",
      firstName: "Ferrara",
      age: 44,
      city: "Dallas",
      state: "Texas",
    },
    {
      id: 18,
      lastName: "Frances",
      firstName: "Rossini",
      age: 36,
      city: "Brooklyn",
      state: "New York",
    },
    {
      id: 19,
      lastName: "Roxie",
      firstName: "Harvey",
      age: 65,
      city: "Toledo",
      state: "Ohio",
    },
    {
      id: 20,
      lastName: "Larry",
      firstName: "King",
      age: 105,
      city: "Chicago",
      state: "Illiniois",
    },
  ];

  return (
    <div className={classes.root} style={{ height: 400, width: "100%" }}>
      <DataGrid
        {...data}
        filterModel={riceFilterModel}
        components={{
          Toolbar: CustomToolbar,
        }}
        rows={rows}
        columns={columns}
        pageSize={10}
        checkboxSelection
      />
    </div>
  );
}
