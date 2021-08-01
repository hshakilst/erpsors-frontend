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
import StoreIssues from "@/components/update-forms/storeIssues";
import LogRocket from "logrocket";
import { useCreateItemLedger } from "@/adapters/items-ledger";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ItemsLedger from "@/contexts/items-ledger";

const StyledTableStoreIssues = (props) => {
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const UpdateFormItems = withStyledUpdateForm(StoreIssues);

  const columns = [
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
                  color: params.row.isApproved
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
                  color: params.row.isApproved
                    ? theme.palette.grey.label
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
    },
    { headerName: "ID", field: "id", hide: true },
    {
      headerName: "Date",
      headerAlign: "center",
      field: "date",
      type: "date",
      width: 160,
      align: "center",
    },
    {
      headerName: "Requisition Code",
      headerAlign: "center",
      field: "code",
      width: 200,
      align: "center",
    },
    {
      headerName: "Item Code",
      headerAlign: "center",
      field: "item",
      width: 160,
      align: "center",
    },
    {
      headerName: "Required Qty.",
      headerAlign: "right",
      field: "reqQty",
      type: "number",
      width: 180,
      align: "right",
    },
    // {
    //   headerName: "Item Type",
    //   headerAlign: "center",
    //   field: "type",
    //   width: 180,
    //   align: "center",
    // },
    // {
    //   headerName: "Item Name",
    //   headerAlign: "center",
    //   field: "name",
    //   width: 230,
    //   align: "center",
    // },
    {
      headerName: "Required By",
      headerAlign: "center",
      field: "reqDate",
      type: "date",
      width: 180,
      align: "center",
    },
    // {
    //   headerName: "Unit",
    //   headerAlign: "center",
    //   field: "unit",
    //   width: 120,
    //   align: "center",
    // },
    // {
    //   headerName: "Supplier Code",
    //   headerAlign: "center",
    //   field: "supplier",
    //   width: 200,
    //   align: "center",
    //   valueFormatter: (params) =>
    //     params.value === "" ? `(empty)` : params.value,
    // },-*
    {
      headerName: "Warehouse Code",
      headerAlign: "center",
      field: "warehouse",
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
        label={"Store Requisitions"}
        data={data}
        open={open}
        handleClose={handleClose}
      />
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
      />
    </>
  );
};

export default withSnackbar(StyledTableStoreIssues);
