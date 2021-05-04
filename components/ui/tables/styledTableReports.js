import React from "react";
import {
  useGetAllItemsLedger,
  useDeleteItemLedgerById,
} from "@/actions/items-ledger";
import { withSnackbar } from "notistack";
import { IconButton, Typography } from "@material-ui/core";
import StyledDataGrid from "@/components/ui/styledDataGrid";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const columns = [
  { headerName: "ID", field: "id", hide: true },
  {
    headerName: "Date",
    field: "date",
    type: "date",
    width: 115,
    align: "justify",
  },
  {
    headerName: "Transaction Code",
    field: "code",
    width: 180,
    align: "justify",
  },
  {
    headerName: "Transaction Type",
    field: "type",
    width: 180,
    align: "justify",
  },
  { headerName: "Item Code", field: "itemCode", width: 130, align: "justify" },
  { headerName: "Item Name", field: "itemName", width: 135, align: "justify" },
  {
    headerName: "Opening Rate",
    field: "opnRate",
    type: "number",
    width: 150,
    align: "justify",
  },
  {
    headerName: "Opening Quantity",
    field: "opnQty",
    type: "number",
    width: 180,
    align: "justify",
  },
  {
    headerName: "Received Rate",
    field: "recRate",
    type: "number",
    width: 155,
    align: "justify",
  },
  {
    headerName: "Received Quantity",
    field: "recQty",
    type: "number",
    width: 185,
    align: "justify",
  },
  {
    headerName: "Issue Rate",
    field: "issRate",
    type: "number",
    width: 125,
    align: "justify",
  },
  {
    headerName: "Issue Quantity",
    field: "issQty",
    type: "number",
    width: 155,
    align: "justify",
  },
  {
    headerName: "Closing Rate",
    field: "cloRate",
    type: "number",
    width: 145,
    align: "justify",
  },
  {
    headerName: "Closing Quantity",
    field: "cloQty",
    type: "number",
    width: 170,
    align: "justify",
  },
  {
    headerName: "Warehouse Code",
    field: "warehouseCode",
    width: 175,
    align: "justify",
  },
  {
    headerName: "Warehouse Name",
    field: "warehouseName",
    width: 180,
    align: "justify",
  },
  {
    headerName: "Actions",
    field: "actions",
    width: 105,
    align: "justify",
    renderCell: (params) => (
      <IconButton onClick={() => useDeleteItemLedgerById(params.row.id)}>
        <DeleteForeverIcon style={{ color: "#14142B" }} />
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
