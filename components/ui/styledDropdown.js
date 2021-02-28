import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "&:hover": {
        background: "#EFF0F6",
      },
      "& .MuiButton-label": {
        justifyContent: "left",
      },
    },
    rootIcon: {
      marginLeft: "1.25rem",
      fontSize: "2rem",
      color: "#14142B",
      [theme.breakpoints.up("xs")]: {
        marginLeft: theme.spacing(6),
      },
      [theme.breakpoints.down("xs")]: {
        marginLeft: theme.spacing(6),
      },
    },
    rootMenu: {
      "& .MuiPaper-root": {
        backgroundColor: "#EFF0F6",
        borderRadius: "1rem",
        fontSize: "1rem",
        fontWeight: 400,
        color: "#14142B",
        letterSpacing: "0.047rem",
      },
    },
  })
);

export default function Dropdown() {
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
          color: "#14142B",
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
