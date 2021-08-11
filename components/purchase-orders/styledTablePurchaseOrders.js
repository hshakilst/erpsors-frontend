import React, { useState } from "react";
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
import withStyledUpdateForm from "@/components/shared/withStyledUpdateForm";
import PurchaseOrders from "@/components/update-forms/purchaseOrders";
import LogRocket from "logrocket";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

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
                      `Issue ${data.data.code} : Posted Successful.`,
                      {
                        variant: "success",
                        autoHideDuration: 5000,
                      }
                    );
                  else throw error;
                });
              } catch (error) {
                props.enqueueSnackbar(
                  `Something went wrong.
                  \nReason: ${JSON.stringify(error)}`,
                  {
                    variant: "error",
                    autoHideDuration: 5000,
                  }
                );

                LogRocket.captureException(error, {
                  tags: { function: "onApprovedToStoreRequisitions" },
                  extra: {
                    component: "Store Requisition Table",
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
            onClick={() => {
              setData(params.row);
              setOpen(true);
            }}
          >
            <EditIcon
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
            onClick={() =>
              Promise.resolve(useDeleteStoreRequisitionById(params.row.id))
                .then(({ error, data }) => {
                  if (!error) {
                    props.enqueueSnackbar(
                      `Requisition ${data.data.code} : Deletion successful.`,
                      {
                        variant: "success",
                        autoHideDuration: 5000,
                      }
                    );
                  } else {
                    props.enqueueSnackbar(
                      `Requisition ${data.data.code} : Deletion failed.
                        Reason: ${error.code}`,
                      {
                        variant: "error",
                        autoHideDuration: 5000,
                      }
                    );

                    LogRocket.captureException(data, {
                      tags: { source: "FaunaDB Error" },
                      extra: {
                        component: "Store Requisition Table",
                      },
                    });
                  }
                })
                .catch((error) => {
                  props.enqueueSnackbar(
                    `Something went wrong.
                  \nReason: ${JSON.stringify(error)}`,
                    {
                      variant: "error",
                      autoHideDuration: 5000,
                    }
                  );

                  LogRocket.captureException(error, {
                    tags: { function: "useDeleteStoreIssueById" },
                    extra: {
                      component: "Store Requisition Table",
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
  },
  {
    headerName: "Date",
    headerAlign: "center",
    field: "date",
    type: "date",
    width: 115,
    align: "center",
  },
  {
    headerName: "PO Code",
    headerAlign: "center",
    field: "code",
    width: 140,
    align: "center",
  },
  {
    headerName: "Requisition Code",
    headerAlign: "center",
    field: "reqCode",
    width: 200,
    align: "center",
  },
  {
    headerName: "Item Code",
    headerAlign: "center",
    field: "item",
    width: 150,
    align: "center",
  },
  {
    headerName: "Approved Qty.",
    headerAlign: "right",
    field: "appQty",
    type: "number",
    width: 180,
    align: "right",
  },
  {
    headerName: "Amount",
    headerAlign: "right",
    field: "totalAmount",
    type: "number",
    width: 160,
    align: "right",
  },
  {
    headerName: "Rate",
    headerAlign: "right",
    field: "rate",
    type: "number",
    width: 140,
    align: "right",
  },
  {
    headerName: "Supplier Code",
    headerAlign: "center",
    field: "supplier",
    width: 180,
    align: "center",
  },
  {
    headerName: "Purchase Mode",
    headerAlign: "center",
    field: "purMode",
    width: 200,
    align: "center",
  },
  {
    headerName: "Credit Days",
    headerAlign: "right",
    field: "creDays",
    type: "number",
    width: 160,
    align: "right",
  },
  {
    headerName: "Purchased By",
    headerAlign: "center",
    field: "purBy",
    width: 200,
    align: "center",
  },
  {
    headerName: "Notes",
    headerAlign: "center",
    field: "notes",
    width: 300,
    align: "center",
    valueFormatter: (params) =>
      params.value === "" ? `(empty)` : params.value,
  },
];

const StyledTablePurchaseOrders = (props) => {
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const UpdateFormItems = withStyledUpdateForm(PurchaseOrders);

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
                    else throw error;
                  });
                } catch (error) {
                  props.enqueueSnackbar(
                    `Something went wrong.
                  \nReason: ${JSON.stringify(error)}`,
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
              onClick={() => {
                setData(params.row);
                setOpen(true);
              }}
            >
              <EditIcon
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
                    } else {
                      props.enqueueSnackbar(
                        `PO ${data.data.code} : Deletion failed.
                        Reason: ${error.code}`,
                        {
                          variant: "error",
                          autoHideDuration: 5000,
                        }
                      );

                      LogRocket.captureException(data, {
                        tags: { source: "FaunaDB Error" },
                        extra: {
                          component: "Purchase Order Table",
                        },
                      });
                    }
                  })
                  .catch((error) => {
                    props.enqueueSnackbar(
                      `Something went wrong.
                  \nReason: ${JSON.stringify(error)}`,
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
    },
    {
      headerName: "Date",
      headerAlign: "center",
      field: "date",
      type: "date",
      width: 115,
      align: "center",
    },
    {
      headerName: "PO Code",
      headerAlign: "center",
      field: "code",
      width: 140,
      align: "center",
    },
    {
      headerName: "Requisition Code",
      headerAlign: "center",
      field: "reqCode",
      width: 200,
      align: "center",
    },
    {
      headerName: "Item Code",
      headerAlign: "center",
      field: "item",
      width: 150,
      align: "center",
    },
    {
      headerName: "Approved Qty.",
      headerAlign: "right",
      field: "appQty",
      type: "number",
      width: 180,
      align: "right",
    },
    {
      headerName: "Amount",
      headerAlign: "right",
      field: "totalAmount",
      type: "number",
      width: 160,
      align: "right",
    },
    {
      headerName: "Rate",
      headerAlign: "right",
      field: "rate",
      type: "number",
      width: 140,
      align: "right",
    },
    {
      headerName: "Supplier Code",
      headerAlign: "center",
      field: "supplier",
      width: 180,
      align: "center",
    },
    {
      headerName: "Purchase Mode",
      headerAlign: "center",
      field: "purMode",
      width: 200,
      align: "center",
    },
    {
      headerName: "Credit Days",
      headerAlign: "right",
      field: "creDays",
      type: "number",
      width: 160,
      align: "right",
    },
    {
      headerName: "Purchased By",
      headerAlign: "center",
      field: "purBy",
      width: 200,
      align: "center",
    },
    {
      headerName: "Notes",
      headerAlign: "center",
      field: "notes",
      width: 300,
      align: "center",
      valueFormatter: (params) =>
        params.value === "" ? `(empty)` : params.value,
    },
  ];

  return (
    <>
      <UpdateFormItems
        label={"Purchase Orders"}
        data={data}
        open={open}
        handleClose={handleClose}
      />
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
      />
    </>
  );
};

export default withSnackbar(StyledTablePurchaseOrders);
