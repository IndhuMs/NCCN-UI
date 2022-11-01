import logo from '../logo.svg';
import '../App.css';
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import axios from 'axios';
import PropertyUpdate from './PropertyUpdateRelationship'
import Snackbar from '@mui/material/Snackbar';

var nodedict = {};
var nodeids = []
var nodenames = []
const getValueFromAPI = (e) => {
    axios
        .get('http://127.0.0.1:5000/getnodes')
        .then(result => {
            // console.log(result);
            console.log(result.data);
            nodedict = result.data
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
export default function BasicRelationshipEditor() {
    const [openCreateRel, setOpenCreateRel] = React.useState(false)
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenCreateRel(false);
    }
    const hit_relncreation = (e) => {
        console.log(document.getElementById('nodename-1').value)
        console.log(document.getElementById('nodename-2').value)
        localStorage.setItem("node1_rel", document.getElementById('nodename-1').value)
        localStorage.setItem("node2_rel", document.getElementById('nodename-2').value)
        var n1 = document.getElementById('nodename-1').value
        var n2 = document.getElementById('nodename-2').value
        var idsList = []
        var idsDict = {}
        var flag = 0
        for (let i = 0, j =0 ; i< options.length , j<options.length ; i++, j++)
        {
            if(n1 == nodenames[i])
            {
                console.log(nodeids[i])
                idsList.push(nodeids[i])
                idsDict['node1'] = nodeids[i]
                flag++;
            }
            if(n2 == nodenames[j])
            {
                console.log(nodeids[j])
                idsList.push(nodeids[j])
                idsDict['node2'] = nodeids[j]
                flag++;
            }
            if(flag===2)
            {
                break;
            }
        }
        console.log(idsList)
        console.log(idsDict)
        //store node IDs involved in relationship -> for updating properties while creation itself
        localStorage.setItem("rel_node1ID", idsDict['node1'])
        localStorage.setItem("rel_node2ID", idsDict['node2'])
        console.log(localStorage.getItem("node1_rel"))
        console.log(localStorage.getItem("node2_rel"))
        axios
        .post('http://127.0.0.1:5000/relationshipcreate', { idsDict })
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
        setOpenCreateRel(true);
    }

    const getNodesFromServer = (e) => {
        nodenames=[]
        nodeids=[]
        nodedict = []
        console.log(localStorage.getItem("topic"))
        var selectedTopic = localStorage.getItem("topic")
        var topic_dict = {}
        topic_dict['selectedTopic'] = selectedTopic
        axios
            .post('http://127.0.0.1:5000/getnodes',{topic_dict})
            .then(result => {
                // console.log(result);
                console.log(result.data);
                nodedict = result.data
                setNodeDet(nodedict)
                for (var key in nodedict){
                    //key will be -> 'id'
                    console.log(nodedict[key])
                    if(key in nodeids)
                        break;
                    else
                    {
                        nodeids.push(key)
                        nodenames.push(nodedict[key])
                        //get unique out of the lot
                        nodenames = [...new Set(nodenames)];
                        setOptions(nodenames)
                    }
                }
                console.log(nodeDet)
                console.log(nodeids)
                // nodeids = [...new Set(nodeids)];
                console.log(nodeids);
                // nodenames = [...new Set(nodenames)];
                console.log(nodenames);
                // document.getElementById("combo-box-demo").setop = nodedict
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
    const onNode1Select = (e) => {
        e.preventDefault();
        console.log(document.getElementById('nodename-1').value)
        console.log(e.target.value)
    }
    const onNode2Select = (e) => {
        e.preventDefault();
        console.log(e.target.value)
    }
    const [options, setOptions] = React.useState([]);
    const [nodeDet, setNodeDet] = React.useState({});
    // options = nodenames;
    return (
        <div className="App">
            {/* <TextField onClick= ></TextField> */}
            <Box display="flex" justifyContent="center">
                <Autocomplete 
                    onFocus = {(e) => getNodesFromServer(e)}
                    style={{ marginRight: "16px", justifyContent: "center", display: "block", alignItems: "center" }}
                    disablePortal
                    id="nodename-1"
                    sx={{ width: 200 }}
                    options = {options}
                    onChange={(event) => { onNode1Select(event) }}
                    renderInput={(params) => <TextField {...params} label="Select Node 1" />}
                />
                &nbsp; &nbsp; &nbsp;
            {/* </Box>
            <br></br>
            <Box display="flex" justifyContent="center"> */}
                <Autocomplete 
                    onFocus = {(e) => getNodesFromServer(e)}
                    style={{ justifyContent: "center", display: "block", alignItems: "center" }}
                    disablePortal
                    id="nodename-2"
                    sx={{ width:200 }}
                    options = {options}
                    onChange={(event) => { onNode2Select(event) }}
                    renderInput={(params) => <TextField {...params} label="Select Node 2" />}
                />
            </Box>
            <br></br>
            <Button variant="contained" style={{backgroundColor: "#00BFA5"}} onClick={(e) => hit_relncreation(e)}>
                Create Relationship
            </Button>
            <Snackbar
                open={openCreateRel}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Relationship Created!"
            />
            <PropertyUpdate></PropertyUpdate>
        </div>
    );
}
