import React from "react";
import StyledNavbar from "@/components/navigation/styledNavbar";
import { Typography } from "@material-ui/core";
import { useAuth } from "@/libs/auth";
import BaseLayout from "@/components/layouts/baseLayout";

const Index = () => {
  const auth = useAuth();
  return (
    <BaseLayout className="dashboard">
      <h1>Welcome to index page!</h1>
      <h3>{JSON.stringify(auth.user)}</h3>
    </BaseLayout>
  );
};

export default Index;
