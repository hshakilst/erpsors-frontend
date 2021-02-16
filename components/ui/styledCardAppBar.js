import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import TuneOutlinedIcon from "@material-ui/icons/TuneOutlined";
import ImportExportOutlinedIcon from "@material-ui/icons/ImportExportOutlined";
import HeightOutlinedIcon from "@material-ui/icons/HeightOutlined";

const StyledCardAppBar = (props) => {
  const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
      "& .MuiIconButton-root": {
        padding: 0,
        height: "2.5rem",
        width: "2.5rem",
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
      [theme.breakpoints.up("md")]: {
        width: `calc(100% - ${props.drawerWidth}px)`,
        marginLeft: props.drawerWidth,
        "& .MuiToolbar-regular": {
          minHeight: 0,
        },
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    search: {
      height: "2.5rem",
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
    },
    searchIcon: {
      height: "100%",
      position: "absolute",
      top: "0.563rem",
      left: "0.625rem",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#A0A3BD",
      zIndex: 99,
      "& .MuiSvgIcon-root": {
        fontSize: "1.8rem",
      },
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      height: "2.5rem",
      padding: theme.spacing(1, 2, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(3)}px)`,
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
      "& .MuiIconButton-root": {
        padding: 0,
        height: "2.5rem",
        width: "2.5rem",
        justifyContent: "center",
      },
      "&:hover": {
        "& .MuiGrid-item": {
          backgroundColor: "#fff",
        },
      },
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      color: "#000",
      "& .MuiIconButton-root": {
        padding: 0,
        height: "2.5rem",
        width: "2.5rem",
        justifyContent: "end",
      },
      "&:hover": {
        "& .MuiGrid-item": {
          backgroundColor: "#fff",
        },
      },
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
      // "& .MuiIconButton-label": {
      //   marginRight: "2rem",
      // },
    },
    sectionMobileBorder: {
      height: "2.8rem",
      width: "2.8rem",
      border: "0.063rem solid #D9DBE9",
      borderRadius: "1rem",
      marginRight: "0.5rem",
    },
  }));

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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
          <Badge color="secondary">
            <ImportExportOutlinedIcon></ImportExportOutlinedIcon>
          </Badge>
        </IconButton>
        <p>Export</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge color="secondary">
            <HeightOutlinedIcon></HeightOutlinedIcon>
          </Badge>
        </IconButton>
        <p>Fullscreen</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge color="secondary">
            <TuneOutlinedIcon></TuneOutlinedIcon>
          </Badge>
        </IconButton>
        <p>Settings</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <div className={classes.searchBackground}>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                aria-label="show 4 new mails"
                color="inherit"
                style={{
                  border: "0.063rem solid #D9DBE9",
                  borderRadius: "1rem",
                  marginRight: ".5rem",
                  marginTop: "0.5rem",
                }}
              >
                <Badge color="primary">
                  <ImportExportOutlinedIcon></ImportExportOutlinedIcon>
                </Badge>
              </IconButton>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
                style={{
                  border: "0.063rem solid #D9DBE9",
                  borderRadius: "1rem",
                  marginRight: ".5rem",
                  marginTop: "0.5rem",
                }}
              >
                <Badge color="secondary">
                  <HeightOutlinedIcon></HeightOutlinedIcon>
                </Badge>
              </IconButton>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
                style={{
                  border: "0.063rem solid #D9DBE9",
                  borderRadius: "1rem",
                  marginTop: "0.5rem",
                }}
              >
                <Badge color="secondary">
                  <TuneOutlinedIcon></TuneOutlinedIcon>
                </Badge>
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <div className={classes.sectionMobileBorder}>
                  <MoreIcon
                    style={{
                      margin: "auto",
                      fontSize: "2.3rem",
                      paddingTop: "0.313rem",
                    }}
                  />
                </div>
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

export default StyledCardAppBar;
