import React from 'react'
import StyledNavbar from '@/components/ui/styledNavbar'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import StyledItems from '@/components/ui/styledItems'
import StyledInventoryHistory from '@/components/ui/styledInventoryHistory'
import StyledTableCard from '@/components/ui/styledTableCard'
import BaseLayout from '@/components/layouts/baseLayout'
import { useGetAllItems } from '@/actions/items'

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: '#EFF0F6',
      padding: theme.spacing(1.5),
      [theme.breakpoints.down('xs')]: {
        marginLeft: 0
      },
      marginLeft: 240
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      paddingTop: '1rem',
      paddingBottom: '1rem',
      borderRadius: '1rem',
      '& .MuiPaper-elevation1': {
        boxShadow: 'none'
      }
    },
    gridItem: {
      flexDirection: 'column',
      flexGrow: 1,
      justifyContent: 'center',
      textAlign: 'center'
    }
  })
)

const Inventory = props => {
  const classes = useStyles()
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
    <BaseLayout>
      <StyledNavbar></StyledNavbar>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid className={classes.gridItem} item xs={8}>
            <Paper className={classes.paper}>
              <StyledItems></StyledItems>
            </Paper>
          </Grid>
          <Grid item className={classes.gridItem} xs={4}>
            <Paper className={classes.paper}>
              <StyledInventoryHistory></StyledInventoryHistory>
            </Paper>
          </Grid>
          <Grid item className={classes.gridItem} xs={12}>
            <Paper className={classes.paper}>
              <StyledTableCard fetch={useGetAllItems} headCells={headCells}></StyledTableCard>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </BaseLayout>
  )
}

export default Inventory
