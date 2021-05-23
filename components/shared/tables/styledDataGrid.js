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
        color: "#14142B",
        letterSpacing: "0.047rem",
      },
      "& .MuiTypography-body1": {
        float: "left",
      },
      "& .MuiDataGrid-root .MuiDataGrid-columnsContainer": {
        backgroundColor: "#D9DBE9",
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
    },
  })
);

function CustomToolbar(props) {
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
                {props.label}
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

export default function StyledDataGrid(props) {
  const classes = useStyles();
  const { error, data, loading, revalidate } = props.fetch();

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div className={classes.root} style={{ flexGrow: 1 }}>
        <DataGrid
          components={{
            Toolbar: () => <CustomToolbar label={props.label} />,
          }}
          rows={data ?? []}
          columns={props.columns}
          loading={loading}
          error={error}
          checkboxSelection
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          autoHeight
          disableSelectionOnClick
        />
      </div>
    </div>
  );
}