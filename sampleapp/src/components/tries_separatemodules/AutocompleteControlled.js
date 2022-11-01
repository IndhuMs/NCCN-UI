import React from "react";
import Chip from "@material-ui/core/Chip";
// import Autocomplete from "@material-ui/lab/Autocomplete";
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
const theme = createTheme();

const useStyles = makeStyles( theme => 
  createStyles({
    root: {
      width: 500,
      "& > * + *": {
        marginTop: theme.spacing(3),
      },
    },
  }
));
const userList = [
  { id: 1, name: "name 1" },
  { id: 2, name: "name 2" },
  { id: 3, name: "name 3" },
  { id: 4, name: "name 4" },
  { id: 5, name: "name 5" },
];

export default function AutocompleteControlled() {
  const theme = createTheme();
  const classes = useStyles(theme);

  const [value, setValue] = React.useState([userList[0].name]);
  const [mylist, setUserList] = React.useState("");
  console.log("value: ", value);

  return (
    <div className={classes.root}>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        multiple
        id="tags-filled"
        options={userList.map((option) => option.name)}
        freeSolo
        // renderTags={(value, getTagProps) =>
        //   value.map((option, index) => (
        //     <Chip
        //       variant="outlined"
        //       label={option}
        //       {...getTagProps({ index })}
        //     />
        //   ))
        // }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label="Users"
            placeholder="Search"
          />
        )}
      />
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        multiple="false"
        id="tags-filled"
        options={userList.map((option) => option.name)}
        freeSolo
        renderInput={(params) => (
          <TextField
            // {...params}
            variant="filled"
            label="Users"
            placeholder="Search"
          />
        )}
      />
    </div>
  );
}