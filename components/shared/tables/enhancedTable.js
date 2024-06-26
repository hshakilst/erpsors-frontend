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

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all" }}
          />
        </TableCell>
        {props.headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
            width={headCell.width}
            style={headCell.style}
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
          {props.label}
        </Typography>
      )}

      {numSelected > 0 ? (
        <>
          {props.onSelectToolbarActions.map((action) => (
            <Tooltip
              title={action.title}
              key={props.onSelectToolbarActions.indexOf(action)}
            >
              <IconButton
                aria-label={`aria-label-${action.title}`}
                onClick={action.onClick}
              >
                {action.icon}
              </IconButton>
            </Tooltip>
          ))}
        </>
      ) : (
        <>
          {props.toolbarActions.map((action) => (
            <Tooltip
              title={action.title}
              key={props.toolbarActions.indexOf(action)}
            >
              <IconButton
                aria-label={`aria-label-${action}`}
                onClick={action.onClick}
              >
                {action.icon}
              </IconButton>
            </Tooltip>
          ))}
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

const EnhancedTable = (props) => {  //fetch, label, columns
  const theme = useTheme();
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("code");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { error, data, loading, mutate } = props.fetch();

  React.useEffect(() => {
    if (data && !loading) setRows(data);
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

  // const handleDeleteMultiple = () => {
  //   const errors = [];
  //   selected.map(async (rowID) => {
  //     const { error, data } = await props.deleteRowById(rowID);
  //     if (error) errors.push({ id: data.ref, error });
  //   });
  //   if (errors.length === 0)
  //     setTimeout(() => {
  //       props.enqueueSnackbar(
  //         `${JSON.stringify({
  //           errors: errors,
  //         })}`,
  //         {
  //           variant: "success",
  //         }
  //       );
  //       setSelected([]);
  //     }, 3000);
  // };

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
          label={props.label}
          numSelected={selected.length}
          onSelectToolbarActions={props.onSelectToolbarActions}
          toolbarActions={props.toolbarActions}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby={`aria-labelled-by-${props.label}`}
            size="small"
            aria-label={`aria-label-${props.label}`}
            stickyHeader
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={props.columns}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-row-${index}`;

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
                      {props.columns.map((column) => (
                        <TableCell
                          component="td"
                          id={labelId}
                          scope={column.scope}
                          padding={column.disablePadding ? "none" : "default"}
                          key={props.columns.indexOf(column)}
                          align={column.align}
                        >
                          {column.render(row)}
                        </TableCell>
                      ))}
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
