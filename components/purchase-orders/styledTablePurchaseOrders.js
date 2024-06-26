import React from "react";
import {
  useGetAllPurchaseOrders,
  useDeletePurchaseOrderById,
  useUpdatePurchaseOrderById,
} from "@/adapters/purchase-orders";
import { withSnackbar } from "notistack";
import { Grid, IconButton } from "@material-ui/core";
import StyledDataGrid from "@/components/shared/tables/styledDataGrid";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import theme from "@/components/ui/theme";
import LogRocket from "logrocket";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { format } from "date-fns";

const StyledTablePurchaseOrders = (props) => {
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
      Promise.resolve(useUpdatePurchaseOrderById(data)).then(
        ({ error, data }) => {
          if (!error)
            props.enqueueSnackbar(`PO ${data.data.code} : Update Successful.`, {
              variant: "success",
              autoHideDuration: 5000,
            });
          else throw data;
        }
      );
    } catch (error) {
      props.enqueueSnackbar(
        `Something went wrong.
       \nReason: ${JSON.stringify(error).replace(`\\`, ` `).trim()}`,
        {
          variant: "error",
          autoHideDuration: 5000,
        }
      );

      LogRocket.captureException(error, {
        tags: { function: "onUpdatePurchaseOrder" },
        extra: {
          component: "Purchase Orders Table",
        },
      });
    }
  }, []);

  const columns = [
    { headerName: "ID", headerAlign: "center", field: "id", hide: true },
    {
      headerName: "Actions",
      headerAlign: "center",
      field: "actions",
      width: 130,
      align: "center",
      renderCell: (params) => (
        <Grid container>
          <Grid item xs={4}>
            <IconButton
              disabled={params.row.isReceived}
              onClick={() => {
                try {
                  Promise.resolve(
                    useUpdatePurchaseOrderById({
                      id: params.row.id,
                      isReceived: true,
                    })
                  ).then(({ error, data }) => {
                    if (!error)
                      props.enqueueSnackbar(
                        `PO ${data.data.code} : Posted Successful.`,
                        {
                          variant: "success",
                          autoHideDuration: 5000,
                        }
                      );
                    else throw data;
                  });
                } catch (error) {
                  props.enqueueSnackbar(
                    `Something went wrong.
                  \nReason: ${JSON.stringify(error).replace(`\\`, ` `).trim()}`,
                    {
                      variant: "error",
                      autoHideDuration: 5000,
                    }
                  );

                  LogRocket.captureException(error, {
                    tags: { function: "onReceivedPurchaseOrder" },
                    extra: {
                      component: "Purchase Orders Table",
                    },
                  });
                }
              }}
            >
              <CheckCircleOutlineIcon
                style={{
                  color: params.row.isReceived
                    ? theme.palette.grey.label
                    : theme.palette.grey.title,
                }}
              />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton
              disabled={params.row.isReceived}
              onClick={() => toggleEdit(params.row.id)}
            >
              <EditIcon
                style={{
                  color: params.row.isReceived
                    ? theme.palette.grey.label
                    : params.row.id === editable
                    ? theme.palette.primary.main
                    : theme.palette.grey.title,
                }}
              />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton
              disabled={params.row.isReceived}
              onClick={() =>
                Promise.resolve(useDeletePurchaseOrderById(params.row.id))
                  .then(({ error, data }) => {
                    if (!error) {
                      props.enqueueSnackbar(
                        `PO ${data.data.code} : Deletion successful.`,
                        {
                          variant: "success",
                          autoHideDuration: 5000,
                        }
                      );
                    } else throw data;
                  })
                  .catch((error) => {
                    props.enqueueSnackbar(
                      `Something went wrong.
                  \nReason: ${JSON.stringify(error)
                    .replaceAll(`//`, ` `)
                    .trim()}`,
                      {
                        variant: "error",
                        autoHideDuration: 5000,
                      }
                    );

                    LogRocket.captureException(error, {
                      tags: { function: "useDeletePurchaseOrderById" },
                      extra: {
                        component: "Purchase Order Table",
                      },
                    });
                  })
              }
            >
              <DeleteIcon
                style={{
                  color: params.row.isReceived
                    ? theme.palette.grey.label
                    : theme.palette.grey.title,
                }}
              />
            </IconButton>
          </Grid>
        </Grid>
      ),
    },
    {
      headerName: "Received",
      headerAlign: "center",
      field: "isReceived",
      type: "boolean",
      width: 160,
      align: "center",
      editable: true,
    },
    {
      headerName: "Date",
      headerAlign: "center",
      field: "date",
      type: "date",
      width: 115,
      align: "center",
      editable: true,
      valueFormatter: (params) => format(new Date(params.value), "yyyy-MM-dd"),
    },
    {
      headerName: "PO Code",
      headerAlign: "center",
      field: "code",
      width: 140,
      align: "center",
      editable: false,
    },
    {
      headerName: "Requisition Code",
      headerAlign: "center",
      field: "reqCode",
      width: 200,
      align: "center",
      editable: true,
    },
    {
      headerName: "Item Code",
      headerAlign: "center",
      field: "item",
      width: 150,
      align: "center",
      editable: true,
    },
    {
      headerName: "Approved Qty.",
      headerAlign: "right",
      field: "appQty",
      type: "number",
      width: 180,
      align: "right",
      editable: true,
    },
    {
      headerName: "Amount",
      headerAlign: "right",
      field: "totalAmount",
      type: "number",
      width: 160,
      align: "right",
      editable: true,
    },
    {
      headerName: "Rate",
      headerAlign: "right",
      field: "rate",
      type: "number",
      width: 140,
      align: "right",
      editable: true,
    },
    {
      headerName: "Supplier Code",
      headerAlign: "center",
      field: "supplier",
      width: 180,
      align: "center",
      editable: true,
    },
    {
      headerName: "Purchase Mode",
      headerAlign: "center",
      field: "purMode",
      width: 200,
      align: "center",
      editable: true,
    },
    {
      headerName: "Credit Days",
      headerAlign: "right",
      field: "creDays",
      type: "number",
      width: 160,
      align: "right",
      editable: true,
    },
    {
      headerName: "Purchased By",
      headerAlign: "center",
      field: "purBy",
      width: 200,
      align: "center",
      editable: true,
    },
    {
      headerName: "Notes",
      headerAlign: "center",
      field: "notes",
      width: 300,
      align: "center",
      valueFormatter: (params) =>
        params.value === "" ? `(empty)` : params.value,
      editable: true,
    },
  ];

  return (
    <>
      <StyledDataGrid
        label={"Purchase Orders"}
        columns={columns}
        fetch={useGetAllPurchaseOrders}
        sortModel={[
          {
            field: "code",
            sort: "asc",
          },
        ]}
        isCellEditable={(params) => params.row.id === editable}
        onCellEditCommit={handleCellEditCommit}
      />
    </>
  );
};

export default withSnackbar(StyledTablePurchaseOrders);
