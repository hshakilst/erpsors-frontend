import React from "react";
import { useGetAllItems, useDeleteItemById } from "@/adapters/items";
import { withSnackbar } from "notistack";
import { IconButton, Typography } from "@material-ui/core";
import StyledDataGrid from "@/components/shared/tables/styledDataGrid";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import theme from "@/components/ui/theme"

const columns = [
  { headerName: "ID", field: "id", hide: true },
  {
    headerName: "Date",
    field: "opnDate",
    type: "date",
    width: 115,
    align: "justify",
  },
  {
    headerName: "Item Code",
    field: "code",
    width: 180,
    align: "justify",
  },
  {
    headerName: "Item Type",
    field: "type",
    width: 180,
    align: "justify",
  },
  {
    headerName: "Item Name",
    field: "name",
    width: 230,
    align: "justify",
  },
  {
    headerName: "Quantity",
    field: "qty",
    type: "number",
    width: 160,
    align: "right",
  },
  {
    headerName: "Unit",
    field: "unit",
    width: 120,
    align: "justify",
  },
  {
    headerName: "Rate",
    field: "valueRate",
    type: "number",
    width: 120,
    align: "right",
  },
  {
    headerName: "Amount",
    field: "totalAmount",
    type: "number",
    width: 150,
    align: "right",
  },

  {
    headerName: "Status",
    field: "status",
    width: 125,
    align: "justify",
  },
  {
    headerName: "Supplier Code",
    field: "supplier",
    width: 200,
    align: "justify",
  },
  {
    headerName: "Warehouse Code",
    field: "warehouse",
    width: 200,
    align: "justify",
  },
  {
    headerName: "Shelf Life",
    field: "shelfLife",
    type: "number",
    width: 145,
    align: "right",
  },
  {
    headerName: "Notes",
    field: "notes",
    width: 180,
    align: "justify",
  },
  {
    headerName: "Group",
    field: "group",
    width: 120,
    align: "justify",
  },
  {
    headerName: "Image",
    field: "image",
    width: 130,
    align: "justify",
  },

  {
    headerName: "Actions",
    field: "actions",
    width: 130,
    align: "center",
    renderCell: (params) => (
      <IconButton onClick={() => useDeleteItemById(params.row.id)}>
        <DeleteForeverIcon style={{ color: theme.palette.grey.title }} />
      </IconButton>
    ),
  },
];

const StyledTableItems = (props) => {
  return (
    <StyledDataGrid label={"Items"} columns={columns} fetch={useGetAllItems} />
  );
};

export default withSnackbar(StyledTableItems);
