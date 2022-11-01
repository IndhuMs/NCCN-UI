import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import { useState, createContext, useContext } from "react";
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import AppBar from '@mui/material/AppBar';
import TextField from "@material-ui/core/TextField";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import * as React from 'react';
import BasicGraphEditor from '../components/BasicGraphEditor';
import BasicRelationshipEditor from '../components/BasicRelationshipEditor';

const dict = {}
export default function AccordionExample({ buttonSelectedText }) {
  // const user = useContext(userContext);
  const user="";
  // const buttonSelectedText = buttonSelectedText
  function sha256(message) {
    // encode as UTF-8
    var msg
    
    for (var c = ''; c.length < 16;) {
      c += Math.random().toString(36).substr(2, 1)
      msg = c
    }
    console.log(msg)
    // console.log(hashHex);
    return String(msg);
  }
  const hitUpdate = (e) => {
    e.preventDefault()
    var hash = sha256(localStorage.getItem("nname_te"));
    console.log(hash)
    localStorage.setItem("nodename_te", document.getElementById("nodename_te").value)
    console.log(localStorage.getItem("nname_te"))
    console.log(localStorage.getItem("nlabel_te"))
    dict['nodename'] = localStorage.getItem("nname_te")
    dict['nodetype'] = localStorage.getItem("nlabel_te")
    dict['nodetopic'] = localStorage.getItem("topic")
    dict['hashnodename'] = hash;
    console.log(dict)
    axios
    .post('http://127.0.0.1:5000/nodecreate', { dict })
    .then(result => {
        // console.log(result);
        console.log(result.data);
        this.setState({
            repos: result.data,
            isLoading: false
        });
        
        return String(result.data);
    })
    .catch(error =>
        this.setState({
            error,
            isLoading: false
        })
    );
  }
  return (
    <div>
      {console.log(buttonSelectedText)}
      <AppBar position="static">
        <Toolbar variant="dense" style={{backgroundColor: "#26A69A"}} >
          {/* <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <MenuIcon />
            </IconButton> */}
          <Typography variant="h6" color="inherit" component="div" >
            NCCN UI Tool
            </Typography>
        </Toolbar>
      </AppBar>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Nodes</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <TextField label="Node name from component" value={buttonSelectedText} id="nodename_te" onChange={(e) => localStorage.setItem("nname_te", e.target.value)}></TextField>
            <br></br>
            <TextField label="Node Label" id="nodelabel_te" onChange={(e) => localStorage.setItem("nlabel_te", e.target.value)}></TextField>
            <Button variant="contained" onClick={(e) => hitUpdate(e)}>
              Create Node
            </Button>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
