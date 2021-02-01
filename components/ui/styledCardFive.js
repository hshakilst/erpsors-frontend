import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { Link } from "@material-ui/core";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
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

export default function RecipeReviewCard() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Box>
        <div style={{ float: "left", textAlign: "left" }}>
          <Typography
            style={{
              fontSize: "1.125rem",
              fontWeight: 400,
              color: "#14142B",
              letterSpacing: "0.047rem",
            }}
          >
            History
          </Typography>
          <Typography
            style={{
              fontSize: "0.75rem",
              fontWeight: 200,
              color: "#4E4B66",
              letterSpacing: "0.047rem",
            }}
          >
            Today
          </Typography>
        </div>
        <div style={{ textAlign: "right" }}>
          <Link
            component="button"
            variant="body2"
            style={{
              fontWeight: 500,
              fontSize: "0.875rem",
              color: "#5F2EEA",
              letterSpacing: "0.063rem",
            }}
            onClick={() => {
              console.info("I'm a button.");
            }}
          >
            View all
          </Link>
        </div>
      </Box>
      <Box
        style={{
          backgroundColor: "#EFF0F7",
          marginTop: "2.5rem",
          borderRadius: "1rem",
          padding: "1rem",
          textAlign: "left",
        }}
      >
        <div style={{ marginBottom: "8.2rem" }}>
          <ul>
            <li>
              <Typography
                style={{
                  color: "#6E7191",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.016rem",
                  lineHeight: "1rem",
                  paddingBottom: "1rem",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Typography>
              <Typography
                style={{
                  color: "#6E7191",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.016rem",
                  lineHeight: "1rem",
                  paddingBottom: "1rem",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Typography>
              <Typography
                style={{
                  color: "#6E7191",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.016rem",
                  lineHeight: "1rem",
                  paddingBottom: "1rem",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Typography>
              <Typography
                style={{
                  color: "#6E7191",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.016rem",
                  lineHeight: "1rem",
                  paddingBottom: "1rem",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Typography>
            </li>
          </ul>
        </div>
      </Box>
    </Card>
  );
}
