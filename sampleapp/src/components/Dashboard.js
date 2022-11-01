import React from "react"
import '../css/dashboard.css'
import CreateModule from './AccordionExample'
import EditorModule from './NeovisAndForm'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PDFModule from '../components/tries_separatemodules/UploadandViewPDF'
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { useState, createContext, useContext } from "react";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Avatar } from '@mui/material';     
import { green } from "@material-ui/core/colors";

export default function Dashboard() {
    let history = useNavigate();
    const [openCreationModule, setOpenCreationModule] = useState(false)
    const [openEditingModule, setOpenEditingModule] = useState(false)
    const routeToCreate = (e) => {
        setOpenEditingModule(false)
        setOpenCreationModule(true)
    }
    const routeToEdit = (e) => {
        setOpenCreationModule(false)
        setOpenEditingModule(true)
    }
    return (
        <div style={{backgroundColor:"#ECEFF1"}}>
            {console.log(localStorage.getItem("topic"))}
            <AppBar position="static">
                <Toolbar variant="dense" style={{backgroundColor: "rgb(11, 175, 240)",minHeight:70,maxHeight:72, display: "flex", justifyContent: "space-between"}} >
                <Breadcrumbs aria-label="breadcrumb" style={{color:"white"}}>
                <Typography underline="hover" style={{marginLeft:75}}>
                    <h3 style={{fontFamily:"sans-serif",fontSize:32}}>NCCN UI</h3>
                    </Typography>
                    </Breadcrumbs>
                    <div style={{marginRight:'100px'}}>
                     <Avatar
                     sx={{ bgcolor: green[500] }}
                     alt="Remy Sharp"
                     src="/broken-image.jpg"
                     >
                     I
                     </ Avatar>
                    </div> 
                </Toolbar>
            </AppBar>
            {/* <Button color="secondary" variant="contained" onClick={(e) => routeToCreate(e)}> Go To Create</Button>
            <Button color="secondary" variant="contained" onClick={(e) => routeToEdit(e)}> Go To Edit</Button> */}
            <EditorModule></EditorModule>
            <div className="parent-full"  >
                
               
                <div className="first-half" >
                    {/* <h3>hello first half</h3> */}
                    {/* {openCreationModule && 
                        <Box>
                            <Typography variant="h6" color="inherit" component="div">Creation</Typography>
                            <CreateModule></CreateModule>
                        </Box>
                    } */}
                    {/* {openEditingModule && 
                        <Box>
                            <Typography>Editing</Typography>
                            <EditorModule></EditorModule>
                        </Box>
                    } */}
                    <br></br>
                </div> 
                <div className="second-half" style={{backgroundColor:"#ECEFF1"}}>
                    {/* <h3>hello second half</h3> */}
                    <PDFModule></PDFModule>
                </div>
            </div>
        </div>
    )
}