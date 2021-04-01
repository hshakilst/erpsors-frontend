import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import StyledAccordion from "@/components/ui/styledAccordion";
import Link from "next/link";

const StyledDrawer = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      zIndex: 1030,
      backgroundColor: "#fff",
      "& .MuiList-padding": {
        paddingTop: 0,
        paddingBottom: "0px",
      },
      // "& .MuiTypography-h6": {
      //   fontSize: "2rem",
      //   fontWeight: 800,
      // },
      // "& .MuiSvgIcon-fontSizeLarge": {
      //   fontSize: "3rem",
      //   color: "#14142B",
      // },
      // "& .MuiList-padding": {
      //   paddingTop: 0,
      // },
      // "& .makeStyles-drawerPaper-33": {
      //   background: "#EFF0F6",
      // },
      "& .MuiDrawer-paper": {
        backgroundColor: "#EFF0F6",
        flexDirection: "none",
        zIndex: 1030,
      },
      "& .MuiDrawer-paperAnchorDockedLeft": {
        border: "none",
      },
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: props.drawerWidth,
        flexShrink: 0,
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: props.drawerWidth,
    },
    listIcon: {
      minWidth: 8,
    },
  }));

  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();

  const drawer = (
    <div style={{ backgroundColor: "#EFF0F6" }}>
      <List>
        {[
          <Typography
            variant="h4"
            component="h1"
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              letterSpacing: "0.063rem",
              color: "#14142B",
              paddingTop: "0.625rem",
              paddingBottom: "0.625rem",
            }}
          >
            ERPSORS
          </Typography>,
        ].map((text, index) => (
          <ListItem key={index}>
            <ListItemIcon style={{ minWidth: 56 }}>
              {
                <LocalMallOutlinedIcon
                  fontSize={"large"}
                  style={{ fontSize: "3rem", color: "#14142B" }}
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
          marginTop: "0.75rem",
          paddingTop: "1.25rem",
          paddingBottom: "1.25rem",
          background: "#fff",
          width: "93%",
          marginLeft: "0.813rem",
          borderRadius: "1rem",
          textAlign: "center",
        }}
      >
        <StyledAccordion label={"Dashboard"}>
          <List
            style={{
              width: "100%",
              background: "#EFF0F6",
              borderRadius: "1rem",
              paddingTop: "1rem",
              paddingBottom: "1rem",
              paddingRight: "1rem",
              paddingLeft: "1rem",
            }}
          >
            <ListItem>
              <ListItemText
                primary={
                  <Link href="/dashboard">
                    <a>
                      <Typography
                        style={{
                          color: "#14142B",
                          fontSize: "1rem",
                          fontWeight: 400,
                          letterSpacing: "0.047rem",
                        }}
                      >
                        Overview
                      </Typography>
                    </a>
                  </Link>
                }
              />
            </ListItem>
          </List>
        </StyledAccordion>
        <StyledAccordion label={"Inventory"}>
          <List
            style={{
              width: "100%",
              background: "#EFF0F6",
              borderRadius: "1rem",
              paddingTop: "1rem",
              paddingBottom: "1rem",
              paddingRight: "1rem",
              paddingLeft: "1rem",
            }}
          >
            <ListItem>
              <ListItemText
                primary={
                  <Link href="/inventory">
                    <a>
                      <Typography
                        style={{
                          color: "#14142B",
                          fontSize: "1rem",
                          fontWeight: 400,
                          letterSpacing: "0.047rem",
                        }}
                      >
                        Overview
                      </Typography>
                    </a>
                  </Link>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <Link href="/inventory/items">
                    <a>
                      <Typography
                        style={{
                          color: "#14142B",
                          fontSize: "1rem",
                          fontWeight: 400,
                          letterSpacing: "0.047rem",
                        }}
                      >
                        Items
                      </Typography>
                    </a>
                  </Link>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <Link href="/inventory/suppliers">
                    <a>
                      <Typography
                        style={{
                          color: "#14142B",
                          fontSize: "1rem",
                          fontWeight: 400,
                          letterSpacing: "0.047rem",
                        }}
                      >
                        Suppliers
                      </Typography>
                    </a>
                  </Link>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <Link href="/inventory/warehouses">
                    <a>
                      <Typography
                        style={{
                          color: "#14142B",
                          fontSize: "1rem",
                          fontWeight: 400,
                          letterSpacing: "0.047rem",
                        }}
                      >
                        Warehouses
                      </Typography>
                    </a>
                  </Link>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <Link href="/inventory/store-requisitions">
                    <a>
                      <Typography
                        style={{
                          color: "#14142B",
                          fontSize: "1rem",
                          fontWeight: 400,
                          letterSpacing: "0.047rem",
                        }}
                      >
                        Requisitions
                      </Typography>
                    </a>
                  </Link>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <Link href="/inventory/purchase-orders">
                    <a>
                      <Typography
                        style={{
                          color: "#14142B",
                          fontSize: "1rem",
                          fontWeight: 400,
                          letterSpacing: "0.047rem",
                        }}
                      >
                        Purchases
                      </Typography>
                    </a>
                  </Link>
                }
              />
            </ListItem>

            <ListItem>
              <ListItemText
                primary={
                  <Link href="/inventory/store-receipts">
                    <a>
                      <Typography
                        style={{
                          color: "#14142B",
                          fontSize: "1rem",
                          fontWeight: 400,
                          letterSpacing: "0.047rem",
                        }}
                      >
                        Receipts
                      </Typography>
                    </a>
                  </Link>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <Link href="/inventory/store-issues">
                    <a>
                      <Typography
                        style={{
                          color: "#14142B",
                          fontSize: "1rem",
                          fontWeight: 400,
                          letterSpacing: "0.047rem",
                        }}
                      >
                        Issues
                      </Typography>
                    </a>
                  </Link>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <Link href="/inventory/reports">
                    <a>
                      <Typography
                        style={{
                          color: "#14142B",
                          fontSize: "1rem",
                          fontWeight: 400,
                          letterSpacing: "0.047rem",
                        }}
                      >
                        Reports
                      </Typography>
                    </a>
                  </Link>
                }
              />
            </ListItem>
          </List>
        </StyledAccordion>
        <StyledAccordion label={"Production"}></StyledAccordion>
      </List>
      <List
        style={{
          background: "#fff",
          width: "93%",
          marginLeft: "0.813rem",
          borderRadius: "1rem",
          marginTop: "1.25rem",
          marginBottom: "1.25rem",
          paddingTop: "1.25rem",
          paddingBottom: "1.25rem",
          textAlign: "center",
        }}
      >
        <StyledAccordion label={"Account"}></StyledAccordion>
        <StyledAccordion label={"Settings"}></StyledAccordion>
        <StyledAccordion label={"Logout"}></StyledAccordion>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={props.mobileOpen}
            onClose={props.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};

export default StyledDrawer;
