import React, { useState } from "react";
import {
  useGetAllStoreReceipts,
  useDeleteStoreReceiptById,
  useUpdateStoreReceiptById,
} from "@/adapters/store-receipts";
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

const StyledTableStoreReceipts = (props) => {
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

    Promise.resolve(useUpdateStoreReceiptById(data))
      .then(({ error, data }) => {
        if (!error)
          props.enqueueSnackbar(
            `Receipt ${data.data.code} : Update Successful.`,
            {
              variant: "success",
              autoHideDuration: 5000,
            }
          );
        else throw data;
      })
      .catch((error) => {
        props.enqueueSnackbar(
          `Something went wrong.
        \nReason: ${JSON.stringify(error).replace(`\\`, " ").trim()}`,
          {
            variant: "error",
            autoHideDuration: 5000,
          }
        );

        LogRocket.captureException(error, {
          tags: { function: "onUpdateStoreReceipt" },
          extra: {
            component: "Store Receipts Table",
          },
        });
      });
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
              onClick={async () => {
                try {
                  const { error: errorLedger, data: dataLedger } =
                    await useCreateItemLedger({
                      date: params.row.date,
                      code: `SR-${params.row.code}`,
                      type: "store-receipts",
                      itemCode: params.row.item,
                      opnRate: params.row.opnRate,
                      opnQty: params.row.opnQty,
                      recRate: params.row.recRate,
                      recQty: params.row.recQty,
                      issRate: 0,
                      issQty: 0,
                      warehouseCode: params.row.warehouse,
                      notes: params.row.notes,
                    });
                  console.log(params.row.cloQty);
                  const { error, data } = await useUpdateStoreReceiptById({
                    id: params.row.id,
                    isPosted: true,
                  });
                  if (!error && !errorLedger)
                    props.enqueueSnackbar(
                      `Receipt ${params.row.code} : Posting Successful.`,
                      {
                        variant: "success",
                        autoHideDuration: 5000,
                      }
                    );
                  else throw { dataLedger, data };
                } catch (error) {
                  props.enqueueSnackbar(
                    `Receipt ${params.row.code} : Posting Failed.`,
                    {
                      variant: "error",
                      autoHideDuration: 5000,
                    }
                  );

                  LogRocket.captureException(error, {
                    tags: { function: "onPostStoreReceipt" },
                    extra: {
                      component: "Store Receipt Table",
                    },
                  });
                }

                // Promise.resolve(
                // useCreateItemLedger({
                //   date: params.row.date,
                //   code: `SR-${params.row.code}`,
                //   type: "store-receipts",
                //   itemCode: params.row.item,
                //   opnRate: params.row.opnRate,
                //   opnQty: params.row.opnQty,
                //   recRate: params.row.recRate,
                //   recQty: params.row.recQty,
                //   issRate: 0,
                //   issQty: 0,
                //   warehouseCode: params.row.warehouse,
                //   notes: params.row.notes,
                // })
                // )
                //   .then(({ error, data }) => {
                //     if (!error)
                //       Promise.resolve(
                // useUpdateStoreReceiptById({
                //   id: params.row.id,
                //   isPosted: true,
                // })
                //       )
                //         .then(({ error, data }) => {
                //           if (!error)
                // props.enqueueSnackbar(
                //   `Receipt ${data.data.code} : Posted Successful.`,
                //   {
                //     variant: "success",
                //     autoHideDuration: 5000,
                //   }
                // );
                //           else throw data;
                //         })
                //         .catch((error) => {
                // props.enqueueSnackbar(
                //   `Something went wrong.
                //   \nReason: ${JSON.stringify(error)
                //     .replace(`\\`, ` `)
                //     .trim()}`,
                //   {
                //     variant: "error",
                //     autoHideDuration: 5000,
                //   }
                // );

                // LogRocket.captureException(error, {
                //   tags: { function: "useUpdateStoreReceiptById" },
                //   extra: {
                //     component: "Store Receipt Table",
                //   },
                // });
                //         });
                //     else throw data;
                //   })
                //   .catch((error) => {
                //     props.enqueueSnackbar(
                //       `Something went wrong.
                //        \nReason: ${JSON.stringify(error)
                //          .replace(`\\`, ` `)
                //          .trim()}`,
                //       {
                //         variant: "error",
                //         autoHideDuration: 5000,
                //       }
                //     );

                //     LogRocket.captureException(error, {
                //       tags: { function: "useCreateItemLedger" },
                //       extra: {
                //         component: "Store Receipt Table",
                //       },
                //     });
                //   });
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
                Promise.resolve(useDeleteStoreReceiptById(params.row.id))
                  .then(({ error, data }) => {
                    if (!error)
                      props.enqueueSnackbar(
                        `Receipt ${data.data.code} : Deletion successful.`,
                        {
                          variant: "success",
                          autoHideDuration: 5000,
                        }
                      );
                    else throw data;
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
                      tags: { function: "useDeleteStoreReceiptById" },
                      extra: {
                        component: "Store Receipt Table",
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
      editable: false,
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
      headerName: "Receipt Code",
      headerAlign: "center",
      field: "code",
      width: 180,
      align: "center",
      editable: false,
    },
    {
      headerName: "P.O. Code",
      headerAlign: "center",
      field: "poCode",
      width: 200,
      align: "center",
      editable: false,
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
      headerName: "Received Qty.",
      headerAlign: "right",
      field: "recQty",
      type: "number",
      width: 200,
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
        Number(params.row.opnQty) + Number(params.row.recQty),
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
      label={"Store Receipts"}
      columns={columns}
      fetch={useGetAllStoreReceipts}
      // sortModel={[
      //   {
      //     field: "code",
      //     sort: "asc",
      //   },
      // ]}
      isCellEditable={(params) => params.row.id === editable}
      onCellEditCommit={handleCellEditCommit}
    />
  );
};

export default withSnackbar(StyledTableStoreReceipts);
