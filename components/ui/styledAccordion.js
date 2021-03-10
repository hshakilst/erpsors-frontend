import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import StyledButton from "./styledButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
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
    "& .MuiIconButton-root": {
      padding: 0,
      position: "absolute",
      top: 10,
      right: 50,
    },
    "& .MuiTypography-body1": {
      margin: "auto",
      textAlign: "center",
    },
  },
}));

export default function SimpleAccordion(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: "#14142B" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <StyledButton
            variant="outlined"
            label={props.label}
            style={{
              position: "relative",
              background: "#EFF0F6",
              borderRadius: "1rem",
              color: "#14142B",
              fontSize: "1rem",
              fontWeight: 400,
              letterSpacing: "0.047rem",
              width: "11.375rem",
              marginBottom: "0.625rem",
            }}
          ></StyledButton>
        </AccordionSummary>
        <AccordionDetails>{props.children}</AccordionDetails>
      </Accordion>
    </div>
  );
}
