import React, { useState } from "react";
import {
  useGetAllItems,
  useDeleteItemById,
  useUpdateItemById,
} from "@/adapters/items";
import { withSnackbar } from "notistack";
import { Grid, IconButton, Typography } from "@material-ui/core";
import StyledDataGrid from "@/components/shared/tables/styledDataGrid";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import theme from "@/components/ui/theme";
import LogRocket from "logrocket";
import { format } from "date-fns";

const StyledTableItems = (props) => {
  const [editable, setEditable] = React.useState();

  const toggleEdit = (id) =>
    setEditable((prevState) => {
      if (prevState) return undefined;
      return id;
    });

  const handleCellEditCommit = React.useCallback(({ id, field, value }) => {
    let data = {};
    data.id = id;
    data[field] = value;
    try {
      Promise.resolve(useUpdateItemById(data)).then(({ error, data }) => {
        if (!error)
          props.enqueueSnackbar(`Item ${data.data.code} : Update Successful.`, {
            variant: "success",
            autoHideDuration: 5000,
          });
        else throw data;
      });
    } catch (error) {
      props.enqueueSnackbar(
        `Something went wrong.
        \nReason: ${JSON.stringify(error).replaceAll(`//`, ` `).trim()}`,
        {
          variant: "error",
          autoHideDuration: 5000,
        }
      );

      LogRocket.captureException(error, {
        tags: { function: "onUpdateItems" },
        extra: {
          component: "Items Table",
        },
      });
    }
  }, []);

  const columns = [
    { headerName: "ID", field: "id", hide: true },
    {
      headerName: "Actions",
      headerAlign: "center",
      field: "actions",
      width: 130,
      align: "center",
      renderCell: (params) => (
        <Grid container>
          <Grid item xs={6}>
            <IconButton onClick={() => toggleEdit(params.row.id)}>
              <EditIcon
                style={{
                  color:
                    params.row.id === editable
                      ? theme.palette.primary.main
                      : theme.palette.grey.title,
                }}
              />
            </IconButton>
          </Grid>
          <Grid item xs={6}>
            <IconButton
              onClick={() =>
                Promise.resolve(useDeleteItemById(params.row.id))
                  .then(({ error, data }) => {
                    if (!error) {
                      props.enqueueSnackbar(
                        `Item ${data.data.code} : Deletion successful.`,
                        {
                          variant: "success",
                          autoHideDuration: 5000,
                        }
                      );
                    } else throw data;
                  })
                  .catch((error) => {
                    props.enqueueSnackbar(`Something went wrong.`, {
                      variant: "error",
                      autoHideDuration: 5000,
                    });

                    LogRocket.captureException(error, {
                      tags: { function: "useDeleteItemById" },
                      extra: {
                        component: "Item Table",
                      },
                    });
                  })
              }
            >
              <DeleteIcon style={{ color: theme.palette.grey.title }} />
            </IconButton>
          </Grid>
        </Grid>
      ),
    },
    {
      headerName: "Date",
      headerAlign: "center",
      field: "opnDate",
      type: "date",
      width: 115,
      align: "center",
      valueFormatter: (params) => format(new Date(params.value), "yyyy-MM-dd"),
      editable: true,
    },
    {
      headerName: "Item Code",
      headerAlign: "center",
      field: "code",
      width: 180,
      align: "center",
      editable: false,
    },
    {
      headerName: "Item Type",
      headerAlign: "center",
      field: "type",
      width: 180,
      align: "center",
      editable: true,
    },
    {
      headerName: "Item Name",
      headerAlign: "center",
      field: "name",
      width: 230,
      align: "center",
      editable: true,
    },
    {
      headerName: "Quantity",
      headerAlign: "right",
      field: "qty",
      type: "number",
      width: 160,
      align: "right",
      editable: false,
    },
    {
      headerName: "Unit",
      headerAlign: "center",
      field: "unit",
      width: 120,
      align: "center",
      editable: true,
    },
    {
      headerName: "Rate",
      headerAlign: "right",
      field: "valueRate",
      type: "number",
      width: 120,
      align: "right",
      editable: false,
    },
    {
      headerName: "Amount",
      headerAlign: "right",
      field: "totalAmount",
      type: "number",
      width: 150,
      align: "right",
      editable: false,
    },

    {
      headerName: "Status",
      headerAlign: "center",
      field: "status",
      width: 125,
      align: "center",
      editable: true,
    },
    {
      headerName: "Supplier Code",
      headerAlign: "center",
      field: "supplier",
      width: 200,
      align: "center",
      valueFormatter: (params) =>
        params.value === "" ? `(empty)` : params.value,
      editable: true,
    },
    {
      headerName: "Warehouse Code",
      headerAlign: "center",
      field: "warehouse",
      width: 200,
      align: "center",
      editable: true,
    },
    {
      headerName: "Shelf Life",
      headerAlign: "right",
      field: "shelfLife",
      type: "number",
      width: 145,
      align: "right",
      valueFormatter: (params) =>
        params.value === "" ? `(empty)` : params.value,
      editable: true,
    },
    {
      headerName: "Notes",
      headerAlign: "center",
      field: "notes",
      width: 180,
      align: "center",
      valueFormatter: (params) =>
        params.value === "" ? `(empty)` : params.value,
      editable: true,
    },
    {
      headerName: "Group",
      headerAlign: "center",
      field: "group",
      width: 120,
      align: "center",
      valueFormatter: (params) =>
        params.value === "" ? `(empty)` : params.value,
      editable: true,
    },
    {
      headerName: "Image",
      headerAlign: "center",
      field: "image",
      width: 130,
      align: "center",
      valueFormatter: (params) =>
        params.value === "" ? `(empty)` : params.value,
      editable: true,
    },
  ];

  return (
    <StyledDataGrid
      label={"Items"}
      columns={columns}
      fetch={useGetAllItems}
      sortModel={[
        {
          field: "code",
          sort: "asc",
        },
      ]}
      isCellEditable={(params) => params.row.id === editable}
      onCellEditCommit={handleCellEditCommit}
    />
  );
};

export default withSnackbar(StyledTableItems);
