import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
//Component to test out Styling
export default function StylingMatUI()
{
    return (
        <Box display="flex" justifyContent="center">
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={nodeLabels}
                sx={{ width: 300 }}
                onChange={(event, value) => console.log(value)} 
                renderInput={(params) => <TextField {...params} label="Node Label/Type" />}
                />
            {/* <Button>Button Aligned To The Right</Button> */}
        </Box>
    );
}
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const nodeLabels = [
    { label: 'Decision Node', year: 1994 },
    { label: 'Treatment option', year: 1994 },
    { label: 'Ambiguity', year: 1994 },
  ];