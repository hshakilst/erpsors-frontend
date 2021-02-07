import React from 'react'
import StyledNavbar from '@/components/ui/styledNavbar'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import StyledSuppliers from '@/components/ui/styledSuppliers'
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

const Suppliers = props => {
  const classes = useStyles()
  return (
    <BaseLayout>
      <StyledNavbar></StyledNavbar>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid className={classes.gridItem} item xs={8}>
            <Paper className={classes.paper}>
              <StyledSuppliers></StyledSuppliers>
            </Paper>
          </Grid>
          <Grid item className={classes.gridItem} xs={4}>
            <Paper className={classes.paper}>
              <StyledInventoryHistory></StyledInventoryHistory>
            </Paper>
          </Grid>
          <Grid item className={classes.gridItem} xs={12}>
            <Paper className={classes.paper}>
              <StyledTableCard fetch={useGetAllItems}></StyledTableCard>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </BaseLayout>
  )
}

export default Suppliers
