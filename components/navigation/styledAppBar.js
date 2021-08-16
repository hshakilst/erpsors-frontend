import React from "react";
import { alpha, makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
import TuneOutlinedIcon from "@material-ui/icons/TuneOutlined";
import { Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import StyledAvatar from "@/components/ui/styledAvatar";

const StyledAppBar = (props) => {
  const theme = useTheme();
  const useStyles = makeStyles((theme) => ({
    grow: {
      zIndex: 1030,
      flexGrow: 1,
      "& .MuiIconButton-root": {
        padding: 0,
        height: "2.375rem",
        width: "2.375rem",
        zIndex: 1030,
      },
      "& .MuiIconButton-edgeEnd": {
        marginRight: 0,
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
      background: theme.palette.grey.inputBackground,
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
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(4),
      marginLeft: 0,
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(0),
        width: "auto",
      },
      [theme.breakpoints.up("xs")]: {
        margin: "left",
      },
    },
    searchIcon: {
      fontSize: "1.563rem",
      height: "100%",
      position: "absolute",
      top: 0,
      left: "0.625rem",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: theme.palette.secondary.contrastText,
      zIndex: 1030,
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
      color: theme.palette.secondary.contrastText,
      borderRadius: "1rem",
      backgroundColor: theme.palette.grey.inputBackground,
      [theme.breakpoints.up("md")]: {
        width: "40ch",
      },
    },
    sectionDesktop: {
      right: "28px",
      zIndex: 1030,
      display: "none",
      color: theme.palette.secondary.contrastText,
      padding: 0,
      paddingBottom: 0,
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      color: theme.palette.secondary.contrastText,
      padding: 0,
      marginLeft: "10px",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    sectionMobileBorder: {
      height: "2.3rem",
      width: "2.3rem",
      border: "0.063rem solid #D9DBE9",
      borderRadius: "1rem",
    },
    searchBackground: {
      background: theme.palette.grey.background,
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

  const router = useRouter();
  const { user } = useUser();

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
      <Typography style={{ textAlign: "center", fontWeight: 600 }}>
        {user.nickname}
      </Typography>
      <Divider />
      <MenuItem style={{ textAlign: "center" }} onClick={handleMenuClose}>
        My Profile
      </MenuItem>
      <MenuItem
        style={{ textAlign: "center" }}
        onClick={() => {
          router.push("/api/auth/logout");
          handleMenuClose();
        }}
      >
        Log Out
      </MenuItem>
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
      <MenuItem style={{ textAlign: "center" }}>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge color="secondary">
            <NotificationsNoneOutlinedIcon></NotificationsNoneOutlinedIcon>
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem style={{ textAlign: "center" }}>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge color="secondary">
            <MailOutlineOutlinedIcon></MailOutlineOutlinedIcon>
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem style={{ textAlign: "center" }}>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge color="secondary">
            <TuneOutlinedIcon></TuneOutlinedIcon>
          </Badge>
        </IconButton>
        <p>Settings</p>
      </MenuItem>
      <MenuItem style={{ textAlign: "center" }} onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <StyledAvatar
            image={user.picture}
            text={user.name || user.nickname}
            style={{
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: theme.palette.grey.line,
            }}
          />
        </IconButton>
        <p>{user.name || user.nickname}</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <div className={classes.searchBackground}>
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={props.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon
                style={{
                  color: theme.palette.secondary.contrastText,
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
                <Badge color="primary">
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
                <StyledAvatar
                  image={user.picture}
                  text={user.name || user.nickname}
                  style={{
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: theme.palette.grey.line,
                  }}
                />
              </IconButton>
            </div>
            <div
              className={classes.sectionMobile}
              style={{
                marginTop: ".95rem",
                position: "absolute",
                right: "20px",
              }}
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

export default withPageAuthRequired(StyledAppBar);
