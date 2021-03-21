import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Controller } from "react-hook-form";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    fontSize: "1rem",
    fontWeight: 400,
    color: "#14142B",
    letterSpacing: "0.047rem",
    lineHeight: 0,
    paddingTop: "0.5rem",
    paddingLeft: "1.25rem",
    marginLeft: "-0.75rem",
    width: "100%",
    flexWrap: "nowrap",
    "& .MuiInputLabel-animated": {
      fontSize: "1rem",
      fontWeight: 400,
      color: "#14142B",
      letterSpacing: "0.047rem",
      lineHeight: 0,
      paddingLeft: "1.25rem",
      paddingTop: "1rem",
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderStyle: "none",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      // borderColor: "transparent",
      borderStyle: "none",
    },
    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] .MuiAutocomplete-endAdornment': {
      right: "-0.75rem",
    },
    "& .MuiIconButton-root": { color: "#14142B" },
  },
}));

const StyledAutoCompleteForm = ({
  control,
  name,
  label,
  defaultValue,
  required,
  fetchOptions,
}) => {
  const classes = useStyles();
  const { data, error, loading } = fetchOptions();
  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    if (data) {
      if (data !== options) setOptions(data);
    }
  }, [data]);

  return (
    <Controller
      render={(props) => (
        <Autocomplete
          {...props}
          options={options}
          loading={loading}
          autoHighlight
          getOptionLabel={(option) =>
            `${option.code}${option.name ? " : " + option.name : ""}`
          }
          getOptionSelected={(option, value) => option.id === value.id} //FIXME:"Change equality condition to check id"
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant="outlined"
              fullWidth
              size="small"
              classes={{
                root: classes.inputRoot,
              }}
              inputProps={{
                ...params.inputProps,
                autoComplete: "disabled", // disable autocomplete and autofill
              }}
              required={required}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
          //TODO:"Render option menu
          // renderOption={(option, { selected }) => (
          //   <React.Fragment>
          //     <Checkbox
          //       icon={icon}
          //       checkedIcon={checkedIcon}
          //       style={{ marginRight: 8 }}
          //       checked={selected}
          //     />
          //     {option.label} ({option.code}) +{option.phone}
          //   </React.Fragment>
          // )}

          //TODO:"Render input field
          // renderTags={(value, getTagProps) =>
          //   value.map((option, index) => (
          //     <Chip
          //       variant="outlined"
          //       label={option}
          //       {...getTagProps({ index })}
          //     />
          //   ))
          // }
          onChange={(_, data) => props.onChange(data)}
        />
      )}
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{ required: required }}
    />
  );
};

export default StyledAutoCompleteForm;
