import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import NoSsr from "@material-ui/core/NoSsr";
import StyledAppBar from "@/components/ui/styledAppBar";
import StyledDrawer from "@/components/ui/styledDrawer";

const StyledNavbar = (props) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <NoSsr>
      <CssBaseline>
        <StyledAppBar
          drawerWidth={240}
          handleDrawerToggle={handleDrawerToggle}
        />
        <StyledDrawer
          drawerWidth={240}
          handleDrawerToggle={handleDrawerToggle}
          mobileOpen={mobileOpen}
        >
          {props.children}
        </StyledDrawer>
      </CssBaseline>
    </NoSsr>
  );
};

export default StyledNavbar;
