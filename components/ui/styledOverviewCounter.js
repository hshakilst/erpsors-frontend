import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Link } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import KeyboardArrowUpOutlinedIcon from "@material-ui/icons/KeyboardArrowUpOutlined";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {

    },
    media: {
      height: 0,
      paddingTop: "56.25%",
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
  })
);

export default function StyledOverviewCounter() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Typography
        style={{
          fontSize: "1.125rem",
          fontWeight: 400,
          color: "#14142B",
          letterSpacing: "0.047rem",
          marginBottom: "1rem",
        }}
      >
        Salary Paid
      </Typography>
      <Box
        style={{
          backgroundColor: "#EFF0F7",
          borderRadius: "1rem",
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",
          marginBottom: "1rem",
        }}
      >
        <Typography
          style={{
            fontSize: "1.125rem",
            fontWeight: 500,
            color: "#4E4B66",
            letterSpacing: "0.047rem",
          }}
        >
          ট 25000 K
        </Typography>
      </Box>
      <Box style={{textAlign:"right"}}>
        <Link
          component="button"
          variant="body2"
          style={{
            fontWeight: 200,
            fontSize: "0.75rem",
            color: "#4E4B66",
            letterSpacing: "0.063rem",
            paddingRight: "0.313rem",
          }}
          onClick={() => {
            console.info("I'm a button.");
          }}
        >
          Since last month
        </Link>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={
            <KeyboardArrowUpOutlinedIcon
              fontSize={"small"}
              style={{
                color: "#00BA88",
              }}
            />
          }
          style={{
            backgroundColor: "#EFF0F7",
            borderRadius: "1rem",
            boxShadow: "none",
          }}
        >
          <Typography
            style={{
              fontWeight: 500,
              fontSize: "0.688rem",
              color: "#00BA88",
              letterSpacing: "0.063rem",
              display: "inline-block",
            }}
          >
            290%
          </Typography>
        </Button>
      </Box>
    </Card>
  );
}
