import React from "react";
import { makeStyles, createStyles, fade } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { Link } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TocOutlinedIcon from "@material-ui/icons/TocOutlined";
import StyledButton from "./styledButton";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import { withSnackbar } from "notistack";
import { useCreateWarehouses } from "@/actions/warehouses";

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
    rootGrid: {
      flexGrow: 1,
      backgroundColor: "#EFF0F7",
      padding: theme.spacing(2),
      borderRadius: "1rem",
    },
    paper: {
      backgroundColor: "#fff",
      padding: theme.spacing(0),
      textAlign: "left",
      paddingLeft: "1.25rem",
      borderRadius: "1rem",
      "& .MuiPaper-elevation1": {
        boxShadow: "none",
      },
    },
    gridItem: {
      flexDirection: "column",
      flexGrow: 1,
      justifyContent: "center",
      textAlign: "center",
    },
    search: {
      height: "3.5rem",
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      left: "-40px",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#14142B",
    },
    inputRoot: {
      fontSize: "1rem",
      fontWeight: 400,
      color: "#14142B",
      letterSpacing: "0.047rem",
      lineHeight: 0,
      paddingLeft: "1.25rem",
      "& .MuiInputLabel-animated": {
        fontSize: "1rem",
        fontWeight: 400,
        color: "#14142B",
        letterSpacing: "0.047rem",
        lineHeight: 0,
        paddingLeft: "1.25rem",
        paddingTop: "0.5rem",
      },
    },
  })
);

const Warehouses = (props) => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    let code = data.code;
    let name = data.name;
    let type = data.type;
    let capacity = data.capacity;
    let items = data.items;
    let incharge = data.incharge;
    let address = data.address;
    let phone = data.phone;
    let status = data.status;
    let group = data.group;
    let image = data.image;
    let notes = data.notes;

    try {
      const { error, data } = await useCreateWarehouses(
        code,
        name,
        type,
        capacity,
        items,
        incharge,
        address,
        phone,
        status,
        group,
        image,
        notes
      );
      if (!error)
        props.enqueueSnackbar(`${JSON.stringify(data)}`, {
          variant: "success",
        });
      else
        props.enqueueSnackbar(`${JSON.stringify(data)}`, {
          variant: "error",
        });
    } catch (error) {
      props.enqueueSnackbar(
        //FIXME: Change below code before deploying to production
        `${JSON.stringify(error)}`,
        {
          variant: "error",
        }
      );
    }
  };

  const onError = (errors) => {
    if (errors) {
      props.enqueueSnackbar("Errors", {
        variant: "error",
        autoHideDuration: 10000,
      });
    }
  };
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
            Warehouse
          </Typography>
          <Typography
            style={{
              fontSize: "0.75rem",
              fontWeight: 200,
              color: "#4E4B66",
              letterSpacing: "0.047rem",
            }}
          >
            Create a warehouse
          </Typography>
        </div>
        <div style={{ float: "right" }}>
          <div
            style={{
              textAlign: "right",
              float: "left",
              marginRight: "0.313rem",
            }}
          >
            <AddOutlinedIcon
              style={{ color: "#14142B", fontSize: "1.125rem" }}
            ></AddOutlinedIcon>
          </div>
          <div style={{ textAlign: "right", float: "left" }}>
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
              Add multiple
            </Link>
          </div>
        </div>
      </Box>
      <form component="form" onSubmit={handleSubmit(onSubmit, onError)}>
        <Box style={{ marginTop: "3.438rem" }}>
          <div className={classes.rootGrid}>
            <Grid container spacing={2}>
              <Grid className={classes.gridItem} item xs={6}>
                <Paper className={classes.paper}>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <TocOutlinedIcon fontSize="large" />
                    </div>
                    <TextField
                      fullWidth
                      InputProps={{
                        disableUnderline: true,
                      }}
                      classes={{
                        root: classes.inputRoot,
                      }}
                      label={"Code"}
                      size={"small"}
                      name={"code"}
                      //FIXME:Add validation pattern
                      inputRef={register({
                        required: true,
                      })}
                      error={errors.code ? true : false}
                    />
                  </div>
                </Paper>
              </Grid>
              <Grid item className={classes.gridItem} xs={6}>
                <Paper className={classes.paper}>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <TocOutlinedIcon fontSize="large" />
                    </div>
                    <TextField
                      fullWidth
                      InputProps={{
                        disableUnderline: true,
                      }}
                      classes={{
                        root: classes.inputRoot,
                      }}
                      label={"Name"}
                      size={"small"}
                      name={"name"}
                      //FIXME:Add validation pattern
                      inputRef={register({
                        required: true,
                      })}
                      error={errors.name ? true : false}
                    />
                  </div>
                </Paper>
              </Grid>
              <Grid item className={classes.gridItem} xs={6}>
                <Paper className={classes.paper}>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <TocOutlinedIcon fontSize="large" />
                    </div>
                    <TextField
                      fullWidth
                      InputProps={{
                        disableUnderline: true,
                      }}
                      classes={{
                        root: classes.inputRoot,
                      }}
                      label={"Type"}
                      size={"small"}
                      name={"type"}
                      //FIXME:Add validation pattern
                      inputRef={register({
                        required: true,
                      })}
                      error={errors.type ? true : false}
                    />
                  </div>
                </Paper>
              </Grid>
              <Grid className={classes.gridItem} item xs={6}>
                <Paper className={classes.paper}>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <TocOutlinedIcon fontSize="large" />
                    </div>
                    <TextField
                      fullWidth
                      InputProps={{
                        disableUnderline: true,
                      }}
                      classes={{
                        root: classes.inputRoot,
                      }}
                      label={"Capacity"}
                      size={"small"}
                      name={"capacity"}
                      //FIXME:Add validation pattern
                      inputRef={register({
                        required: true,
                      })}
                      error={errors.capacity ? true : false}
                    />
                  </div>
                </Paper>
              </Grid>
              <Grid item className={classes.gridItem} xs={6}>
                <Paper className={classes.paper}>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <TocOutlinedIcon fontSize="large" />
                    </div>
                    <TextField
                      fullWidth
                      InputProps={{
                        disableUnderline: true,
                      }}
                      classes={{
                        root: classes.inputRoot,
                      }}
                      label={"Items"}
                      size={"small"}
                      name={"items"}
                      //FIXME:Add validation pattern
                      inputRef={register({
                        required: true,
                      })}
                      error={errors.items ? true : false}
                    />
                  </div>
                </Paper>
              </Grid>
              <Grid item className={classes.gridItem} xs={6}>
                <Paper className={classes.paper}>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <TocOutlinedIcon fontSize="large" />
                    </div>
                    <TextField
                      fullWidth
                      InputProps={{
                        disableUnderline: true,
                      }}
                      classes={{
                        root: classes.inputRoot,
                      }}
                      label={"In-Charge Officer"}
                      size={"small"}
                      name={"incharge"}
                      //FIXME:Add validation pattern
                      inputRef={register({
                        required: true,
                      })}
                      error={errors.incharge ? true : false}
                    />
                  </div>
                </Paper>
              </Grid>
              <Grid className={classes.gridItem} item xs={6}>
                <Paper className={classes.paper}>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <TocOutlinedIcon fontSize="large" />
                    </div>
                    <TextField
                      fullWidth
                      InputProps={{
                        disableUnderline: true,
                      }}
                      classes={{
                        root: classes.inputRoot,
                      }}
                      label={"Address"}
                      size={"small"}
                      name={"address"}
                      //FIXME:Add validation pattern
                      inputRef={register({
                        required: true,
                      })}
                      error={errors.address ? true : false}
                    />
                  </div>
                </Paper>
              </Grid>
              <Grid item className={classes.gridItem} xs={6}>
                <Paper className={classes.paper}>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <TocOutlinedIcon fontSize="large" />
                    </div>
                    <TextField
                      fullWidth
                      InputProps={{
                        disableUnderline: true,
                      }}
                      classes={{
                        root: classes.inputRoot,
                      }}
                      label={"Phone"}
                      size={"small"}
                      name={"phone"}
                      //FIXME:Add validation pattern
                      inputRef={register({
                        required: true,
                      })}
                      error={errors.phone ? true : false}
                    />
                  </div>
                </Paper>
              </Grid>
              <Grid item className={classes.gridItem} xs={6}>
                <Paper className={classes.paper}>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <TocOutlinedIcon fontSize="large" />
                    </div>
                    <TextField
                      fullWidth
                      InputProps={{
                        disableUnderline: true,
                      }}
                      classes={{
                        root: classes.inputRoot,
                      }}
                      label={"Status"}
                      size={"small"}
                      name={"status"}
                      //FIXME:Add validation pattern
                      inputRef={register({
                        required: true,
                      })}
                      error={errors.status ? true : false}
                    />
                  </div>
                </Paper>
              </Grid>
              <Grid className={classes.gridItem} item xs={6}>
                <Paper className={classes.paper}>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <TocOutlinedIcon fontSize="large" />
                    </div>
                    <TextField
                      fullWidth
                      InputProps={{
                        disableUnderline: true,
                      }}
                      classes={{
                        root: classes.inputRoot,
                      }}
                      label={"Group"}
                      size={"small"}
                      name={"group"}
                      //FIXME:Add validation pattern
                      inputRef={register({
                        required: true,
                      })}
                      error={errors.group ? true : false}
                    />
                  </div>
                </Paper>
              </Grid>
              <Grid item className={classes.gridItem} xs={6}>
                <Paper className={classes.paper}>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <TocOutlinedIcon fontSize="large" />
                    </div>
                    <TextField
                      fullWidth
                      InputProps={{
                        disableUnderline: true,
                      }}
                      classes={{
                        root: classes.inputRoot,
                      }}
                      label={"Image"}
                      size={"small"}
                      name={"image"}
                      //FIXME:Add validation pattern
                      inputRef={register({
                        required: true,
                      })}
                      error={errors.image ? true : false}
                    />
                  </div>
                </Paper>
              </Grid>
              <Grid item className={classes.gridItem} xs={6}>
                <Paper className={classes.paper}>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <TocOutlinedIcon fontSize="large" />
                    </div>
                    <TextField
                      fullWidth
                      InputProps={{
                        disableUnderline: true,
                      }}
                      classes={{
                        root: classes.inputRoot,
                      }}
                      label={"Notes"}
                      size={"small"}
                      name={"notes"}
                      //FIXME:Add validation pattern
                      inputRef={register({
                        required: true,
                      })}
                      error={errors.notes ? true : false}
                    />
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </Box>
        <div style={{ float: "right", marginTop: "1rem" }}>
          <div style={{ float: "left" }}>
            <StyledButton
              label={"Add"}
              style={{
                background: "none",
                padding: "0.25rem 1.5rem",
                color: "#5F2EEA",
                border: "0.125rem solid #5F2EEA",
                boxShadow: "none",
                marginRight: "0.625rem",
              }}
              type={"submit"}
            ></StyledButton>
          </div>
          <div style={{ float: "left" }}>
            <StyledButton
              label={"Clear"}
              style={{
                background: "none",
                padding: "0.25rem 1.5rem",
                color: "#5F2EEA",
                border: "0.125rem solid #D6D8E7",
                boxShadow: "none",
              }}
            ></StyledButton>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default withSnackbar(Warehouses);
