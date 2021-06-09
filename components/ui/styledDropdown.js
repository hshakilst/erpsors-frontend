import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, createStyles, useTheme } from "@material-ui/core/styles";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "&:hover": {
        background: theme.palette.grey.inputBackground,
      },
      "& .MuiButton-label": {
        justifyContent: "left",
      },
    },
    rootIcon: {
      marginLeft: "1.25rem",
      fontSize: "2rem",
      color: theme.palette.grey.title,
      [theme.breakpoints.up("xs")]: {
        marginLeft: theme.spacing(6),
      },
      [theme.breakpoints.down("xs")]: {
        marginLeft: theme.spacing(6),
      },
    },
    rootMenu: {
      "& .MuiPaper-root": {
        backgroundColor: theme.palette.grey.inputBackground,
        borderRadius: "1rem",
        fontSize: "1rem",
        fontWeight: 400,
        color: theme.palette.grey.title,
        letterSpacing: "0.047rem",
      },
    },
  })
);

export default function Dropdown() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  return (
    <div>
      <Button
        className={classes.root}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{
          fontSize: "1rem",
          fontWeight: 400,
          color: theme.palette.grey.title,
          letterSpacing: "0.047rem",
          textTransform: "capitalize",
          paddingTop: "0.125rem",
          width: "70%",
        }}
      >
        <KeyboardArrowDownIcon
          className={classes.rootIcon}
        ></KeyboardArrowDownIcon>
      </Button>
      <Menu
        className={classes.rootMenu}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{ top: 60, left: -18 }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
