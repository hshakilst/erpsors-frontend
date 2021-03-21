import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import NoSsr from "@material-ui/core/NoSsr";
import StyledAppBar from "@/components/ui/styledAppBar";
import StyledDrawer from "@/components/ui/styledDrawer";
import { useRouter } from "next/router";

const StyledNavbar = (props) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const router = useRouter();
  if (router.pathname === "/login" || router.pathname === "/register")
    return null;
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
