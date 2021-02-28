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

export default function StyledAutoCompleteForm({
  onChange,
  control,
  name,
  label,
  defaultValue,
  required,
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
              required={required}
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
}
