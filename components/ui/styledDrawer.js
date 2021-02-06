import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import StyledButton from './styledButton'
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined'

const StyledDrawer = props => {
  const useStyles = makeStyles(theme => ({
    root: {
      zIndex: 9999999,
      backgroundColor: '#fff',
      '& .MuiList-padding': {
        paddingTop: 0,
        paddingBottom: '0px'
      },
      '& .MuiTypography-h6': {
        fontSize: '2rem',
        fontWeight: 800
      },
      '& .MuiSvgIcon-fontSizeLarge': {
        fontSize: '3rem',
        color: '#14142B'
      },
      '& .makeStyles-root-56 .MuiList-padding': {
        paddingTop: 0
      },
      '& .makeStyles-drawerPaper-33': {
        background: '#EFF0F6'
      },
      '& .MuiDrawer-paper': {
        backgroundColor: '#EFF0F6',
        flexDirection: 'none'
      },
      '& .MuiDrawer-paperAnchorDockedLeft': {
        border: 'none'
      }
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: props.drawerWidth,
        flexShrink: 0
      }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: props.drawerWidth
    }
  }))

  const { window } = props
  const classes = useStyles()
  const theme = useTheme()

  const drawer = (
    <div style={{ backgroundColor: '#EFF0F6' }}>
      <List>
        {[
          <Typography
            variant='h4'
            component='h1'
            style={{
              fontSize: '2rem',
              fontWeight: '700',
              letterSpacing: '0.063rem',
              color: '#14142B',
              paddingTop: '0.625rem',
              paddingBottom: '0.625rem'
            }}
          >
            ERPSORS
          </Typography>
        ].map((text, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              {
                <LocalMallOutlinedIcon
                  fontSize={'large'}
                  style={{ fontSize: '3rem', color: '#14142B' }}
                ></LocalMallOutlinedIcon>
              }
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <div />
      <List
        style={{
          marginTop: '0.75rem',
          paddingTop: '1.25rem',
          paddingBottom: '1.25rem',
          background: '#fff',
          width: '93%',
          marginLeft: '0.813rem',
          borderRadius: '1rem',
          textAlign: 'center'
        }}
      >
        {['Tab-Focus', 'Active', 'Initial', 'Turnips'].map((text, index) => (
          <ListItem
            button
            key={text}
            style={{
              background: '#EFF0F6',
              borderRadius: '1rem',
              color: '#14142B',
              fontSize: '1rem',
              fontWeight: 400,
              letterSpacing: '0.047rem',
              width: '11.375rem',
              margin: 'auto',
              marginBottom: '0.625rem',
              '&:hover': {
                boxShadow:
                  '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
              }
            }}
          >
            <ListItemIcon>
              {index % 2 === 0 ? (
                <ChevronRightOutlinedIcon />
              ) : (
                <ChevronRightOutlinedIcon />
              )}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        {/* <StyledButton
          label={"Tab-Focus"}
          style={{
            background: "#EFF0F6",
            borderRadius: "1rem",
            color: "#14142B",
            fontSize: "1rem",
            fontWeight: 400,
            letterSpacing: "0.047rem",
            width: "11.375rem",
            marginBottom: "0.625rem",
          }}
          endIcon={
            <ChevronRightOutlinedIcon
              style={{ color: "#14142B" }}
            ></ChevronRightOutlinedIcon>
          }
        ></StyledButton>
        <StyledButton
          variant="outlined"
          label={"Active"}
          style={{
            background: "#EFF0F6",
            borderRadius: "1rem",
            color: "#14142B",
            fontSize: "1rem",
            fontWeight: 400,
            letterSpacing: "0.047rem",
            width: "11.375rem",
            marginBottom: "0.625rem",
          }}
          endIcon={
            <ChevronRightOutlinedIcon
              style={{ color: "#14142B" }}
            ></ChevronRightOutlinedIcon>
          }
        ></StyledButton>
        <StyledButton
          variant="outlined"
          label={"Initial"}
          style={{
            background: "#EFF0F6",
            borderRadius: "1rem",
            color: "#14142B",
            fontSize: "1rem",
            fontWeight: 400,
            letterSpacing: "0.047rem",
            width: "11.375rem",
            marginBottom: "0.625rem",
          }}
          endIcon={
            <ChevronRightOutlinedIcon
              style={{ color: "#14142B" }}
            ></ChevronRightOutlinedIcon>
          }
        ></StyledButton>
        <StyledButton
          variant="outlined"
          label={"Turnips"}
          style={{
            background: "#EFF0F6",
            borderRadius: "1rem",
            color: "#14142B",
            fontSize: "1rem",
            fontWeight: 400,
            letterSpacing: "0.047rem",
            width: "11.375rem",
            marginBottom: "0.625rem",
          }}
        ></StyledButton> */}
      </List>
      <List
        style={{
          background: '#fff',
          width: '93%',
          marginLeft: '0.813rem',
          borderRadius: '1rem',
          marginTop: '1.25rem',
          marginBottom: '1.25rem',
          paddingTop: '1.25rem',
          paddingBottom: '1.25rem',
          textAlign: 'center'
        }}
      >
        <StyledButton
          variant='outlined'
          label={'Initial'}
          style={{
            background: '#EFF0F6',
            borderRadius: '1rem',
            color: '#14142B',
            fontSize: '1rem',
            fontWeight: 400,
            letterSpacing: '0.047rem',
            width: '11.375rem',
            marginBottom: '0.625rem'
          }}
          endIcon={
            <ChevronRightOutlinedIcon
              style={{ color: '#14142B' }}
            ></ChevronRightOutlinedIcon>
          }
        ></StyledButton>
        <StyledButton
          variant='outlined'
          label={'Turnips'}
          style={{
            background: '#EFF0F6',
            borderRadius: '1rem',
            color: '#14142B',
            fontSize: '1rem',
            fontWeight: 400,
            letterSpacing: '0.047rem',
            width: '11.375rem',
            marginBottom: '0.625rem'
          }}
        ></StyledButton>
        <StyledButton
          variant='outlined'
          label={'Broccoil'}
          style={{
            background: '#EFF0F6',
            borderRadius: '1rem',
            color: '#14142B',
            fontSize: '1rem',
            fontWeight: 400,
            letterSpacing: '0.047rem',
            width: '11.375rem',
            marginBottom: '0.625rem'
          }}
        ></StyledButton>
      </List>
    </div>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <div className={classes.root}>
      <nav className={classes.drawer} aria-label='mailbox folders'>
        <Hidden smUp implementation='css'>
          <Drawer
            container={container}
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={props.mobileOpen}
            onClose={props.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant='permanent'
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  )
}

export default StyledDrawer
