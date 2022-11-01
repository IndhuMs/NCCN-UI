import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import React from 'react';
import ReactDOM from 'react-dom';
import Box from '@mui/material/Box';
import { useState, createContext, useContext, useEffect } from "react";
import SemanticOptions from '../SemanticOptions'
import { text } from 'd3';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const UserContext = createContext();
function Menu({ x, y, showMenu, textsel }) {
  const [openForm, setOpenForm] = React.useState(false);
  const [showNodeProp, setShowNodeProp] = React.useState(false);
  const [openCreateForm, setOpenCreateForm] = React.useState('none')
  const [user, setUser] = useState('')
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenForm(false);
  };
  useEffect(() => {
    // Update the document title using the browser API
    //document.title = `You clicked ${count} times`;
    setUser(textsel)
  });
  const handleButton2 = (e) => {
    e.preventDefault();
    console.log("into property key button")
    console.log(textsel + " is the selected text for property key add - needs to be sent to API side")
    localStorage.setItem("selected_nodePropKey", textsel)
    setShowNodeProp(true)
    console.log(showNodeProp)
    // LOCATION Where we need to handle property Add API (propkey)
  }
  const handleButton3 = (e) => {
    e.preventDefault();
    console.log("into property value button")
    console.log(textsel + " is the selected text for property value add - needs to be sent to API side")
    localStorage.setItem("selected_nodePropValue", textsel)
    // LOCATION Where we need to handle property Add API (propvalue)
  }
  const handleButton1 = (e) => {
    // setOpenForm(false)
    e.preventDefault();
    console.log("Adding node")
    console.log(textsel)
    localStorage.setItem("selectedInput_nname", textsel)
    setOpenForm(true)
    console.log("Opened alert")
    // document.getElementById('pdfnodename_tf').style.visibility = "visible";
    // document.getElementById('pdfnodename_tf').value = textsel
    setOpenCreateForm('flex')
    // document.getElementById('createnodeformdiv').style.visibility = "visible";
    // return(
    //   <UserContext.Provider>
    //     {/* <TextField disabled="true" value={localStorage.getItem("inpnodename")} id="toolkittext"></TextField> */}
    //     <AccExampleTwo userContext={UserContext}></AccExampleTwo>
    //   </UserContext.Provider>
    // )
  }
  const style = () => {
    return {
      borderRadius: 10,
      backgroundColor: "#F9F9F9",
      color: "blue",
      flexDirection: "column",
      padding: 10,
      top: y,
      left: x,
      position: "absolute",
      display: showMenu ? "flex" : "none",
    };
  };
  const style_nested = () => {
    return {
      borderRadius: 10,
      backgroundColor: "#F9F9F9",
      color: "blue",
      flexDirection: "column",
      padding: 10,
      // top: y,
      // left: x,
      position: "relative",
      display: showNodeProp ? "flex" : "none",
    };
  };
  return (
    <div style={style()} >
      <Button style={styles.div} onClick={(e) => handleButton1(e)}>Add as Node</Button>
      <Button style={styles.div} onClick={(e) => handleButton2(e)}>Add as Node PropKey</Button>
      <Button style={styles.div} onClick={(e) => handleButton3(e)}>Add as Node PropValue</Button>
      {showNodeProp && <SemanticOptions></SemanticOptions>}

    </div>
  );
};

const styles = {
  div: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F9F9F9",
    color: "blue",
    fontWeight: "bold",
    cursor: "pointer",
  },
  margin: {
    margin: "10px 0",
  },
};

export default Menu;