import React from "react";
import {
  useGetAllItemsLedger,
  useDeleteItemLedgerById,
} from "@/adapters/items-ledger";
import { withSnackbar } from "notistack";
import { IconButton, Typography } from "@material-ui/core";
import StyledDataGrid from "@/components/shared/tables/styledDataGrid";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import theme from "@/components/ui/theme";
import LogRocket from "logrocket";

const columns = [
  { headerName: "ID", field: "id", hide: true },
  {
    headerName: "Date",
    field: "date",
    type: "date",
    width: 115,
    align: "center",
  },
  {
    headerName: "Transaction Code",
    field: "code",
    width: 180,
    align: "center",
  },
  {
    headerName: "Transaction Type",
    field: "type",
    width: 180,
    align: "center",
  },
  { headerName: "Item Code", field: "itemCode", width: 130, align: "center" },
  {
    headerName: "Opening Rate",
    field: "opnRate",
    type: "number",
    width: 150,
    align: "center",
  },
  {
    headerName: "Opening Quantity",
    field: "opnQty",
    type: "number",
    width: 180,
    align: "center",
  },
  {
    headerName: "Received Rate",
    field: "recRate",
    type: "number",
    width: 155,
    align: "center",
  },
  {
    headerName: "Received Quantity",
    field: "recQty",
    type: "number",
    width: 185,
    align: "center",
  },

  {
    headerName: "Issue Rate",
    field: "issRate",
    type: "number",
    width: 125,
    align: "center",
  },
  {
    headerName: "Issue Quantity",
    field: "issQty",
    type: "number",
    width: 155,
    align: "center",
  },
  {
    headerName: "Closing Rate",
    field: "cloRate",
    type: "number",
    width: 145,
    align: "center",
  },
  {
    headerName: "Closing Quantity",
    field: "cloQty",
    type: "number",
    width: 170,
    align: "center",
  },
  {
    headerName: "Warehouse Code",
    field: "warehouseCode",
    width: 175,
    align: "center",
  },
  {
    headerName: "Notes",
    field: "notes",
    width: 180,
    align: "center",
  },
  {
    headerName: "Actions",
    field: "actions",
    width: 105,
    align: "center",
    renderCell: (params) => (
      <IconButton
        onClick={() =>
          Promise.resolve(useDeleteItemLedgerById(params.row.id))
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
                  `Item ${data.data.code} : Deletion failed.
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
    ),
  },
];

const StyledTableReports = (props) => {
  return (
    <StyledDataGrid
      label={"Store Reports"}
      columns={columns}
      fetch={useGetAllItemsLedger}
    />
  );
};

export default withSnackbar(StyledTableReports);
