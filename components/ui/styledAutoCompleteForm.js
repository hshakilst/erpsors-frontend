import React from "react";
// import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// import Input from "@material-ui/core/Input";
// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import ListItemText from "@material-ui/core/ListItemText";
// import Select from "@material-ui/core/Select";
// import Checkbox from "@material-ui/core/Checkbox";
// import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  // formControl: {
  //   minWidth: "100%",
  //   maxWidth: 200,
  //   "& label + .MuiInput-formControl": {
  //     marginTop: ".8rem",
  //   },
  //   "& .MuiInputLabel-formControl": {
  //     top: "0px",
  //     left: 22,
  //     position: "absolute",
  //   },
  //   "& .MuiFormLabel-root": {
  //     fontSize: "1rem",
  //     fontWeight: 400,
  //     color: "#14142B",
  //     letterSpacing: "0.047rem",
  //   },
  //   "& .MuiSelect-icon": {
  //     color: "#14142B",
  //     top: "calc(50% - 9px)",
  //     right: 0,
  //     position: "absolute",
  //   },
  //   "& .MuiSelect-select:focus": {
  //     background: "#fff",
  //   },
  //   "& .MuiInput-underline:before": {
  //     border: "none",
  //     content: "none",
  //   },
  //   "& .MuiInput-underline:after": {
  //     border: "none",
  //     content: "none",
  //   },
  //   "& .MuiMenu-list": {
  //     fontSize: "1rem",
  //     fontWeight: 400,
  //     color: "#14142B",
  //     letterSpacing: "0.047rem",
  //   },
  // },
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
    // '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
    //   flexWrap: "nowrap",
    // },
    // "& .MuiInputBase-root": {
    //   width: 10,
    // },
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
  // chips: {
  //   display: "flex",
  //   flexWrap: "wrap",
  // },
  // chip: {
  //   margin: 2,
  // },
  // noLabel: {
  //   marginTop: theme.spacing(3),
  // },
}));

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// const names = [
//   "Oliver Hansen",
//   "Van Henry",
//   "April Tucker",
//   "Ralph Hubbard",
//   "Omar Alexander",
//   "Carlos Abbott",
//   "Miriam Wagner",
//   "Bradley Wilkerson",
//   "Virginia Andrews",
//   "Kelly Snyder",
// ];

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

// export default function MultipleSelect(props) {
//   const classes = useStyles();
//   const theme = useTheme();
//   const [personName, setPersonName] = React.useState([]);

//   const handleChange = (event) => {
//     setPersonName(event.target.value);
//   };

//   const handleChangeMultiple = (event) => {
//     const { options } = event.target;
//     const value = [];
//     for (let i = 0, l = options.length; i < l; i += 1) {
//       if (options[i].selected) {
//         value.push(options[i].value);
//       }
//     }
//     setPersonName(value);
//   };

//   return (
//     <div>
//       <FormControl className={classes.formControl}>
//         <InputLabel id="demo-mutiple-checkbox-label">{props.label}</InputLabel>
//         <Select
//           labelId="demo-mutiple-checkbox-label"
//           id="demo-mutiple-checkbox"
//           multiple
//           value={personName}
//           onChange={handleChange}
//           input={<Input />}
//           renderValue={(selected) => selected.join(", ")}
//           MenuProps={MenuProps}
//           {...props}
//         >
//           {names.map((name) => (
//             <MenuItem key={name} value={name}>
//               <Checkbox checked={personName.indexOf(name) > -1} />
//               <ListItemText primary={name} />
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </div>
//   );
// }

export default function StyledAutoCompleteForm({
  onChange,
  control,
  name,
  label,
  defaultValue,
}) {
  const top100Films = [
    { name: "The Shawshank Redemption", id: 1994 },
    { name: "The Godfather", id: 1972 },
    { name: "The Godfather: Part II", id: 1974 },
    { name: "The Dark Knight", id: 2008 },
    { name: "12 Angry Men", id: 1957 },
    { name: "Schindler's List", id: 1993 },
    { name: "Pulp Fiction", id: 1994 },
    { name: "The Lord of the Rings: The Return of the King", id: 2003 },
    { name: "The Good, the Bad and the Ugly", id: 1966 },
    { name: "Fight Club", id: 1999 },
    { name: "The Lord of the Rings: The Fellowship of the Ring", id: 2001 },
    { name: "Star Wars: Episode V - The Empire Strikes Back", id: 1980 },
    { name: "Forrest Gump", id: 1994 },
    { name: "Inception", id: 2010 },
    { name: "The Lord of the Rings: The Two Towers", id: 2002 },
    { name: "One Flew Over the Cuckoo's Nest", id: 1975 },
    { name: "Goodfellas", id: 1990 },
    { name: "The Matrix", id: 1999 },
    { name: "Seven Samurai", id: 1954 },
    { name: "Star Wars: Episode IV - A New Hope", id: 1977 },
    { name: "City of God", id: 2002 },
    { name: "Se7en", id: 1995 },
    { name: "The Silence of the Lambs", id: 1991 },
    { name: "It's a Wonderful Life", id: 1946 },
    { name: "Life Is Beautiful", id: 1997 },
    { name: "The Usual Suspects", id: 1995 },
    { name: "Léon: The Professional", id: 1994 },
    { name: "Spirited Away", id: 2001 },
    { name: "Saving Private Ryan", id: 1998 },
    { name: "Once Upon a Time in the West", id: 1968 },
    { name: "American History X", id: 1998 },
    { name: "Interstellar", id: 2014 },
    { name: "Casablanca", id: 1942 },
    { name: "City Lights", id: 1931 },
    { name: "Psycho", id: 1960 },
    { name: "The Green Mile", id: 1999 },
    { name: "The Intouchables", id: 2011 },
    { name: "Modern Times", id: 1936 },
    { name: "Raiders of the Lost Ark", id: 1981 },
    { name: "Rear Window", id: 1954 },
    { name: "The Pianist", id: 2002 },
    { name: "The Departed", id: 2006 },
    { name: "Terminator 2: Judgment Day", id: 1991 },
    { name: "Back to the Future", id: 1985 },
    { name: "Whiplash", id: 2014 },
    { name: "Gladiator", id: 2000 },
    { name: "Memento", id: 2000 },
    { name: "The Prestige", id: 2006 },
    { name: "The Lion King", id: 1994 },
    { name: "Apocalypse Now", id: 1979 },
    { name: "Alien", id: 1979 },
    { name: "Sunset Boulevard", id: 1950 },
    {
      name:
        "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
      id: 1964,
    },
    { name: "The Great Dictator", id: 1940 },
    { name: "Cinema Paradiso", id: 1988 },
    { name: "The Lives of Others", id: 2006 },
    { name: "Grave of the Fireflies", id: 1988 },
    { name: "Paths of Glory", id: 1957 },
    { name: "Django Unchained", id: 2012 },
    { name: "The Shining", id: 1980 },
    { name: "WALL·E", id: 2008 },
    { name: "American Beauty", id: 1999 },
    { name: "The Dark Knight Rises", id: 2012 },
    { name: "Princess Mononoke", id: 1997 },
    { name: "Aliens", id: 1986 },
    { name: "Oldboy", id: 2003 },
    { name: "Once Upon a Time in America", id: 1984 },
    { name: "Witness for the Prosecution", id: 1957 },
    { name: "Das Boot", id: 1981 },
    { name: "Citizen Kane", id: 1941 },
    { name: "North by Northwest", id: 1959 },
    { name: "Vertigo", id: 1958 },
    { name: "Star Wars: Episode VI - Return of the Jedi", id: 1983 },
    { name: "Reservoir Dogs", id: 1992 },
    { name: "Braveheart", id: 1995 },
    { name: "M", id: 1931 },
    { name: "Requiem for a Dream", id: 2000 },
    { name: "Amélie", id: 2001 },
    { name: "A Clockwork Orange", id: 1971 },
    { name: "Like Stars on Earth", id: 2007 },
    { name: "Taxi Driver", id: 1976 },
    { name: "Lawrence of Arabia", id: 1962 },
    { name: "Double Indemnity", id: 1944 },
    { name: "Eternal Sunshine of the Spotless Mind", id: 2004 },
    { name: "Amadeus", id: 1984 },
    { name: "To Kill a Mockingbird", id: 1962 },
    { name: "Toy Story 3", id: 2010 },
    { name: "Logan", id: 2017 },
    { name: "Full Metal Jacket", id: 1987 },
    { name: "Dangal", id: 2016 },
    { name: "The Sting", id: 1973 },
    { name: "2001: A Space Odyssey", id: 1968 },
    { name: "Singin' in the Rain", id: 1952 },
    { name: "Toy Story", id: 1995 },
    { name: "Bicycle Thieves", id: 1948 },
    { name: "The Kid", id: 1921 },
    { name: "Inglourious Basterds", id: 2009 },
    { name: "Snatch", id: 2000 },
    { name: "3 Idiots", id: 2009 },
    { name: "Monty Python and the Holy Grail", id: 1975 },
  ];
  const classes = useStyles();
  return (
    <Controller
      render={(props) => (
        <Autocomplete
          {...props}
          id="country-select-demo"
          options={top100Films}
          autoHighlight
          getOptionLabel={(option) => option.name}
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
    />
  );
}
