import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, createStyles } from "@material-ui/core/styles";

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
    rootMenu: {
      "& .MuiPaper-root": {
        width: "15%",
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
export default function SimpleMenu() {
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
        Items
      </Button>
      <Menu
        className={classes.rootMenu}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{ top: 60,left:-18 }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
