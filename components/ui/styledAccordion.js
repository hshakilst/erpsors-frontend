import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import StyledButton from "./styledButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& .MuiAccordionSummary-content": {
      margin: 0,
      display: "inline-block",
    },
    "& .MuiAccordion-root.Mui-expanded": {
      margin: 0,
    },
    "& .MuiAccordion-root:before": {
      backgroundColor: "#fff",
    },
    "& .MuiAccordionSummary-root.Mui-expanded": {
      minHeight: 0,
    },
    "& .MuiPaper-elevation1": {
      boxShadow: "none",
    },
    "& .MuiButton-outlinedPrimary": {
      border: "none",
    },
    "& .MuiButton-outlined": {
      border: "none",
    },
  },
}));

export default function SimpleAccordion(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary>
          <StyledButton
            variant="outlined"
            label={props.label}
            style={{
              background: "#EFF0F6",
              borderRadius: "1rem",
              color: "#14142B",
              fontSize: "1rem",
              fontWeight: 400,
              letterSpacing: "0.047rem",
              width: "11.375rem",
              marginBottom: "0.625rem",
            }}
            endIcon={props.endIcon}
          ></StyledButton>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            style={{
              background: "#EFF0F6",
              borderRadius: "1rem",
              color: "#14142B",
              fontSize: "1rem",
              fontWeight: 400,
              letterSpacing: "0.047rem",
              padding: "1rem",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
