import React from "react";
import { makeStyles, createStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { Link, List, ListItem } from "@material-ui/core";
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

export default function StyledInventoryHistory(props) {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Box>
        <div style={{ float: "left", textAlign: "left" }}>
          <Typography
            style={{
              fontSize: "1.125rem",
              fontWeight: 400,
              color: theme.palette.grey.title,
              letterSpacing: "0.047rem",
            }}
          >
            History
          </Typography>
          <Typography
            style={{
              fontSize: "0.75rem",
              fontWeight: 200,
              color: theme.palette.grey.body,
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
              color: theme.palette.primary.main,
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
          backgroundColor: theme.palette.grey.inputBackground,
          marginTop: "2.5rem",
          borderRadius: "1rem",
          padding: "1rem",
          textAlign: "left",
        }}
      >
        <div style={props.style}>
          <List>
            <ListItem>
              <Typography
                style={{
                  color: theme.palette.grey.label,
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.016rem",
                  lineHeight: "1rem",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography
                style={{
                  color: theme.palette.grey.label,
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.016rem",
                  lineHeight: "1rem",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography
                style={{
                  color: theme.palette.grey.label,
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.016rem",
                  lineHeight: "1rem",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Typography>
            </ListItem>

            <ListItem>
              <Typography
                style={{
                  color: theme.palette.grey.label,
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.016rem",
                  lineHeight: "1rem",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Typography>
            </ListItem>
          </List>
        </div>
      </Box>
    </Card>
  );
}
