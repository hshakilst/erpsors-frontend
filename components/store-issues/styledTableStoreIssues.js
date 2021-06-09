import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import {
  useGetAllStoreIssues,
  useDeleteStoreIssueById,
  useUpdateStoreIssueById,
} from "@/adapters/store-issues";
import RefreshRoundedIcon from "@material-ui/icons/RefreshRounded";
import { withSnackbar } from "notistack";
import { Button } from "@material-ui/core";
import { useCreateItemLedger } from "@/adapters/items-ledger";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "code",
    numeric: false,
    disablePadding: true,
    label: "Code",
  },
  {
    id: "reqCode",
    numeric: false,
    disablePadding: false,
    label: "Requisition Code",
  },
  { id: "item", numeric: false, disablePadding: false, label: "Item" },
  {
    id: "opnRate",
    numeric: true,
    disablePadding: false,
    label: "Opening Rate",
  },
  {
    id: "opnQty",
    numeric: true,
    disablePadding: false,
    label: "Opening Qty.",
  },
  {
    id: "issRate",
    numeric: true,
    disablePadding: false,
    label: "Issued Rate",
  },
  {
    id: "issQty",
    numeric: true,
    disablePadding: false,
    label: "Issued Qty.",
  },
  {
    id: "warehouse",
    numeric: false,
    disablePadding: false,
    label: "Warehouse",
  },
  { id: "notes", numeric: false, disablePadding: false, label: "Notes" },
  { id: "actions", numeric: false, disablePadding: false, label: "Actions" },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    minHeight: "0px",
    "& @media (min-width: 600px) .MuiToolbar-regular": {
      minHeight: "0px",
    },
  },
  highlight:
    theme.palette.type === "light"
      ? {}
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const theme = useTheme();
  const classes = useToolbarStyles();
  const { numSelected } = props;
  const [isDisabledDelete, setIsDisabledDelete] = React.useState(false);

  const handleRefresh = () => {
    props.refreshRows();
  };

  const handleDelete = () => {
    if (confirm("Delete selected items?")) {
      setIsDisabledDelete(true);
      setTimeout(async () => {
        await props.handleDelete();
        setIsDisabledDelete(false);
      }, 1000);
    }
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
          style={{
            fontSize: "1rem",
            fontWeight: 600,
            color: theme.palette.grey.title,
            letterSpacing: "0.047rem",
          }}
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          id="tableTitle"
          component="div"
          style={{
            fontSize: "1.2rem",
            fontWeight: 600,
            color: theme.palette.grey.title,
            letterSpacing: "0.047rem",
            textAlign: "left",
          }}
        >
          {"Store Issues"}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton
            disabled={isDisabledDelete}
            aria-label="delete"
            onClick={handleDelete}
          >
            <DeleteIcon style={{ color: theme.palette.grey.title }} />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon style={{ color: theme.palette.grey.title }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Refresh list">
            <IconButton aria-label="refresh list" onClick={handleRefresh}>
              <RefreshRoundedIcon style={{ color: theme.palette.grey.title }} />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.grey.line,
    borderRadius: "1rem",
    "& .MuiTableRow-root.Mui-selected": {
      backgroundColor: theme.palette.grey.inputBackground,
    },
    "& .MuiCheckbox-colorSecondary.Mui-checked": {
      color: "#6A6D6D",
    },
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
    borderRadius: "1rem",
    backgroundColor: theme.palette.grey.line,
  },
  table: {
    backgroundColor: theme.palette.grey.inputBackground,
    fontSize: "1rem",
    fontWeight: 400,
    color: theme.palette.grey.title,
    letterSpacing: "0.047rem",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

const EnhancedTable = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("code");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { error, data, loading, mutate } = useGetAllStoreIssues();

  React.useEffect(() => {
    if (data) setRows(data);
  }, [data]);

  if (error) {
    //FIXME: Handle Errors
    return <h1>error</h1>;
  }
  if (loading) {
    return <h1>loading</h1>;
    //FIXME: Loading screen for table
    // setRows([{ name: "Loading" }]);
  }

  const handleDeleteMultiple = () => {
    const errors = [];
    selected.map(async (rowID) => {
      const { error, data } = await useDeleteStoreIssueById(rowID);
      if (error) errors.push({ id: data.ref, error });
    });
    if (errors.length === 0)
      setTimeout(() => {
        props.enqueueSnackbar(
          `${JSON.stringify({
            errors: errors,
          })}`,
          {
            variant: "success",
          }
        );
        setSelected([]);
      }, 3000);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          refreshRows={mutate}
          numSelected={selected.length}
          handleDelete={handleDeleteMultiple}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="small"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      // onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                          onClick={(event) => handleClick(event, row.id)}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.code}
                      </TableCell>
                      <TableCell align="left">{row.reqCode}</TableCell>
                      <TableCell align="left">
                        {`${row.item.code}: ${row.item.name}`}
                      </TableCell>
                      <TableCell align="right">{row.opnRate}</TableCell>
                      <TableCell align="right">{row.opnQty}</TableCell>
                      <TableCell align="right">{row.issRate}</TableCell>
                      <TableCell align="right">{row.issQty}</TableCell>
                      <TableCell align="left">{`${row.warehouse.code}: ${row.warehouse.name}`}</TableCell>
                      <TableCell align="left">{row.notes || "N/A"}</TableCell>
                      <TableCell align="left">
                        <Button
                          variant="outlined"
                          onClick={() =>
                            new Promise((resolve, reject) => {
                              setTimeout(async () => {
                                await useCreateItemLedger({
                                  code: row.code,
                                  type: "store-issues",
                                  itemId: row.item.id,
                                  itemCode: row.item.code,
                                  itemName: row.item.name,
                                  opnRate: row.opnRate,
                                  opnQty: row.opnQty,
                                  recRate: 0,
                                  recQty: 0,
                                  issRate: row.issRate,
                                  issQty: row.issQty,
                                  warehouseCode: row.warehouse.code,
                                  warehouseName: row.warehouse.name,
                                });
                                await useUpdateStoreIssueById({
                                  id: row.id,
                                  isPosted: true,
                                });
                                resolve();
                              }, 100);
                            }).then(() => {
                              props.enqueueSnackbar("Posted to items ledger!", {
                                variant: "success",
                              });
                            })
                          }
                          disabled={row.isPosted}
                        >
                          {row.isPosted ? "Posted" : "Post"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 33 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default withSnackbar(EnhancedTable);
