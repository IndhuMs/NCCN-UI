import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Breadcrumbs} from '@mui/material';
import { Link } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';


  const top100Films = () => [
    { title: 'symptom1', year: 1994 },
    { title: 'symptom2', year: 1972 },
    { title: 'symptom3', year: 1974 },
    { title: 'symptom4', year: 2008 }
  ];

export default function ToggleButtons() {

  const [alig, Alignment] = React.useState('lev1');

  const handle = (event, newAlignment) => {
    Alignment(newAlignment);
  };
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
   <html>
    <body className="Body">
    <div style={{display:"flex",marginTop:20,justifyContent:"space-between"}}> 
    <Breadcrumbs style={{minHeight:70,maxHeight:72,color:"#707070",fontSize:21}}>
    <Link underline="hover" color="inherit" href="/">
      Dashboard
    </Link>
    <Link
      underline="hover"
      color="inherit"
      href="/"
    >
      Topic
    </Link>
    </Breadcrumbs>
    <button style={{height: 30,marginRight:30,fontSize:17}} className="create" onClick={handleClickOpen}>
      Create Node
    </button>
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Create Node"}
        </DialogTitle>
        <DialogContent style={{display:"flow",lineHeight:5,marginTop:10}}>
            <FormControl>
          <TextField id="outlined-basic" style={{fontSize:16,width:300}} label="Name" placeholder="Key Name" /> 
          </FormControl><br />
          <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label"><b>Select Type</b></FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="female" control={<Radio />} label="Existing" />
        <FormControlLabel value="male" control={<Radio />} label="Create New" />
      </RadioGroup>
    </FormControl><br />
    <FormControl style={{fontSize:16,width:300}} >
      <InputLabel id="demo-select-small">Age</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={age}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>   
      </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{background: "#007FFF",color:"white"}}>Create</Button>
          <Button onClick={handleClose} style={{color:"black", border:"1px solid black"}}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      </div>

 
    <div className="row">
      <div className="column">
    <Card style={{ height:800}}>
      <CardContent>
          <div style={{display:"flex",marginRight:10,marginLeft:10,marginTop:40,justifyContent:"space-between"}}>
      <Autocomplete
      style={{width:320}}
      className="search"
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={top100Films().map((option) => option.title)}
        renderInput={(params) => (
          <TextField
          className="search"
            {...params}
            label="Search input"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
      <div >
      <ToggleButtonGroup
      value={alig}
      exclusive
      onChange={handle}
      style={{color:"white",border:"1px solid #2196F3",height:55,borderRadius:8}}
    >
      <ToggleButton value="lev1" >
        Level1
      </ToggleButton>
      <ToggleButton value="lev2" >
        Level2
      </ToggleButton>
      <ToggleButton value="lev3">
        Level3
      </ToggleButton>
    </ToggleButtonGroup>
    </div>
    <Button style={{height:55,width:80,borderRadius:8,color:"black", border:"1px solid black"}}>
      Clear
    </Button>
   </div>
        
      </CardContent>
      <Box width={300} style={{marginTop:600,marginLeft:250}}>
      <Slider defaultValue={50} sx={{ mb: 1 }} color="primary" aria-label="Default" valueLabelDisplay="auto" />
    </Box>
    </Card>
    </div>
    <div className="column" style={{marginLeft:15,marginTop:-15}}>
    <p style={{color:"#707070",fontSize:21}}>Preview</p>
      <div className="scroll" style={{textAlign:"left",lineHeight:5}}>
      <div className="innerScroll">
      <div>
      <TextField id="outlined-basic" style={{backgroundColor:"white",fontSize:16}} label="Name" placeholder="Node Name" variant="outlined" />
      <EditIcon style={{marginLeft:10}} />
      </div>
      <div>
      <TextField id="outlined-basic" style={{backgroundColor:"white",fontSize:16}} label="Type" placeholder="Node Type" variant="outlined" />
      <EditIcon style={{marginLeft:10}} />
      </div>
      <button className="property">
        Add Property
      </button>
      
      <div>
      <TableContainer className="TableContainer">
      <Table>
        <TableHead>
            <TableSortLabel><b style={{marginLeft:10}}>Properties</b></TableSortLabel>
        </TableHead>
        <TableHead>
          <TableRow>
            <TableCell><b>Key</b></TableCell>
            <TableCell><b>value</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell>AMAZON</TableCell>
              <TableCell>Samsung</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>CRAIGSLIST</TableCell>
              <TableCell>Apple</TableCell>
            </TableRow>
            <TableRow>
              <TableCell> TARGET</TableCell>
              <TableCell>Sony</TableCell>
            </TableRow>
            <TableRow>
              <TableCell> MACY'S</TableCell>
              <TableCell>LG</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>BEST BUY</TableCell>
              <TableCell>Samsung</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
      </div>
      <div>
      <TableContainer className="TableContainer" style={{marginTop:20}}>
      <Table>
      <TableHead>
            <TableSortLabel><b style={{marginLeft:10}}>Pending requests</b></TableSortLabel>
        </TableHead>
        <TableHead>
          <TableRow>
            <TableCell><b>Node</b></TableCell>
            <TableCell><b>Label/Type</b></TableCell>
            <TableCell><b>Status</b></TableCell>
            <TableCell><b>Requested on</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell>AMAZON</TableCell>
              <TableCell>Samsung</TableCell>
              <TableCell><p className="pending">Pending</p></TableCell>
              <TableCell>26/10/2022 17:30</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>CRAIGSLIST</TableCell>
              <TableCell>Apple</TableCell>
              <TableCell><p className="pending">Pending</p></TableCell>
              <TableCell>26/10/2022 17:30</TableCell>
            </TableRow>
            <TableRow>
              <TableCell> TARGET</TableCell>
              <TableCell>Sony</TableCell>
              <TableCell><p className="pending">Pending</p></TableCell>
              <TableCell>26/10/2022 17:30</TableCell>
            </TableRow>
            <TableRow>
              <TableCell> MACY'S</TableCell>
              <TableCell>LG</TableCell>
              <TableCell><p className="pending">Pending</p></TableCell>
              <TableCell>26/10/2022 17:30</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>BEST BUY</TableCell>
              <TableCell>Samsung</TableCell>
              <TableCell><p className="pending">Pending</p></TableCell>
              <TableCell>26/10/2022 17:30</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
      </div>
    </div>
    </div>
    </div>
    </div>
    </body>
 </html>
 );

}
