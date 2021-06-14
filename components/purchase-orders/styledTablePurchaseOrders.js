import React from "react";
import {
  useGetAllPurchaseOrders,
  useDeletePurchaseOrdersById,
} from "@/adapters/purchase-orders";
import { withSnackbar } from "notistack";
import { IconButton, Typography } from "@material-ui/core";
import StyledDataGrid from "@/components/shared/tables/styledDataGrid";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import theme from "@/components/ui/theme";

const columns = [
  { headerName: "ID", headerAlign: "center", field: "id", hide: true },
  {
    headerName: "Date",
    headerAlign: "center",
    field: "date",
    type: "date",
    width: 115,
    align: "justify",
  },
  {
    headerName: "PO Code",
    headerAlign: "center",
    field: "code",
    width: 140,
    align: "justify",
  },
  {
    headerName: "Requisition Code",
    headerAlign: "center",
    field: "reqCode",
    width: 200,
    align: "justify",
  },
  {
    headerName: "Item Code",
    headerAlign: "center",
    field: "item",
    width: 150,
    align: "justify",
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
    align: "justify",
  },
  {
    headerName: "Purchase Mode",
    headerAlign: "center",
    field: "purMode",
    width: 200,
    align: "justify",
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
    align: "justify",
  },
  {
    headerName: "Notes",
    headerAlign: "center",
    field: "notes",
    width: 300,
    align: "justify",
    valueFormatter: (params) =>
      params.value === "" ? `(empty)` : params.value,
  },
  {
    headerName: "Actions",
    headerAlign: "center",
    field: "actions",
    width: 130,
    align: "center",
    renderCell: (params) => (
      <IconButton onClick={() => useDeletePurchaseOrdersById(params.row.id)}>
        <DeleteForeverIcon style={{ color: theme.palette.grey.title }} />
      </IconButton>
    ),
  },
];

const StyledTablePurchaseOrders = (props) => {
  return (
    <StyledDataGrid
      label={"Purchase Orders"}
      columns={columns}
      fetch={useGetAllPurchaseOrders}
    />
  );
};

export default withSnackbar(StyledTablePurchaseOrders);
