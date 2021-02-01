import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { Link } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
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
            Tasks
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
        }}
      >
        <Box
          style={{
            paddingTop: "1.25rem",
            paddingBottom: "1.25rem",
            paddingLeft: "1rem",
            paddingRight: "1rem",
          }}
        >
          <div>
            <div style={{ float: "left", textAlign: "left" }}>
              <CheckCircleOutlineOutlinedIcon
                style={{ fontSize: "1.375rem" }}
              ></CheckCircleOutlineOutlinedIcon>
            </div>
            <div style={{ float: "left", textAlign: "left" }}>
              <Typography
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 400,
                  color: "#6E7191",
                  letterSpacing: "0.047rem",
                  display: "inline-block",
                  paddingLeft: "0.5rem",
                }}
              >
                Broccoli
              </Typography>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={
                <LocalOfferOutlinedIcon
                  fontSize={"small"}
                  style={{
                    color: "#00966D",
                  }}
                />
              }
              style={{
                backgroundColor: "#F3FDFA",
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
          </div>
        </Box>
        <Box
          style={{
            paddingTop: "1.25rem",
            paddingBottom: "1.25rem",
            paddingLeft: "1rem",
            paddingRight: "1rem",
          }}
        >
          <div>
            <div style={{ float: "left", textAlign: "left" }}>
              <CheckCircleOutlineOutlinedIcon
                style={{ fontSize: "1.375rem",color:"blue" }}
              ></CheckCircleOutlineOutlinedIcon>
            </div>
            <div style={{ float: "left", textAlign: "left" }}>
              <Typography
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 400,
                  color: "#6E7191",
                  letterSpacing: "0.047rem",
                  display: "inline-block",
                  paddingLeft: "0.5rem",
                }}
              >
                Broccoli
              </Typography>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={
                <LocalOfferOutlinedIcon
                  fontSize={"small"}
                  style={{
                    color: "#00966D",
                  }}
                />
              }
              style={{
                backgroundColor: "#FFF4DF",
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
          </div>
        </Box>
      </Box>
    </Card>
  );
}
