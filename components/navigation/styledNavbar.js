import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import NoSsr from "@material-ui/core/NoSsr";
import StyledAppBar from "@/components/navigation/styledAppBar";
import StyledDrawer from "@/components/navigation/styledDrawer";
import { useRouter } from "next/router";
import { useTheme } from "@material-ui/core/styles";

const StyledNavbar = (props) => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const router = useRouter();
  if (
    router.pathname?.split("/")[1] === "dashboard" ||
    router.pathname?.split("/")[1] === "inventory"
  )
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
  return null;
};

export default StyledNavbar;
