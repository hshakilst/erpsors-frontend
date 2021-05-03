import React from "react";
import {
  useGetAllItemsLedger,
  useDeleteItemLedgerById,
} from "@/actions/items-ledger";
import StyledMaterialTable from "@/components/shared/styledMaterialTable";
import { withSnackbar } from "notistack";
import { Typography } from "@material-ui/core";

const columns = [
  { title: "ID", field: "id", hidden: true },
  {
    title: "Date",
    field: "date",
    type: "date",
    dateSetting: { loacle: "bn_BD" },
    render: (rowData) => (
      <Typography variant="inherit">{rowData.date}</Typography>
    ),
  },
  {
    title: "Transaction Code",
    field: "code",
    //   editComponent: (props) => (
    //     <input
    //       type="text"
    //       value={props.value}
    //       onChange={(e) => props.onChange(e.target.value)}
    //     />
    //   ),
  },
  {
    title: "Transaction Type",
    field: "type",
  },
  { title: "Item Code", field: "itemCode" },
  { title: "Item Name", field: "itemName" },
  {
    title: "Opening Rate",
    field: "opnRate",
    type: "numeric",
  },
  {
    title: "Opening Quantity",
    field: "opnQty",
    type: "numeric",
  },
  {
    title: "Received Rate",
    field: "recRate",
    type: "numeric",
  },
  {
    title: "Received Quantity",
    field: "recQty",
    type: "numeric",
  },
  {
    title: "Issue Rate",
    field: "issRate",
    type: "numeric",
  },
  {
    title: "Issue Quantity",
    field: "issQty",
    type: "numeric",
  },
  {
    title: "Closing Rate",
    field: "cloRate",
    type: "numeric",
  },
  {
    title: "Closing Quantity",
    field: "cloQty",
    type: "numeric",
  },
  {
    title: "Warehouse Code",
    field: "warehouseCode",
  },
  {
    title: "Warehouse Name",
    field: "warehouseName",
  },
];

const StyledTableReports = (props) => {
  const { error, data, loading, mutate, isValidating } = useGetAllItemsLedger();

  return (
    <StyledMaterialTable
      label={"Store Reports"}
      columns={columns}
      data={data}
      fetch={useGetAllItemsLedger}
      loading={loading}
      refresh={mutate}
      deleteById={useDeleteItemLedgerById}
    />
  );
};

export default withSnackbar(StyledTableReports);
