import * as React from "react";
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridDensitySelector,
} from "@material-ui/data-grid";
import { useDemoData } from "@material-ui/x-grid-data-generator";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      position: "relative",
      "& .MuiDataGrid-root ": {
        backgroundColor: "#EFF0F6",
        borderRadius: "1rem",
      },
      "& .MuiDataGrid-root .MuiDataGrid-toolbar": {
        float: "right",
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
    },
  })
);

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <div style={{ position: "absolute", top: "0.5rem", left: "0.938rem" }}>
        <Typography
          style={{
            fontSize: "1.2rem",
            fontWeight: 500,
            color: "#14142B",
            letterSpacing: "0.047rem",
          }}
        >
          Items
        </Typography>
      </div>
      <div>
        <GridToolbar />
      </div>
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

  return (
    <div className={classes.root} style={{ height: 400, width: "100%" }}>
      <DataGrid
        {...data}
        filterModel={riceFilterModel}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}
