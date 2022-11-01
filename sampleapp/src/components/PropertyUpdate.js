import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useRef } from 'react';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from "@material-ui/core/TextField"
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
var relnPropkeys = {};
var totalList = new Array();
const getkeyvaluePairs = (key, value) => {
    // var totalList = new Array();
    totalList = [];
    console.log(key)
    // totalList.push(localStorage.getItem("nodename"))
    // totalList.push(localStorage.getItem("nodetypedd"))
    totalList.push(localStorage.getItem("node1_rel"))
    totalList.push(localStorage.getItem("node2_rel"))
    console.log(totalList)
    for (let i = 0, j = 0; i < key.length, j < value.length; i++ , j++) {
        var keyvaluepairs = new Array();
        console.log(key[i].value + "::::" + value[j].value)
        localStorage.setItem("propkey", String(key[i].value))
        localStorage.setItem("propvalue", String(value[j].value))
        keyvaluepairs.push(localStorage.getItem("propkey"));
        keyvaluepairs.push(localStorage.getItem("propvalue"));
        totalList.push(keyvaluepairs)
    }
    console.log(totalList)
    localStorage.setItem("opProplist", totalList);
    // totalList = [];
    // console.log(localStorage.getItem("opPropList"))
    // testfunc();
}


const hit_propertyUpdation = (key, value, e) => {
    var property = localStorage.getItem("opProplist")
    var arrayinp = ["start", "hello"]
    getkeyvaluePairs(key, value);
    console.log(key)
    console.log(value)
    console.log(totalList)
    // console.log(localStorage.getItem("opProplist"))
    
    axios
        .post('http://127.0.0.1:5000/relationprop', {totalList})
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

export default function PropertyHandler() {
    const inputClearRef = useRef(null);
    const [options_relprop, setOptionsRelProp] = React.useState([]);
    const [options_nodeprop, setOptionsNodeProp] = React.useState([]);
    const [propertiesList, setPropertyList] = useState([
        { propertyAdd: " " }
    ])
    const onClearButton = () => {
        // @ts-ignore (us this comment if typescript raises an error)
        inputClearRef.current.value = "";
    };
    const getRelnPropKeysFromServer = (e) => {
        var nodedict = []
        axios
            .get('http://127.0.0.1:5000/relpropkeys')
            .then(result => {
                // console.log(result);
                console.log(result.data);
                relnPropkeys = result.data
                console.log(relnPropkeys.relpropkeys)
                setOptionsRelProp(relnPropkeys.relpropkeys)
                return String(result.data);
            })
            .catch(error =>
                this.setState({
                    error,
                    isLoading: false
                })
            );
    }
    const onRelnshipPropkeySelect = (e, value) => {
        console.log(value)
        e.preventDefault();
        
        console.log(e.target.value)
    }

    const handlePropertyClear = (index) => {
        const list = [...propertiesList]
        list.splice(index, 1)
        setPropertyList(list);
    }
    const handlePropertyAdd = (key, value) => {
        // if (document.getElementById('propkey').value == "" && document.getElementById('propvalue') == "")
        //     console.log("HI")
        setPropertyList([...propertiesList, { propertyAdd: " " }])
    }

    return (
        <div>
            <label htmlFor="propertyAdd" />
            {propertiesList.map((singleProperty, index) => (
                <div key={index} className="properties">
                    <Box  display="flex" justifyContent="center">
                        {/* <TextField
                            id="propkey"
                            onChange={(e) => { console.log(e.target.value) }}
                            label={"Property Key"} //optional
                            ref={inputClearRef}
                            name="propkey"
                        /> */}

                        <Autocomplete
                                onFocus={(e) => getRelnPropKeysFromServer(e)}
                                style={{ marginRight: "16px", justifyContent: "center", display: "block", alignItems: "center" }}
                                disablePortal
                                id="relpropkey"
                                name="relpropkey"
                                sx={{ width: 200 }}
                                options={options_relprop}
                                onChange={(event, value) => { onRelnshipPropkeySelect(event, value) }}
                                renderInput={(params) => <TextField {...params} id="relpropkey" name="relpropkey" label="Reln Property Key" />}
                            />
                        &nbsp; &nbsp; &nbsp;
                        <TextField
                            id="relpropvalue"
                            onChange={(e) => { console.log(e.target.value) }}
                            label={"Property Value"} //optional
                            ref={inputClearRef}
                            name="relpropvalue"
                        />
                    </Box>
                    {propertiesList.length - 1 === index && propertiesList.length < 10 &&
                        (
                            <IconButton style={{ marginTop: "10px" }} aria-label="tick" size="small"
                                onClick={() => handlePropertyAdd(document.getElementsByName('relpropkey'), document.getElementsByName('relpropvalue'))}
                            >
                                <DoneAllOutlinedIcon color="blue" />
                            </IconButton>
                        )}

                    {propertiesList.length >= 1 &&
                        (
                            <IconButton aria-label="delete"
                                onClick={() => handlePropertyClear(index)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        )}
                </div>
            ))}
            <br></br>
            <Button variant="contained" color="success" onClick={(e) => hit_propertyUpdation(document.getElementsByName('relpropkey'), document.getElementsByName('relpropvalue'), e)}>
                Save Changes
            </Button>
        </div>
    )
}