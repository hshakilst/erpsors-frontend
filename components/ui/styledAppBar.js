import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import MoreIcon from "@material-ui/icons/MoreVert";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
import TuneOutlinedIcon from "@material-ui/icons/TuneOutlined";

const StyledAppBar = (props) => {
  const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
      "& .MuiIconButton-root": {
        padding: 0,
        height: "2.375rem",
        width: "2.375rem",
      },
      "& .MuiIconButton-edgeEnd": {
        marginRight: 0,
      },
      "& .makeStyles-sectionDesktop-90": {
        paddingLeft: "500px",
      },
      "& .MuiToolbar-gutters": {
        paddingLeft: "0.75rem",
        paddingRight: "0.75rem",
      },
      "& .MuiPaper-elevation4": {
        boxShadow: "none",
      },
    },
    appBar: {
      background: "#EFF0F6",
      paddingTop: "0.625rem",
      paddingBottom: "0.625rem",
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${props.drawerWidth}px)`,
        marginLeft: props.drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      paddingTop: "0.25rem",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      // width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(0),
        width: "auto",
      },
      [theme.breakpoints.up("xs")]: {
        margin: "left",
      },
    },
    searchIcon: {
      // padding: theme.spacing(0, 2),
      fontSize: "1.563rem",
      height: "100%",
      position: "absolute",
      top: 0,
      left: "0.625rem",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#000",
      zIndex: 99,
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      paddingRight: `calc(1em + ${theme.spacing(2)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      color: "#000",
      borderRadius: "1rem",
      backgroundColor: "#EFF0F6",
      [theme.breakpoints.up("md")]: {
        width: "40ch",
      },
    },
    sectionDesktop: {
      display: "none",
      color: "#000",
      padding: 0,
      paddingBottom: 0,
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      color: "#000",
      padding: 0,
      marginLeft: "10px",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    searchBackground: {
      background: "#fff",
      lineHeight: "60px",
      paddingRight: "0.938rem",
      paddingLeft: "0.938rem",
      borderRadius: "1rem",
      display: "flex",
      flexDirection: "row",
      width: "100%",
    },
  }));

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      style={{ top: "3.25rem" }}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      style={{ top: "2.75rem" }}
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge color="primary">
            <NotificationsNoneOutlinedIcon></NotificationsNoneOutlinedIcon>
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge color="secondary">
            <MailOutlineOutlinedIcon></MailOutlineOutlinedIcon>
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge color="secondary">
            <TuneOutlinedIcon></TuneOutlinedIcon>
          </Badge>
        </IconButton>
        <p>Settings</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircleOutlinedIcon></AccountCircleOutlinedIcon>
        </IconButton>
        <p>Account</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <div className={classes.searchBackground}>
            <IconButton
              color="secondary"
              aria-label="open drawer"
              edge="start"
              onClick={props.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon
                style={{
                  color: "#000",
                  marginTop: "1.563rem",
                  marginLeft: "0.625rem",
                }}
              />
            </IconButton>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                aria-label="show 4 new mails"
                color="inherit"
                style={{
                  border: "0.063rem solid #D9DBE9",
                  borderRadius: "1rem",
                  marginRight: "0.5rem",
                  marginTop: "0.75rem",
                }}
              >
                <Badge color="secondary">
                  <NotificationsNoneOutlinedIcon></NotificationsNoneOutlinedIcon>
                </Badge>
              </IconButton>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
                style={{
                  border: "0.063rem solid #D9DBE9",
                  borderRadius: "1rem",
                  marginRight: "0.5rem",
                  marginTop: "0.75rem",
                }}
              >
                <Badge color="secondary">
                  <MailOutlineOutlinedIcon></MailOutlineOutlinedIcon>
                </Badge>
              </IconButton>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
                style={{
                  border: "0.063rem solid #D9DBE9",
                  borderRadius: "1rem",
                  marginRight: "0.5rem",
                  marginTop: "0.75rem",
                }}
              >
                <Badge color="secondary">
                  <TuneOutlinedIcon></TuneOutlinedIcon>
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                style={{
                  border: "0.063rem solid #D9DBE9",
                  borderRadius: "1rem",
                  marginTop: "0.75rem",
                }}
              >
                <AccountCircleOutlinedIcon></AccountCircleOutlinedIcon>
              </IconButton>
            </div>
            <div
              className={classes.sectionMobile}
              style={{ marginTop: "0.625rem" }}
            >
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

export default StyledAppBar;
