import React, { useState } from "react";
import {
  useGetAllStoreRequisitions,
  useDeleteStoreRequisitionById,
  useUpdateStoreRequisitionById,
} from "@/adapters/store-requisitions";
import { withSnackbar } from "notistack";
import { Grid, IconButton } from "@material-ui/core";
import StyledDataGrid from "@/components/shared/tables/styledDataGrid";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import theme from "@/components/ui/theme";
import withStyledUpdateForm from "@/components/shared/withStyledUpdateForm";
import StoreRequisitions from "@/components/update-forms/storeRequisitions";
import LogRocket from "logrocket";
import { useCreateItemLedger } from "@/adapters/items-ledger";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { format } from "date-fns";


const StyledTableStoreRequisitions = (props) => {
  const [editable, setEditable] = React.useState(false);

  const toggleEdit = () => setEditable((isEditable) => !isEditable);

  const handleCellEditCommit = React.useCallback(
    ({ id, field, value, ...params }, event) => {
      if (field === "date" || field === "reqDate")
        value = format(new Date(value), "yyyy-MM-dd");

      let data = {};
      data.id = id;
      data[field] = value;

      try {
        if (value !== params.row[field])
          Promise.resolve(useUpdateStoreRequisitionById(data)).then(
            ({ error, data }) => {
              if (!error)
                props.enqueueSnackbar(
                  `Requisition ${data.data.code} : Update Successful.`,
                  {
                    variant: "success",
                    autoHideDuration: 5000,
                  }
                );
              else throw error;
            }
          );
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
          tags: { function: "onUpdateStoreRequisition" },
          extra: {
            component: "Store Requisition Table",
          },
        });
      }
    },
    []
  );

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
          <Grid item xs={4}>
            <IconButton
              disabled={params.row.isApproved}
              onClick={() => {
                try {
                  Promise.resolve(
                    useUpdateStoreRequisitionById({
                      id: params.row.id,
                      isApproved: true,
                    })
                  ).then(({ error, data }) => {
                    if (!error)
                      props.enqueueSnackbar(
                        `Requisition ${data.data.code} : Posted Successful.`,
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
                  color: params.row.isApproved
                    ? theme.palette.grey.label
                    : theme.palette.grey.title,
                }}
              />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
          <IconButton disabled={params.row.isApproved} onClick={toggleEdit}>
              <EditIcon
                style={{
                  color: params.row.isApproved
                    ? theme.palette.grey.label
                    : editable
                    ? theme.palette.primary.main
                    : theme.palette.grey.title,
                }}
              />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton
              disabled={params.row.isApproved}
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
                      tags: { function: "useDeleteStoreRequisitionById" },
                      extra: {
                        component: "Store Requisition Table",
                      },
                    });
                  })
              }
            >
              <DeleteIcon
                style={{
                  color: params.row.isApproved
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
      headerName: "Approved",
      headerAlign: "center",
      field: "isApproved",
      type: "boolean",
      width: 160,
      align: "center",
      editable: editable,
    },
    {
      headerName: "Date",
      headerAlign: "center",
      field: "date",
      type: "date",
      width: 160,
      align: "center",
      editable: editable,
      valueFormatter: (params) => format(new Date(params.value), "yyyy-MM-dd"),
    },
    {
      headerName: "Requisition Code",
      headerAlign: "center",
      field: "code",
      width: 200,
      align: "center",
      editable: editable,
    },
    {
      headerName: "Item Code",
      headerAlign: "center",
      field: "item",
      width: 160,
      align: "center",
      editable: editable,
    },
    {
      headerName: "Required Qty.",
      headerAlign: "right",
      field: "reqQty",
      type: "number",
      width: 180,
      align: "right",
      editable: editable,
    },
    {
      headerName: "Required By",
      headerAlign: "center",
      field: "reqDate",
      type: "date",
      width: 180,
      align: "center",
      editable: editable,
      valueFormatter: (params) => format(new Date(params.value), "yyyy-MM-dd"),
    },
    {
      headerName: "Warehouse Code",
      headerAlign: "center",
      field: "warehouse",
      width: 200,
      align: "center",
      editable: editable,
    },
    {
      headerName: "Notes",
      headerAlign: "center",
      field: "notes",
      width: 300,
      align: "center",
      valueFormatter: (params) =>
        params.value === "" ? `(empty)` : params.value,
      editable: editable,
    },
  ];

  return (
      <StyledDataGrid
        label={"Store Requisitions"}
        columns={columns}
        fetch={useGetAllStoreRequisitions}
        sortModel={[
          {
            field: "code",
            sort: "asc",
          },
        ]}
        onCellEditCommit={handleCellEditCommit}
      />
  );
};

export default withSnackbar(StyledTableStoreRequisitions);
