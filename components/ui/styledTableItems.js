import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
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
import RefreshRoundedIcon from "@material-ui/icons/RefreshRounded";
import { useGetAllItems, useDeleteItem } from "@/actions/items";
import { withSnackbar } from "notistack";

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
  const headCells = [
    {
      id: "code",
      numeric: false,
      disablePadding: true,
      label: "Code",
    },
    { id: "name", numeric: false, disablePadding: false, label: "Name" },
    { id: "type", numeric: false, disablePadding: false, label: "Type" },
    {
      id: "opnQty",
      numeric: true,
      disablePadding: false,
      label: "Opn. Qty",
    },
    {
      id: "priceRate",
      numeric: true,
      disablePadding: false,
      label: "Price Rate",
    },
    {
      id: "valueRate",
      numeric: true,
      disablePadding: false,
      label: "Value Rate",
    },
    {
      id: "unit",
      numeric: false,
      disablePadding: false,
      label: "Unit",
    },
    {
      id: "warehouse",
      numeric: false,
      disablePadding: false,
      label: "Warehouse",
    },
    {
      id: "status",
      numeric: false,
      disablePadding: false,
      label: "Status",
    },
    {
      id: "group",
      numeric: false,
      disablePadding: false,
      label: "Group",
    },
    {
      id: "image",
      numeric: false,
      disablePadding: false,
      label: "Image",
    },
    {
      id: "notes",
      numeric: false,
      disablePadding: false,
      label: "Notes",
    },
  ];
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all rows" }}
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
      }, 500);
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
            color: "#14142B",
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
            color: "#14142B",
            letterSpacing: "0.047rem",
          }}
        >
          {"Items"}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton
            disabled={isDisabledDelete}
            aria-label="delete"
            onClick={handleDelete}
          >
            <DeleteIcon style={{ color: "#14142B" }} />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon style={{ color: "#14142B" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Refresh list">
            <IconButton aria-label="refresh list" onClick={handleRefresh}>
              <RefreshRoundedIcon style={{ color: "#14142B" }} />
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
    backgroundColor: "#D9DBE9",
    borderRadius: "1rem",
    "& .MuiTableRow-root.Mui-selected": {
      backgroundColor: "#EFF0F6",
    },
    "& .MuiCheckbox-colorSecondary.Mui-checked": {
      color: "#6A6D6D",
    },
  },
  paper: {
    width: "100%",
    borderRadius: "1rem",
    backgroundColor: "#D9DBE9",
  },
  table: {
    backgroundColor: "#EFF0F6",
    fontSize: "1rem",
    fontWeight: 400,
    color: "#14142B",
    letterSpacing: "0.047rem",
    "& .MuiTableCell-head": {
      fontSize: "1rem",
      fontWeight: 500,
      color: "#14142B",
    },
    "& .MuiTableCell-paddingNone": {
      fontSize: "1rem",
      color: "#14142B",
    },
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
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("code");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [count, setCount] = React.useState(0);

  const { error, data, loading, mutate } = useGetAllItems();
  React.useEffect(() => {
    if (data) {
      if (data !== rows) setRows(data);
      setCount(data.length);
    }
  }, [data]);

  // if (error) return <h1>error</h1>;
  if (loading) return <h1>loading</h1>;

  const handleDeleteMultiple = () => {
    const errors = [];
    selected.map(async (row) => {
      const { error, data } = await useDeleteItem(row);
      console.log(JSON.stringify({ id: data.ref, error }));
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
      }, 1500);
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
    if (newPage <= count / rowsPerPage) setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, count - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          refreshRows={mutate}
          numSelected={selected.length}
          handleDelete={handleDeleteMultiple}
          enqueueSnackbar={props.enqueueSnackbar}
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
              rowCount={count}
              headCells={props.headCells}
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
                      onClick={(event) => handleClick(event, row.id)}
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
                      <TableCell align="left">
                        {row.name ?? "(Empty)"}
                      </TableCell>
                      <TableCell align="left">
                        {row.type ?? "(Empty)"}
                      </TableCell>
                      <TableCell align="right">
                        {row.opnQty ?? "(Empty)"}
                      </TableCell>
                      <TableCell align="right">
                        {row.priceRate ?? "(Empty)"}
                      </TableCell>
                      <TableCell align="right">
                        {row.valueRate ?? "(Empty)"}
                      </TableCell>
                      <TableCell align="left">
                        {row.unit ?? "(Empty)"}
                      </TableCell>
                      <TableCell align="left">
                        {row.warehouse?.id
                          ? `${row.warehouse.id}: ${row.warehouse.name}`
                          : "(Empty)"}
                      </TableCell>
                      <TableCell align="left">
                        {row.status ?? "(Empty)"}
                      </TableCell>
                      <TableCell align="left">{row.group || "N/A"}</TableCell>
                      <TableCell align="left">{row.image || "N/A"}</TableCell>
                      <TableCell align="left">{row.notes || "N/A"}</TableCell>
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
          count={count}
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
