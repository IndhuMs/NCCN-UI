import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from "@material-ui/core/TextField"
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Snackbar from '@mui/material/Snackbar';

const filter = createFilterOptions();

var relnPropkeys = {};
var nodePropkeys = {};
var options = new Array({});
var totalList = new Array();


export default function PropertyHandler({relnID}) {
    const inputClearRef = useRef(null);
    const [options_relprop, setOptionsRelProp] = React.useState([]);
    const [options_nodeprop, setOptionsNodeProp] = React.useState([]);
    const [addValue, setAddValue] = useState(null)
    const [openSaveRelProperty, setOpenSaveRelProperty] = React.useState(false)
    const [relkeysDictList, setRelkeysDictList] = useState([])
    const [propertiesList, setPropertyList] = useState([
        { propertyAdd: " " }
    ])
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenSaveRelProperty(false);
    }
    const onClearButton = () => {
        // @ts-ignore (us this comment if typescript raises an error)
        inputClearRef.current.value = "";
    };
    const getkeyvaluePairs = (key, value) => {
        // var totalList = new Array();
        totalList = [];
        //push node IDs present in relationship
        console.log(localStorage.getItem("rel_node1ID"))
        totalList.push(relnID)
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
            setOpenSaveRelProperty(true)
    }
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
    const getRelnPropKeysFromServer_Up = (e) => {
        e.preventDefault();
        setRelkeysDictList([])
        var label_array = new Array();
        var nodedict = []
        axios
            .get('http://127.0.0.1:5000/relpropkeys')
            .then(result => {
                // console.log(result);
                console.log(result.data);
                options = []
                relnPropkeys = result.data
                console.log(relnPropkeys.relpropkeys)
                // setOptionsRelProp(relnPropkeys.relpropkeys)
                label_array = relnPropkeys.relpropkeys
                var dict = {}
                for (let i = 0; i < label_array.length; i++) {
                    dict = {}
                    console.log(i)
                    dict['opt_title'] = label_array[i]
                    console.log(dict)
                    options.push(dict)
                    console.log(options)
                }
                console.log(options)
                setRelkeysDictList(options)
                console.log(relkeysDictList)
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

                        {/* <Autocomplete
                                onFocus={(e) => getRelnPropKeysFromServer(e)}
                                style={{ marginRight: "16px", justifyContent: "center", display: "block", alignItems: "center" }}
                                disablePortal
                                sx={{ width: 200 }}
                                id="relpropkey"
                                options={options_relprop}
                                onChange={(e, value) => { onRelnshipPropkeySelect(e, value) }}
                                renderInput={(params) => <TextField {...params} id="relpropkey" name="relpropkey" label="Relationship Property Key" />}
                            /> */}
                        <Autocomplete
                            value={addValue}
                            style={{ marginRight: "16px", justifyContent: "center", display: "block", alignItems: "center" }}
                            onFocus={(e) => getRelnPropKeysFromServer_Up(e)}
                            onChange={(event, newValue) => {

                                if (typeof newValue === 'string') {
                                    setAddValue({
                                        opt_title: newValue,
                                    });
                                } else if (newValue && newValue.inputValue) {
                                    // Create a new value from the user input
                                    setAddValue({
                                        opt_title: newValue.inputValue,
                                    });
                                } else {
                                    setAddValue(newValue);
                                }
                            }}
                            onChange={(e, value) => { onRelnshipPropkeySelect(e, value) }}
                            filterOptions={(options, params) => {
                                console.log(params)
                                const filtered = filter(options, params);
                                const { inputValue } = params;
                                // Suggest the creation of a new value
                                const isExisting = options.some((option) => inputValue === option.opt_title);
                                if (inputValue !== '' && !isExisting) {
                                    console.log(filtered)
                                    filtered.push({
                                        inputValue,
                                        opt_title: `Add "${inputValue}"`,
                                    });
                                }
                                return filtered;
                            }}
                            id="relpropkey"
                            options={relkeysDictList}
                            getOptionLabel={(option) => {
                                // Value selected with enter, right from the input
                                if (typeof option === 'string') {
                                    return option;
                                }
                                // Add "xxx" option created dynamically
                                if (option.inputValue) {
                                    console.log(option.inputValue)
                                    return option.inputValue;
                                }
                                // Regular option
                                return option.opt_title;
                            }}
                            // getOptionLabel={(option) => option.opt_title ? option.opt_title : ""}
                            renderOption={(props, option) => <li {...props}>{option.opt_title}</li>}
                            sx={{ width: 200, color: "black" }}
                            freeSolo
                            renderInput={(params) => (
                                <TextField {...params} label="Property Key" id="relpropkey" name="relpropkey" />
                            )}
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
                                onClick={() => handlePropertyAdd(document.getElementsByName('relpropkey'), document.getElementsByName('relpropkey'))}
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
            <Snackbar
                open={openSaveRelProperty}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Property Updated for Relationship!"
            />
        </div>
    )
}