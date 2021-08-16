import React from "react";
import {
  useGetAllItemsLedger,
  useDeleteItemLedgerById,
} from "@/adapters/items-ledger";
import { withSnackbar } from "notistack";
import { Grid, IconButton, Typography } from "@material-ui/core";
import StyledDataGrid from "@/components/shared/tables/styledDataGrid";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import theme from "@/components/ui/theme";
import LogRocket from "logrocket";

const StyledTableReports = (props) => {
  const columns = [
    { headerName: "ID", field: "id", hide: true },
    {
      headerName: "Date",
      headerAlign: "center",
      field: "date",
      type: "date",
      width: 115,
      align: "center",
    },
    {
      headerName: "Transaction Code",
      headerAlign: "center",
      field: "code",
      width: 220,
      align: "center",
    },
    {
      headerName: "Transaction Type",
      headerAlign: "center",
      field: "type",
      width: 220,
      align: "center",
    },
    {
      headerName: "Item Code",
      headerAlign: "center",
      field: "itemCode",
      width: 160,
      align: "center",
    },
    {
      headerName: "Opening Rate",
      headerAlign: "right",
      field: "opnRate",
      type: "number",
      width: 180,
      align: "right",
    },
    {
      headerName: "Opening Quantity",
      headerAlign: "right",
      field: "opnQty",
      type: "number",
      width: 220,
      align: "right",
    },
    {
      headerName: "Received Rate",
      headerAlign: "right",
      field: "recRate",
      type: "number",
      width: 200,
      align: "right",
    },
    {
      headerName: "Received Quantity",
      headerAlign: "right",
      field: "recQty",
      type: "number",
      width: 220,
      align: "right",
    },

    {
      headerName: "Issue Rate",
      headerAlign: "right",
      field: "issRate",
      type: "number",
      width: 180,
      align: "right",
    },
    {
      headerName: "Issue Quantity",
      headerAlign: "right",
      field: "issQty",
      type: "number",
      width: 200,
      align: "right",
    },
    {
      headerName: "Closing Rate",
      headerAlign: "right",
      field: "cloRate",
      type: "number",
      width: 200,
      align: "right",
    },
    {
      headerName: "Closing Quantity",
      headerAlign: "right",
      field: "cloQty",
      type: "number",
      width: 200,
      align: "right",
    },
    {
      headerName: "Warehouse Code",
      headerAlign: "center",
      field: "warehouseCode",
      width: 200,
      align: "center",
    },
    {
      headerName: "Notes",
      headerAlign: "center",
      field: "notes",
      width: 300,
      align: "center",
    },
    {
      headerName: "Actions",
      headerAlign: "center",
      field: "actions",
      width: 160,
      align: "center",
      renderCell: (params) => (
        <Grid container>
          <Grid item xs={12}>
            <IconButton
              onClick={() =>
                Promise.resolve(useDeleteItemLedgerById(params.row.id))
                  .then(({ error, data }) => {
                    if (!error) {
                      props.enqueueSnackbar(
                        `Items Ledger ${data.data.code} : Deletion successful.`,
                        {
                          variant: "success",
                          autoHideDuration: 5000,
                        }
                      );
                    } else {
                      LogRocket.captureException(data, {
                        tags: { source: "FaunaDB Error" },
                        extra: {
                          component: "Items Ledger Table",
                        },
                      });
                      throw data;
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
              <DeleteForeverIcon style={{ color: theme.palette.grey.title }} />
            </IconButton>
          </Grid>
        </Grid>
      ),
    },
  ];

  return (
    <StyledDataGrid
      label={"Store Reports"}
      columns={columns}
      fetch={useGetAllItemsLedger}
    />
  );
};

export default withSnackbar(StyledTableReports);
