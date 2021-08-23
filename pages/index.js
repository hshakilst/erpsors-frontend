import React from "react";
import { makeStyles, createStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import BaseLayout from "@/components/layouts/baseLayout";
import StyledButton from "@/components/ui/styledButton";
import { Divider, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import Link from "next/link";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.grey.inputBackground,
      padding: theme.spacing(1.5),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      paddingTop: "1rem",
      paddingBottom: "1rem",
      borderRadius: "1rem",
      "& .MuiPaper-root": {
        boxShadow: "none",
      },
    },
    gridItem: {
      flexDirection: "column",
      flexGrow: 1,
      justifyContent: "center",
      textAlign: "center",
    },
  })
);

const Index = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  const router = useRouter();

  return null;
};

export const getServerSideProps = ({ req, res }) => {
  const { getSession } = require("@auth0/nextjs-auth0");
  const session = getSession(req, res);
  if (session?.user) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
  return {
    redirect: {
      destination: "/api/auth/login",
      permanent: true,
    },
  };
};
export default Index;
