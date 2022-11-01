import TextField from "@material-ui/core/TextField";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import React, { useState, useContext, useEffect } from "react";
import '../App.css';
import Grid from '@mui/material/Grid';
import PropertyUpdateNode from './PropertyUpdateNodeWithTopic';
import Snackbar from '@mui/material/Snackbar';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();
var dict = {};
var properties_dict = {};
var options = new Array({});

const hit_propertyUpdation = (e) => {
    var property = localStorage.getItem("opProplist")
    var arrayinp = ["start", "hello"]
    console.log(property)
    axios
        .post('http://127.0.0.1:5000/nodeprop', { arrayinp })
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
export default function BasicGraphEditor() {
    const [addValue, setAddValue] = useState(null)
    const [addNameValue, setAddNameValue] = useState(null)
    // const topic = useContext(topicContext);
    const [openCreate, setOpenCreate] = React.useState(false);
    const [openCreateError, setOpenCreateError] = React.useState(false)
    const [nodelabelOptions, setNodeLabelOptions] = useState([]);
    const [nodelabelDictList, setNodeLabelDictList] = useState([])
    const [nodeNamesDictList, setNodeNamesDictList] = useState([{}])
    const [nodeIdsList, setNodeIdsList] = React.useState([]);
    const [reducerValue, forceUpdate] = React.useReducer(x => x + 1, 0)
    const [nodeBatch, setNodeBatch] = useState({
        name: '',
        type: ''
    })

    const [propertiesList, setPropertiesList] = useState([
        { "property": "" },
    ])
    // useEffect((e) => {
    //     getNodesFromServer(e)
    //     getLabels(e)
    // });
    const getNodesFromServer = (e) => {
        var nodedict = []
        var nodeids = []
        console.log(localStorage.getItem("topic"))
        var selectedTopic = localStorage.getItem("topic")
        var topic_dict = {}
        topic_dict['selectedTopic'] = selectedTopic
        axios
            .post('http://127.0.0.1:5000/getnodes', { topic_dict })
            .then(result => {
                var nodenames = []
                var dict = {}
                options = new Array({})

                console.log(result);
                console.log(result.data);
                nodedict = result.data
                for (var key in nodedict) {
                    nodenames.push(nodedict[key])
                    nodeids.push(key)
                }
                //setOptions(nodenames)
                setNodeIdsList(nodeids)
                for (let i = 0; i < nodenames.length; i++) {
                    dict = {}
                    console.log(i)
                    dict['opt_title'] = nodenames[i]
                    console.log(dict)
                    options.push(dict)
                    console.log(options)
                }
                setNodeNamesDictList(options)
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
    const onNodeSelect = (e) => {
        e.preventDefault();
        //console.log(document.getElementById('nodenamesdd').value)
        // console.log(e.target.value)
    }
    //#region HASH Function
    async function sha256(message) {
        // encode as UTF-8
        var msg
        // const textencode_msg = new TextEncoder().encode(message);
        // const hashBuffer = await crypto.subtle.digest('SHA-256', textencode_msg);
        // const hashArray = Array.from(new Uint8Array(hashBuffer));
        // const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        for (var c = ''; c.length < 16;) {
            c += Math.random().toString(36).substr(2, 1)
            msg = c
        }
        console.log(msg)
        // console.log(hashHex);
        return String(msg);
    }

    //#endregion
    const hit_nodecreation = (e) => {
        e.preventDefault();
        console.log("Inside Node Creation")
        console.log(document.getElementById('nodenamedropdown').value)
        console.log(document.getElementById('nodelabeldropdown').value)
        //nname is needed by Property adding side
        localStorage.setItem("nname", localStorage.getItem("nodename"));
        localStorage.setItem("nname_v2", document.getElementById('nodenamedropdown').value);
        localStorage.setItem("ntype", document.getElementById('nodelabeldropdown').value)
        console.log(localStorage.getItem("nodename"));
        console.log(localStorage.getItem("nodelabel"));
        console.log(localStorage.getItem("hashnodename"));
        console.log(document.getElementById('nodelabeldropdown').value)
        localStorage.setItem("nodetypedd", document.getElementById('nodelabeldropdown').value);
        var name_final = localStorage.getItem("nname_v2");
        let error = false;
        for (let i = 0; i < nodeNamesDictList.length; i++) {
            console.log("Hi into for")
            var temp_dct = {}
            temp_dct = nodeNamesDictList[i]
            if (name_final == temp_dct['opt_title']) {
                console.log("repeated")
                setOpenCreateError(true)
                error = true
            }
        }
        if (!error) {
            console.log("Creation possible")
            dict['nodename'] = localStorage.getItem("nname_v2");
            dict['nodelabel'] = localStorage.getItem("nodelabel");
            dict['hashnodename'] = localStorage.getItem("hashnodename");
            dict['nodetype'] = localStorage.getItem("nodetypedd");
            dict['nodetopic'] = localStorage.getItem("topic")
            console.log(dict);
            const output = {
                nodename: localStorage.getItem("nodename"),
                nodetype: localStorage.getItem("nodetype"),
                hashnodename: localStorage.getItem("hashnodename")
            };
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
        }
        console.log(reducerValue)
        forceUpdate();
        setNodeBatch({
            name: '',
            type: ''
        })
        // alert('button click catched')
    }
    const onNodeNameChange = async (e) => {
        e.preventDefault();
        console.log(e.target.value)
        localStorage.setItem("nodename", e.target.value);
        var hash = await sha256(e.target.value);
        console.log(hash);
        localStorage.setItem("hashnodename", hash);
    }
    const onNodeLabelChange = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        localStorage.setItem("nodelabel", e.target.value);
    }
    const onACLabelSelect = (e, value) => {
        e.preventDefault();
        console.log(e.target.value)
        // localStorage.setItem("nodelabel", e.target.value);
    }
    const onLabelSelect = (e) => {
        // e.preventDefault();
        console.log(e.target.value)
        // localStorage.setItem("nodelabel", e.target.value);
    }
    const onHandleProperty = (e) => {
        e.preventDefault();
        console.log(document.getElementById("propkey").value)
        console.log(document.getElementById("propvalue").value)
        localStorage.setItem("propkey", document.getElementById("propkey").value);
        localStorage.setItem("propvalue", document.getElementById("propvalue").value);
        properties_dict[localStorage.getItem("propkey")] = localStorage.getItem("propvalue")
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenCreate(false);
        setOpenCreateError(false)
    }
    const getLabels = (e) => {
        e.preventDefault();
        // console.log(localStorage.getItem("topic"))
        // console.log(topic)
        var label_array = new Array();
        var nodelabelsdict = {}
        options = new Array({})
        axios
            .get('http://127.0.0.1:5000/node_label_list')
            .then(result => {
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
    return (
        <div className="App">
            {console.log(localStorage.getItem("topic"))}
            {/* <TextField
                onChange={(e) => { onNodeNameChange(e) }}
                label={"Node Name"} //optional
            /> */}
            <Box display="flex" justifyContent="center">
                <Autocomplete
                    value={addNameValue}
                    style={{ marginRight: "16px", justifyContent: "center", display: "block", alignItems: "center" }}
                    onFocus={(e) => getNodesFromServer(e)}
                    // style={color= "blue"}
                    onChange={(event, newValue) => {

                        if (typeof newValue === 'string') {
                            setAddNameValue({
                                opt_title: newValue,
                            });
                        } else if (newValue && newValue.inputValue) {
                            // Create a new value from the user input
                            setAddNameValue({
                                opt_title: newValue.inputValue,
                            });
                        } else {
                            setAddNameValue(newValue);
                        }
                    }}
                    //onChange={(e, value) => { onACLabelSelect(e, value) }}
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
                    id="nodenamedropdown"
                    options={nodeNamesDictList}
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
                        <TextField {...params} label="Node Name" />
                    )}
                />
            </Box>
            <br></br>
            <br></br>
            <Box display="flex" justifyContent="center">
                {/* <Autocomplete
                    style={{ justifyContent: "center", display: "block", alignItems: "center" }}
                    disablePortal
                    justifyContent="center"
                    id="nodelabeldropdown"
                    options={nodelabelOptions}
                    sx={{ width: 200 }}
                    color="primary"
                    size="small"
                    onFocus={(e) => getLabels(e)}
                    onChange={(event) => { onLabelSelect(event) }}
                    renderInput={(params) => <TextField {...params} label="Node Label/Type" />}
                /> */}
                <Autocomplete
                    value={addValue}
                    style={{ marginRight: "16px", justifyContent: "center", display: "block", alignItems: "center" }}
                    onFocus={(e) => getLabels(e)}
                    // style={color= "blue"}
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
                    //selectOnFocus
                    //clearOnBlur
                    //disablePortal
                    //handleHomeEndKeys
                    id="nodelabeldropdown"
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
                    renderOption={(props, option) => <li {...props} >{option.opt_title}</li>}
                    sx={{ width: 200, color: "black" }}
                    freeSolo
                    renderInput={(params) => (
                        <TextField {...params} label="Node Label" />
                    )}
                />
            </Box>
            <br></br>
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
            <Snackbar
                open={openCreateError}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Unable to Create Node!!"
            />
            {/* <p onClick={hit_getAPI}></p> */}
            <br></br>
            <br></br>

            <PropertyUpdateNode></PropertyUpdateNode> <br></br>
        </div>
    );
}
