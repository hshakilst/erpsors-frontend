import React, { useState } from "react";
import {
  useGetAllStoreIssues,
  useDeleteStoreIssueById,
  useUpdateStoreIssueById,
} from "@/adapters/store-issues";
import { withSnackbar } from "notistack";
import { Grid, IconButton, Typography } from "@material-ui/core";
import StyledDataGrid from "@/components/shared/tables/styledDataGrid";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import theme from "@/components/ui/theme";
import LogRocket from "logrocket";
import { useCreateItemLedger } from "@/adapters/items-ledger";
import PostAddIcon from "@material-ui/icons/PostAdd";
import ItemsLedger from "@/contexts/items-ledger";
import { format } from "date-fns";

const StyledTableStoreIssues = (props) => {
  const [editable, setEditable] = React.useState(false);

  const toggleEdit = () => setEditable((isEditable) => !isEditable);

  const handleCellEditCommit = React.useCallback(
    ({ id, field, value, ...params }) => {
      if (field === "date")
        value = format(new Date(value), "yyyy-MM-dd");

      let data = {};
      data.id = id;
      data[field] = value;

      try {
        if (value !== params.row[field])
          Promise.resolve(useUpdateStoreIssueById(data)).then(
            ({ error, data }) => {
              if (!error)
                props.enqueueSnackbar(
                  `Issue ${data.data.code} : Update Successful.`,
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
          tags: { function: "onUpdateStoreIssue" },
          extra: {
            component: "Store Issue Table",
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
              disabled={params.row.isPosted}
              onClick={() => {
                try {
                  Promise.resolve(
                    useCreateItemLedger(
                      new ItemsLedger({
                        date: params.row.date,
                        code: params.row.code,
                        type: "store-issues",
                        itemCode: params.row.item,
                        opnRate: params.row.opnRate,
                        opnQty: params.row.opnQty,
                        recRate: 0,
                        recQty: 0,
                        issRate: params.row.issRate,
                        issQty: params.row.issQty,
                        warehouseCode: params.row.warehouse,
                        notes: params.row.notes,
                      })
                    )
                  )
                    .then(({ error, data }) => {
                      if (!error && data)
                        Promise.resolve(
                          useUpdateStoreIssueById({
                            id: params.row.id,
                            isPosted: true,
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
                      else throw error;
                    })
                    .catch((error) => {
                      throw error;
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
                    tags: { function: "onPostToItemsLedger" },
                    extra: {
                      component: "Store Issue Table",
                    },
                  });
                }
              }}
            >
              <PostAddIcon
                style={{
                  color: params.row.isPosted
                    ? theme.palette.grey.label
                    : theme.palette.grey.title,
                }}
              />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton disabled={params.row.isPosted} onClick={toggleEdit}>
              <EditIcon
                style={{
                  color: params.row.isPosted
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
              disabled={params.row.isPosted}
              onClick={() =>
                Promise.resolve(useDeleteStoreIssueById(params.row.id))
                  .then(({ error, data }) => {
                    if (!error) {
                      props.enqueueSnackbar(
                        `Issue ${data.data.code} : Deletion successful.`,
                        {
                          variant: "success",
                          autoHideDuration: 5000,
                        }
                      );
                    } else {
                      props.enqueueSnackbar(
                        `Issue ${data.data.code} : Deletion failed.
                        Reason: ${error.code}`,
                        {
                          variant: "error",
                          autoHideDuration: 5000,
                        }
                      );

                      LogRocket.captureException(data, {
                        tags: { source: "FaunaDB Error" },
                        extra: {
                          component: "Store Issue Table",
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
                      tags: { function: "useDeleteItemById" },
                      extra: {
                        component: "Store Issue Table",
                      },
                    });
                  })
              }
            >
              <DeleteIcon
                style={{
                  color: params.row.isPosted
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
      headerName: "Posted",
      headerAlign: "center",
      field: "isPosted",
      type: "boolean",
      width: 145,
      align: "center",
      editable: editable,
    },
    {
      headerName: "Date",
      headerAlign: "center",
      field: "date",
      type: "date",
      width: 115,
      align: "center",
      editable: editable,
      valueFormatter: (params) => format(new Date(params.value), "yyyy-MM-dd"),
    },
    {
      headerName: "Issue Code",
      headerAlign: "center",
      field: "code",
      width: 180,
      align: "center",
      editable: editable,
    },
    {
      headerName: "Requisition Code",
      headerAlign: "center",
      field: "reqCode",
      width: 200,
      align: "center",
      editable: editable,
    },
    {
      headerName: "Item Code",
      headerAlign: "center",
      field: "item",
      width: 180,
      align: "center",
      editable: editable,
    },
    {
      headerName: "Opening Qty.",
      headerAlign: "right",
      field: "opnQty",
      type: "number",
      width: 180,
      align: "right",
      editable: editable,
    },
    {
      headerName: "Issued Qty.",
      headerAlign: "right",
      field: "issQty",
      type: "number",
      width: 160,
      align: "right",
      editable: editable,
    },
    {
      headerName: "Closing Qty.",
      headerAlign: "right",
      field: "cloQty",
      type: "number",
      width: 180,
      align: "right",
      valueGetter: (params) =>
        Number(params.row.opnQty) - Number(params.row.issQty),
      editable: editable,
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
      label={"Store Issues"}
      columns={columns}
      fetch={useGetAllStoreIssues}
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

export default withSnackbar(StyledTableStoreIssues);
