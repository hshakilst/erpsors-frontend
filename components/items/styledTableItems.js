import React, { useState } from "react";
import { useGetAllItems, useDeleteItemById } from "@/adapters/items";
import { withSnackbar } from "notistack";
import { Grid, IconButton, Typography } from "@material-ui/core";
import StyledDataGrid from "@/components/shared/tables/styledDataGrid";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import theme from "@/components/ui/theme";
import StyledFormDialog from "@/components/shared/styledFormDialog";
import LogRocket from "logrocket";

const StyledTableItems = (props) => {
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { headerName: "ID", field: "id", hide: true },
    {
      headerName: "Date",
      headerAlign: "center",
      field: "opnDate",
      type: "date",
      width: 115,
      align: "center",
    },
    {
      headerName: "Item Code",
      headerAlign: "center",
      field: "code",
      width: 180,
      align: "center",
    },
    {
      headerName: "Item Type",
      headerAlign: "center",
      field: "type",
      width: 180,
      align: "center",
    },
    {
      headerName: "Item Name",
      headerAlign: "center",
      field: "name",
      width: 230,
      align: "center",
    },
    {
      headerName: "Quantity",
      headerAlign: "right",
      field: "qty",
      type: "number",
      width: 160,
      align: "right",
    },
    {
      headerName: "Unit",
      headerAlign: "center",
      field: "unit",
      width: 120,
      align: "center",
    },
    {
      headerName: "Rate",
      headerAlign: "right",
      field: "valueRate",
      type: "number",
      width: 120,
      align: "right",
    },
    {
      headerName: "Amount",
      headerAlign: "right",
      field: "totalAmount",
      type: "number",
      width: 150,
      align: "right",
    },

    {
      headerName: "Status",
      headerAlign: "center",
      field: "status",
      width: 125,
      align: "center",
    },
    {
      headerName: "Supplier Code",
      headerAlign: "center",
      field: "supplier",
      width: 200,
      align: "center",
      valueFormatter: (params) =>
        params.value === "" ? `(empty)` : params.value,
    },
    {
      headerName: "Warehouse Code",
      headerAlign: "center",
      field: "warehouse",
      width: 200,
      align: "center",
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
    },
    {
      headerName: "Notes",
      headerAlign: "center",
      field: "notes",
      width: 180,
      align: "center",
      valueFormatter: (params) =>
        params.value === "" ? `(empty)` : params.value,
    },
    {
      headerName: "Group",
      headerAlign: "center",
      field: "group",
      width: 120,
      align: "center",
      valueFormatter: (params) =>
        params.value === "" ? `(empty)` : params.value,
    },
    {
      headerName: "Image",
      headerAlign: "center",
      field: "image",
      width: 130,
      align: "center",
      valueFormatter: (params) =>
        params.value === "" ? `(empty)` : params.value,
    },

    {
      headerName: "Actions",
      headerAlign: "center",
      field: "actions",
      width: 130,
      align: "center",
      renderCell: (params) => (
        <Grid container>
          <Grid item xs={6}>
            <IconButton
              onClick={() => {
                setData(params.row);
                setOpen(true);
              }}
            >
              <EditIcon style={{ color: theme.palette.grey.title }} />
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
                    } else {
                      props.enqueueSnackbar(
                        `Item ${data.data.code} : Deletion failes.
                        Reason: ${error.code}`,
                        {
                          variant: "error",
                          autoHideDuration: 5000,
                        }
                      );

                      LogRocket.captureException(data, {
                        tags: { source: "FaunaDB Error" },
                        extra: {
                          component: "Item Table",
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
  ];

  return (
    <>
      <StyledFormDialog
        label={"Items"}
        data={data}
        open={open}
        handleClose={handleClose}
      />
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
      />
    </>
  );
};

export default withSnackbar(StyledTableItems);
