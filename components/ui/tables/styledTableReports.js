import React from "react";
import {
  useGetAllItemsLedger,
  useDeleteItemLedgerById,
} from "@/actions/items-ledger";
import StyledMaterialTable from "@/components/shared/styledMaterialTable";
import { withSnackbar } from "notistack";
import { Typography } from "@material-ui/core";
import EnhancedTable from "@/components/ui/tables/enhancedTable"
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshRoundedIcon from "@material-ui/icons/RefreshRounded";

// const columns = [
//   { title: "ID", field: "id", hidden: true },
//   {
//     title: "Date",
//     field: "date",
//     type: "date",
//     dateSetting: { loacle: "bn_BD" },
//     render: (rowData) => (
//       <Typography variant="inherit">{rowData.date}</Typography>
//     ),
//   },
//   {
//     title: "Transaction Code",
//     field: "code",
//     //   editComponent: (props) => (
//     //     <input
//     //       type="text"
//     //       value={props.value}
//     //       onChange={(e) => props.onChange(e.target.value)}
//     //     />
//     //   ),
//   },
//   {
//     title: "Transaction Type",
//     field: "type",
//   },
//   { title: "Item Code", field: "itemCode" },
//   { title: "Item Name", field: "itemName" },
//   {
//     title: "Opening Rate",
//     field: "opnRate",
//     type: "numeric",
//   },
//   {
//     title: "Opening Quantity",
//     field: "opnQty",
//     type: "numeric",
//   },
//   {
//     title: "Received Rate",
//     field: "recRate",
//     type: "numeric",
//   },
//   {
//     title: "Received Quantity",
//     field: "recQty",
//     type: "numeric",
//   },
//   {
//     title: "Issue Rate",
//     field: "issRate",
//     type: "numeric",
//   },
//   {
//     title: "Issue Quantity",
//     field: "issQty",
//     type: "numeric",
//   },
//   {
//     title: "Closing Rate",
//     field: "cloRate",
//     type: "numeric",
//   },
//   {
//     title: "Closing Quantity",
//     field: "cloQty",
//     type: "numeric",
//   },
//   {
//     title: "Warehouse Code",
//     field: "warehouseCode",
//   },
//   {
//     title: "Warehouse Name",
//     field: "warehouseName",
//   },
// ];

const columns = [
  {
    id: "date",
    label: "Date",
    align: "left",
    width: "2rem",
    render: (row) => <>{row.date}</>,
  },
  {
    id: "code",
    label: "Transaction Code",
    align: "left",
    render: (row) => <>{row.code}</>,
  },
  {
    id: "type",
    disablePadding: false,
    label: "Transaction Type",
    align: "left",
    // width: 100,
    render: (row) => <>{row.type}</>,
  },
  {
    id: "itemCode",
    label: "Item Code",
    align: "left",
    // width: 100,
    render: (row) => <>{row.itemCode}</>,
  },
  {
    id: "itemName",
    label: "Item Name",
    align: "left",
    // width: 100,
    render: (row) => <>{row.itemName}</>,
  },
  {
    id: "opnRate",
    label: "Opening Rate",
    align: "right",
    // width: 100,
    render: (row) => <>{row.opnRate}</>,
  },
  {
    id: "opnQty",
    label: "Opening Quantity",
    align: "right",
    // width: 100,
    render: (row) => <>{row.opnQty}</>,
  },
  {
    id: "recRate",
    label: "Received Rate",
    align: "right",
    // width: 100,
    render: (row) => <>{row.recRate}</>,
  },
  {
    id: "recQty",
    label: "Received Quantity",
    align: "right",
    // width: 100,
    render: (row) => <>{row.recQty}</>,
  },

  {
    id: "issRate",
    label: "Issued Rate",
    align: "right",
    // width: 100,
    render: (row) => <>{row.issRate}</>,
  },
  {
    id: "issQty",
    label: "Issued Quantity",
    align: "right",
    // width: 100,
    render: (row) => <>{row.issQty}</>,
  },
  {
    id: "cloRate",
    label: "Closing Rate",
    align: "right",
    // width: 100,
    render: (row) => <>{row.cloRate}</>,
  },
  {
    id: "cloQty",
    label: "Closing Quantity",
    align: "right",
    // width: 100,
    render: (row) => <>{row.cloQty}</>,
  },
  {
    id: "warehouseCode",
    disablePadding: false,
    label: "Warehouse Code",
    align: "left",
    // width: 100,
    render: (row) => <>{row.warehouseCode}</>,
  },
  {
    id: "warehouseName",
    disablePadding: false,
    label: "Warehouse Name",
    align: "left",
    // width: 100,
    render: (row) => <>{row.warehouseName}</>,
  },
];

const StyledTableReports = (props) => {
  const { error, data, loading, mutate, isValidating } = useGetAllItemsLedger();

  return (
    // <StyledMaterialTable
    //   label={"Store Reports"}
    //   columns={columns}
    //   data={data}
    //   fetch={useGetAllItemsLedger}
    //   loading={loading}
    //   refresh={mutate}
    //   deleteById={useDeleteItemLedgerById}
    // />
    <EnhancedTable
      fetch={useGetAllItemsLedger}
      label={"Store Reports"}
      columns={columns}
      onSelectToolbarActions={[
        {
          title: "Delete",
          icon: <DeleteIcon style={{ color: "#14142B" }} />,
          onClick: () => {
            console.log("Delete");
          },
        },
      ]}
      toolbarActions={[
        {
          title: "Filter",
          icon: <FilterListIcon style={{ color: "#14142B" }} />,
          onClick: () => {
            console.log("Filter");
          },
        },
        {
          title: "Refresh",
          icon: <RefreshRoundedIcon style={{ color: "#14142B" }} />,
          onClick: () => {
            mutate();
          },
        },
      ]}
    />
  );
};

export default withSnackbar(StyledTableReports);
