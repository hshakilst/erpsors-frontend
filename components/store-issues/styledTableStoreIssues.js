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
      Promise.resolve(useUpdateStoreIssueById(data)).then(({ error, data }) => {
        if (!error)
          props.enqueueSnackbar(
            `Issue ${data.data.code} : Update Successful.`,
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
        \nReason: ${JSON.stringify(error).replaceAll(`/`, ``).trim()}`,
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
          <Grid item xs={4}>
            <IconButton
              disabled={params.row.isPosted}
              onClick={() => {
                try {
                  Promise.resolve(
                    useCreateItemLedger(
                      new ItemsLedger({
                        date: params.row.date,
                        code: `SI-${params.row.code}`,
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
                          else throw data;
                        });
                      else throw data;
                    })
                    .catch((error) => {
                      throw error;
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
            <IconButton
              disabled={params.row.isPosted}
              onClick={() => toggleEdit(params.row.id)}
            >
              <EditIcon
                style={{
                  color: params.row.isPosted
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
                    } else throw data;
                  })
                  .catch((error) => {
                    props.enqueueSnackbar(
                      `Something went wrong.
                 \nReason: ${JSON.stringify(error).replace(`\\`, ` `).trim()}`,
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
      headerName: "Issue Code",
      headerAlign: "center",
      field: "code",
      width: 180,
      align: "center",
      editable: false,
    },
    {
      headerName: "Requisition Code",
      headerAlign: "center",
      field: "reqCode", //floor requisition code
      width: 200,
      align: "center",
      editable: true,
    },
    {
      headerName: "Item Code",
      headerAlign: "center",
      field: "item",
      width: 180,
      align: "center",
      editable: true,
    },
    {
      headerName: "Opening Qty.",
      headerAlign: "right",
      field: "opnQty",
      type: "number",
      width: 180,
      align: "right",
      editable: true,
    },
    {
      headerName: "Issued Qty.",
      headerAlign: "right",
      field: "issQty",
      type: "number",
      width: 160,
      align: "right",
      editable: true,
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
      editable: false,
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
      isCellEditable={(params) => params.row.id === editable}
      onCellEditCommit={handleCellEditCommit}
    />
  );
};

export default withSnackbar(StyledTableStoreIssues);
