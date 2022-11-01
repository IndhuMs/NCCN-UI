import TextField from "@material-ui/core/TextField";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import * as React from 'react';
import { useState, useRef } from "react";
import Snackbar from '@mui/material/Snackbar';
import RelationshipCreator from '../components/RelationshipCreator_TE';
import '../css/neovis.css';
const filter = createFilterOptions();
var totalList = new Array()
const topicOptions = [
    "Screening",
    "Treatment"
]

var nodePropkeys = {};
var relnPropkeys = {};
var totalList = new Array();
var options = new Array({});
var options1 = new Array({});
var options2 = new Array({});
function sha256(message) {
    var msg
    for (var c = ''; c.length < 16;) {
        c += Math.random().toString(36).substr(2, 1)
        msg = c
    }
    console.log(msg)
    return String(msg);
}
export default function AccordionExample({ buttonSelectedText, propSelectedText, propValueSelected, semanticClick, isPropValueFromSelect, semanticRelnClick, selectedRelnPropKey, selectedRelnPropValue, isRELPropValueFromSelect }) {
    const [addValue, setAddValue] = useState(null)
    const inputClearRef = useRef(null);
    const [addValueNodeKey, setAddValueNodeKey] = useState(null)
    const [addValueRelKey, setAddValueRelKey] = useState(null)
    const [nodelabelOptions, setNodeLabelOptions] = useState([]);
    const [nodelabelDictList, setNodeLabelDictList] = useState([])
    const [nodekeysDictList, setNodekeysDictList] = useState([])
    const [relkeysDictList, setRelkeysDictList] = useState([])
    const [openCreate, setOpenCreate] = React.useState(false);
    const [openSaveRelProperty, setOpenSaveRelProperty] = React.useState(false)
    const [openSaveProperty, setOpenSaveProperty] = React.useState(false)
    const [openCreateError, setOpenCreateError] = React.useState(false)
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenSaveRelProperty(false);
        setOpenSaveProperty(false);
        setOpenCreate(false);
        setOpenCreateError(false)
    }
    const hit_RELpropertyUpdation = (e) => {
        totalList = []
        var key;
        var value;
        console.log(localStorage.getItem("selected_nname1"))
        console.log(localStorage.getItem("selected_nname2"))
        console.log(localStorage.getItem("selected_rel_node1ID"))
        console.log(localStorage.getItem("selected_rel_node2ID"))
        var node1ID = localStorage.getItem("selected_rel_node1ID")
        var node2ID = localStorage.getItem("selected_rel_node2ID")
        if (semanticRelnClick && isRELPropValueFromSelect) {
            key = selectedRelnPropKey
            value = selectedRelnPropValue
        }
        else if (!semanticRelnClick && !isRELPropValueFromSelect) {
            key = document.getElementById("relpropkeydd_te").value
            value = document.getElementById("relpropvaluedd_te").value
        }
        else if (!semanticRelnClick && isRELPropValueFromSelect) {
            key = document.getElementById("relpropkeydd_te").value
            value = selectedRelnPropValue
        }
        else if (semanticRelnClick && !isRELPropValueFromSelect) {
            key = selectedRelnPropKey
            value = document.getElementById("relpropvaluedd_te").value
        }
        // console.log(localStorage.getItem("opProplist"))
        console.log(key + "::::" + value)
        totalList.push(node1ID)
        totalList.push(node2ID)
        totalList.push([key, value])
        var keyvalblank = ['', '']
        totalList.push(keyvalblank)
        console.log(totalList)
        axios
            .post('http://127.0.0.1:5000/relationpropcreate', { totalList })
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
    const hit_propertyUpdation = (e) => {
        totalList = []
        var value;
        var key;
        const nname_te = buttonSelectedText
        const ntype_te = document.getElementById("nodelabeldropdown_te").value

        if (semanticClick && isPropValueFromSelect) {
            key = propSelectedText
            value = propValueSelected
        }
        else if (!semanticClick && !isPropValueFromSelect) {
            key = document.getElementById("nodepropkeydd_te").value
            value = document.getElementById("nodepropvaluedd_te").value
        }
        else if (!semanticClick && isPropValueFromSelect) {
            key = document.getElementById("nodepropkeydd_te").value
            value = propValueSelected
        }
        else if (semanticClick && !isPropValueFromSelect) {
            key = propSelectedText
            value = document.getElementById("nodepropvaluedd_te").value
        }
        console.log(key + "::::" + value)
        // console.log(totalList)
        totalList.push(nname_te)
        totalList.push(ntype_te)
        totalList.push(localStorage.getItem("topic"))
        totalList.push([key, value])
        console.log(totalList)
        var keyvalblank = ['', '']
        totalList.push(keyvalblank)
        totalList.push(keyvalblank)
        // console.log(localStorage.getItem("opProplist"))

        axios
            .post('http://127.0.0.1:5000/nodeprop', { totalList })
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
            setOpenSaveProperty(true)
    }
    const hit_nodecreation = (e) => {
        const dict = {}
        e.preventDefault();
        const nname_te = buttonSelectedText
        const ntype_te = document.getElementById("nodelabeldropdown_te").value
        console.log(nname_te)
        console.log(ntype_te)
        var hash = sha256(nname_te);
        console.log(hash)
        dict['nodename'] = nname_te
        dict['hashnodename'] = hash
        dict['nodetype'] = ntype_te
        dict['nodetopic'] = localStorage.getItem("topic")
        console.log(dict);
        
        localStorage.setItem("nodeBasic", dict)
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
            setOpenCreate(true)
        // alert('button click catched')
    }
    const getLabels = (e) => {
        e.preventDefault();
        // console.log(localStorage.getItem("topic"))
        // console.log(topic)
        var label_array = new Array();
        var nodelabelsdict = {}
        axios
            .get('http://127.0.0.1:5000/node_label_list')
            .then(result => {
                options = new Array({})
                setNodeLabelOptions([])
                // console.log(result);
                console.log(result.data);
                nodelabelsdict = result.data
                for (var key in nodelabelsdict) {
                    // console.log(nodelabelsdict[key])
                    label_array = nodelabelsdict[key]
                }
                console.log(label_array)
                localStorage.setItem("nodelabels_exist", label_array)
                // setNodeLabelOptions(label_array)
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
                setNodeLabelDictList(options)
                console.log(nodelabelDictList)
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
    const getNodePropKeysFromServer_Up = (e) => {
        e.preventDefault();
        setNodekeysDictList([])
        // console.log(localStorage.getItem("topic"))
        // console.log(topic)
        var label_array = new Array();
        var nodelabelsdict = {}
        axios.get('http://127.0.0.1:5000/nodepropkeys')
            .then(result => {
                //setNodeLabelOptions([])
                // console.log(result);
                options = []
                console.log(options)
                console.log(result.data);
                nodePropkeys = result.data
                for (var key in nodePropkeys) {
                    //key will be -> 'id'
                    console.log(nodePropkeys[key])
                }
                console.log(nodePropkeys.nodepropkeys)
                label_array = nodePropkeys.nodepropkeys
                // setOptionsNodeProp(nodePropkeys.nodepropkeys)
                // setNodeLabelOptions(label_array)
                // AUTOCOMPLETE SIDE
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
                setNodekeysDictList(options)
                console.log(nodekeysDictList)
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
    const onNodePropkeySelect = (e, value) => {
        e.preventDefault();
        console.log(value)
        // console.log(document.getElementById('nodepropkey').value)
        console.log(e.target.value)
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
    return (
        <div>
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
                        <Box display="flex" justifyContent="center">
                            <TextField multiline
          rows="3" label="Node Name" value={buttonSelectedText} id="nodename_te" onChange={(e) => localStorage.setItem("nname_te", e.target.value)}></TextField>
                        </Box>
                        <br></br>
                        <Box display="flex" justifyContent="center">
                            <Autocomplete
                                value={addValue}
                                style={{ justifyContent: "center", display: "block", alignItems: "center" }}
                                onFocus={(e) => getLabels(e)}
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
                                //onChange={(e, value) => { onACLabelSelect(e, value) }}
                                filterOptions={(options1, params) => {
                                    console.log(params)
                                    const filtered = filter(options1, params);
                                    const { inputValue } = params;
                                    // Suggest the creation of a new value
                                    const isExisting = options1.some((option) => inputValue === option.opt_title);
                                    if (inputValue !== '' && !isExisting) {
                                        console.log(filtered)
                                        filtered.push({
                                            inputValue,
                                            opt_title: `Add "${inputValue}"`,
                                        });
                                    }
                                    return filtered;
                                }}
                                id="nodelabeldropdown_te"
                                options={nodelabelDictList}
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
                                    <TextField {...params} label="Node Label" />
                                )}
                            />
                        </Box>
                        <br></br>
                        <Button variant="contained" style={{ backgroundColor: "#00BFA5" }} onClick={(e) => hit_nodecreation(e)}>
                            Create Node
                        </Button>
                        <Snackbar
                            open={openCreate}
                            autoHideDuration={6000}
                            onClose={handleClose}
                            message="Node Created!"
                        />
                        {console.log(propSelectedText)}

                        <Box display="flex" justifyContent="center">

                            {
                                semanticClick &&
                                <Box>
                                    <TextField label="Property Key *" value={propSelectedText} id="nodepropkey_te" onChange={(e) => localStorage.setItem("nodepropkey_te", e.target.value)}></TextField>
                                    
                                    {/* {isPropValueFromSelect &&
                                        <TextField label="Property Value *" value={propValueSelected} id="nodepropvalue_te" onChange={(e) => localStorage.setItem("nodepropvalue_te", e.target.value)}></TextField>
                                    }
                                    {!isPropValueFromSelect &&
                                        <TextField label="Property Value" id="nodepropvaluedd_te" onChange={(e) => localStorage.setItem("nodepropvalue_te", e.target.value)}></TextField>
                                    } */}
                                </Box>
                            }
                            {
                                !semanticClick &&
                                <Box>
                                    <Autocomplete
                                        value={addValueNodeKey}
                                        style={{ justifyContent: "center", display: "block", alignItems: "center" }}
                                        onFocus={(e) => getNodePropKeysFromServer_Up(e)}
                                        onChange={(event, newValue) => {

                                            if (typeof newValue === 'string') {
                                                setAddValueNodeKey({
                                                    opt_title: newValue,
                                                });
                                            } else if (newValue && newValue.inputValue) {
                                                // Create a new value from the user input
                                                setAddValueNodeKey({
                                                    opt_title: newValue.inputValue,
                                                });
                                            } else {
                                                setAddValueNodeKey(newValue);
                                            }
                                        }}
                                        //onChange={(e, value) => { onNodePropkeySelect(e, value) }}
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
                                        id="nodepropkeydd_te"
                                        options={nodekeysDictList}
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
                                            <TextField {...params} label="Property Key" id="nodepropkeydd_te" name="nodepropkeydd_te" />
                                        )}

                                    />

                                    {/* <TextField label="Property Value" id="nodepropvaluedd_te"></TextField> */}
                                </Box>
                            }
                            </Box>
                            <Box>
                                {isPropValueFromSelect &&
                                    <TextField label="Property Value *" value={propValueSelected} id="nodepropvalue_te" onChange={(e) => localStorage.setItem("nodepropvalue_te", e.target.value)}></TextField>
                                }
                                {!isPropValueFromSelect &&
                                    <TextField label="Property Value" id="nodepropvaluedd_te" onChange={(e) => localStorage.setItem("nodepropvalue_te", e.target.value)}></TextField>
                                }
                            </Box>
                        <br></br>
                        <Button variant="contained" color="success" onClick={(e) => hit_propertyUpdation(e)}>
                            Save Changes
                        </Button>
                        <Snackbar
                            open={openSaveProperty}
                            autoHideDuration={6000}
                            onClose={handleClose}
                            message="Property Updated for Node!"
                        />
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>Relationships</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {/* <TextField onFocus={console.log(localStorage.getItem("selected_nname1"))}></TextField> */}
                        <RelationshipCreator></RelationshipCreator>

                        {
                            semanticRelnClick &&
                            <Box>
                                <TextField label="Property Key *" value={selectedRelnPropKey}></TextField>
                                &nbsp; &nbsp; &nbsp;
                                {isRELPropValueFromSelect &&
                                    <TextField label="Property Value *" value={selectedRelnPropValue}></TextField>
                                }
                                {
                                    !isRELPropValueFromSelect &&
                                    <TextField
                                        id="relpropvaluedd_te"
                                        onChange={(e) => { console.log(e.target.value) }}
                                        label={"Property Value"} //optional
                                        ref={inputClearRef}
                                        name="relpropvaluedd_te"
                                    />
                                }


                            </Box>

                        }
                        {
                            !semanticRelnClick &&
                            <Box display="flex" justifyContent="center">
                                <Autocomplete
                                    value={addValueRelKey}
                                    style={{ justifyContent: "center", display: "block", alignItems: "center" }}
                                    onFocus={(e) => getRelnPropKeysFromServer_Up(e)}
                                    onChange={(event, newValue) => {

                                        if (typeof newValue === 'string') {
                                            setAddValueRelKey({
                                                opt_title: newValue,
                                            });
                                        } else if (newValue && newValue.inputValue) {
                                            // Create a new value from the user input
                                            setAddValueRelKey({
                                                opt_title: newValue.inputValue,
                                            });
                                        } else {
                                            setAddValueRelKey(newValue);
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
                                    id="relpropkeydd_te"
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
                                        <TextField {...params} label="Property Key" id="relpropkeydd_te" name="relpropkeydd_te" />
                                    )}
                                />

                                &nbsp; &nbsp; &nbsp;
                                {
                                    isRELPropValueFromSelect &&
                                    <TextField label="Property Value *" value={selectedRelnPropValue}></TextField>
                                }
                                {
                                    !isRELPropValueFromSelect &&
                                    <TextField
                                        id="relpropvaluedd_te"
                                        onChange={(e) => { console.log(e.target.value) }}
                                        label={"Property Value"} //optional
                                        ref={inputClearRef}
                                        name="relpropvaluedd_te"
                                    />
                                }
                            </Box>
                        }
                        <br></br>
                        <Button variant="contained" color="success" onClick={(e) => hit_RELpropertyUpdation(e)}>
                            Save Changes
                        </Button>
                        <Snackbar
                            open={openSaveRelProperty}
                            autoHideDuration={6000}
                            onClose={handleClose}
                            message="Property Updated for Relationship!"
                        />
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
