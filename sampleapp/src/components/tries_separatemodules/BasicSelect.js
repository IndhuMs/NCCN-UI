import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
//Component to test out 
export default function BasicSelect() {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={nodeLabels}
      sx={{ width: 300 }}
      onChange={(event, value) => console.log(value)} 
      renderInput={(params) => <TextField {...params} label="Node Label/Type" />}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const nodeLabels = [
  { label: 'Decision Node', year: 1994 },
  { label: 'Treatment option', year: 1994 },
  { label: 'Ambiguity', year: 1994 },
];
