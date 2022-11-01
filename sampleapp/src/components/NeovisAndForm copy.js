import React, { Component } from 'react';
import NeoVis from 'neovis.js';
import { NEOVIS_ADVANCED_CONFIG } from 'neovis.js'
import TextField from "@material-ui/core/TextField";
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import '../css/neovis.css';
import { useRef, useState } from "react";
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropertyUpdateNode from './PropertyUpdateNode';
import PropertyUpdate from './PropertyUpdateRelationshipWithID';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import JustNeovis from '../components/JustNeovis'
import PlayingwithNeovisGraph from './PlayingwithNeovisGraph'

function createData(key, value) {
    return { key, value };
}

let neoViz;
var nodeRows = new Array();
var relnPropRows = new Array();
var relnPropkeys = {};
var nodePropKeys = {};

export default function NeovisAndForm({ userContext }) {
    const inputClearRef = useRef(null);
    //extracting values from graph
    // var nodeRows = new Array();
    // nodeRows = localStorage.getItem("select_noderows")
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [nodeId, setNodeId] = useState(0);
    const [relnode1ID, setRelNode1ID] = useState('');
    const [edgeId, setEdgeId] = useState('');
    const [relnode2ID, setRelNode2ID] = useState('');
    const [relnode1Name, setRelNode1Name] = useState('');
    const [relnode2Name, setRelNode2Name] = useState('');
    const [options, setOptions] = React.useState([]);
    //propertyupdateion
    const [options_relprop, setOptionsRelProp] = React.useState([]);
    const [nodeDet, setNodeDet] = React.useState({});
    const [openDeleteNotif, setOpenDeleteNotif] = React.useState(false)
    const [nodeIdsArray, setNodeIdsArray] = React.useState([]);
    const [openDeleteRelnNotif,setOpenDeleteRelnNotif] = React.useState(false)
    const getNodesFromServer = (e) => {
        var nodedict = []
        var nodeids = []
        axios
            .get('http://127.0.0.1:5000/getnodes')
            .then(result => {
                // console.log(result);
                console.log(result.data);
                nodedict = result.data
                var nodenames = []
                // document.getElementById("combo-box-demo").setop = nodedict
                // setOptions(nodedict)
                for (var key in nodedict){
                    nodenames.push(nodedict[key])
                    nodeids.push(key)
                }
                setOptions(nodenames)
                setNodeIdsArray(nodeids)
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
    const onRenderSpecificHandle = (e) => {
        console.log(document.getElementById("nodenamesdd").value)
        var nodenamechosen = document.getElementById("nodenamesdd").value
        
        console.log(options.indexOf(nodenamechosen))
        console.log(nodeIdsArray[options.indexOf(nodenamechosen)])
        var selectedId = nodeIdsArray[options.indexOf(nodenamechosen)]
        var select_dict = {}
        select_dict['selectedId'] = selectedId
        const query = `MATCH (p)<-[r *..3]->(c) WHERE id(p) = ${selectedId} RETURN p,c,r`
        // console.log(query)
        
        axios
            .post('http://127.0.0.1:5000/subgraph', {select_dict})
            .then(result => {
                console.log(result.data);
                console.log(typeof(result.data));
                // var res_flag = result.data
                // res_flag = res_flag.toInt
                // console.log(res_flag)
                if(result.data==2)
                {
                    console.log(query)
                    neoVizRelationship(e, query)
                }   
                if(result.data==1)
                {
                    console.log("hi, im hanging")
                    query = `MATCH (p) WHERE id(p) = ${selectedId} return p`
                    console.log(query)
                    neoVizRelationship(e, query)
                }
            })
            .catch(error =>
                this.setState({
                    error,
                    isLoading: false
                })
            );
            // neoVizRelationship(e, query)
        
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenDeleteNotif(false);
        setOpenDeleteRelnNotif(false)
    }
    const deleteProperty = (e, prop_todel) => {
        var nodename = localStorage.getItem("nodename")
        var nodetype = localStorage.getItem("nodetypedd")
        console.log(nodename)
        console.log(prop_todel)
        var delete_dict = {}
        delete_dict['nodename'] = nodename
        delete_dict['nodetype'] = nodetype
        delete_dict['prop_todel'] = prop_todel
        console.log(delete_dict)
        axios
            .post('http://127.0.0.1:5000/delnodeprop', { delete_dict })
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
        window.location.reload();
    }
    const deleteProperty_Reln = (e, prop_todel) => {
        console.log(prop_todel)
        var delete_dict = {}
        delete_dict['relID'] = edgeId
        delete_dict['node1ID'] = relnode1ID
        delete_dict['node2ID'] = relnode2ID
        delete_dict['prop_todel'] = prop_todel
        console.log(delete_dict)
        axios
            .post('http://127.0.0.1:5000/delrelprop', {delete_dict})
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
    const getNodesNameFromRelID = (edgeId) => {
        console.log(edgeId)
        var rel_dict = {}
        rel_dict['relID'] = edgeId
        console.log(rel_dict)
        axios
            .post('http://127.0.0.1:5000/getnoderelid', {rel_dict})
            .then(result => {
                // console.log(result);
                console.log(result.data);
                var names_dict = result.data
                console.log(names_dict['node1'])
                console.log(names_dict['node2'])
                setRelNode1Name(names_dict['node1'])
                setRelNode2Name(names_dict['node2'])
                this.setState({
                    repos: result.data,
                    isLoading: false
                });
                return result.data;
            })
            .catch(error =>
                this.setState({
                    error,
                    isLoading: false
                })
            );
    }
    const getPropKeysFromServer = (e) => {
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
    const onRelnshipPropkeySelect = (e) => {
        e.preventDefault();
        console.log(document.getElementById('relnshipPropKey').value)
        console.log(e.target.value)
    }
    
    const nodeDelete = (e) => {
        e.preventDefault();
        var totalDict = {}
        totalDict['nodeidtodel'] = nodeId
        console.log(totalDict)
        axios
            .post('http://127.0.0.1:5000/nodedelete', { totalDict })
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
        setOpenDeleteNotif(true)
        // window.location.reload(true)
    }
    const relDelete = (e) => {
        e.preventDefault();
        var delete_dict = {}
        delete_dict['relID'] = edgeId
        console.log(delete_dict)
        axios
            .post('http://127.0.0.1:5000/reldelete', { delete_dict })
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
            setOpenDeleteRelnNotif(true)
    }
    function neoVizRelationship(e, initCypher) {
        
        e.preventDefault()
        const cyphers = [
            'match (n) return n',
            'MATCH (m), (a)-[r]->(b) RETURN a,b,r,m'
        ];
        const config = {
            containerId: "maindiv",
            neo4j: {
                //Sample NEO4j db
                serverUrl: "neo4j://c822ccbf.databases.neo4j.io:7687/",
                arrows: true,
                serverUser: "neo4j",
                serverPassword: "qhbT-2MoWJhDMHcxZ-uBy1MAoinlIpm-p32Hq687BGk",
                encrypted: 'ENCRYPTION_ON',
                //actual neo4j DB
                // serverUrl : "bolt+s://e9c642e9.databases.neo4j.io",
                trust: "TRUST_SYSTEM_CA_SIGNED_CERTIFICATES",
                // serverPassword : "3yKkqqHaeAsy6mvk_aswwLpCPAy2O_Ep2qQQaGoAORE",
            },
            // layout: {
            //     hierarchical: true
            // },
            visConfig: {
                interaction: {
                    hover: true,
                    // click:true,
                    hoverConnectedEdges: true,
                    // multiselect: 'alwaysOn',
                    zoomView: true,
                },
                nodes: {
                    // mass: 2,
                    shape: 'circle',
                    // color: {
                    //     inherit: "true"
                    // },
                    group: "label",
                    labelHighlightBold: false,
                    widthConstraint: {
                        maximum: 40
                    },
                    heightConstraint: {
                        maximum: 20
                    },
                    font: { color: 'gray', size: 10 },
                },
                edges: {
                    font: {
                        size: 1,
                        strokeWidth: 0,
                        align: 'top'
                    },
                    color: 'gray',
                    arrows: {
                        to: { enabled: true }
                    }
                },
            },
            labels: {
                // //ACTUAL LABELS START
                // "CRITERIA" : {
                //     "label": "name",
                //     "size": "name",
                //     "community": "community",
                //     "title_properties": [
                //         "label",
                //     ],
                //     mappedProp: "prop from neo4j node",
                //     [NEOVIS_ADVANCED_CONFIG]: {
                //         static: {
                //             color: "#2FF3E0" // static property is a constant property for all nodes of the type
                //         },
                //     },
                // },
                // "SURVEILLANCE_FOLLOWUP" : {
                //     "label": "name",
                //     "size": "name",
                //     "community": "community",
                //     "title_properties": [
                //         "label",
                //     ],
                //     mappedProp: "prop from neo4j node",
                //     [NEOVIS_ADVANCED_CONFIG]: {
                //         static: {
                //             color: "#F8D210" // static property is a constant property for all nodes of the type
                //         },
                //     },
                // },
                // "IMAGING;SURVEILLANCE_FOLLOWUP" : {
                //     "label": "name",
                //     "size": "name",
                //     "community": "community",
                //     "title_properties": [
                //         "label",
                //     ],
                //     mappedProp: "prop from neo4j node",
                //     [NEOVIS_ADVANCED_CONFIG]: {
                //         static: {
                //             color: "#FA26A0" // static property is a constant property for all nodes of the type
                //         },
                //     },
                // },
                // "DECISION_NODE" : {
                //     "label": "name",
                //     "size": "name",
                //     "community": "community",
                //     "title_properties": [
                //         "label",
                //     ],
                //     mappedProp: "prop from neo4j node",
                //     [NEOVIS_ADVANCED_CONFIG]: {
                //         static: {
                //             color: "#F51720" // static property is a constant property for all nodes of the type
                //         },
                //     },
                // },
                //  "INDICATION": {
                //     "label": "name",
                //     "size": "name",
                //     "community": "community",
                //     "title_properties": [
                //         "label",
                //     ],
                //     mappedProp: "prop from neo4j node",
                //     [NEOVIS_ADVANCED_CONFIG]: {
                //         static: {
                //             color: "#81B622" // static property is a constant property for all nodes of the type
                //         },
                //     },
                // },
                // "START" : {
                //     "label": "name",
                //     "size": "name",
                //     "community": "community",
                //     "title_properties": [
                //         "label",
                //     ],
                //     mappedProp: "prop from neo4j node",
                //     [NEOVIS_ADVANCED_CONFIG]: {
                //         static: {
                //             color: "#050A30" // static property is a constant property for all nodes of the type
                //         },
                //     },
                // },
                // "STEP" : {
                //     "label": "name",
                //     "size": "name",
                //     "community": "community",
                //     "title_properties": [
                //         "label",
                //     ],
                //     mappedProp: "prop from neo4j node",
                //     [NEOVIS_ADVANCED_CONFIG]: {
                //         static: {
                //             color: "#ECF87F" // static property is a constant property for all nodes of the type
                //         },
                //     },
                // },
                // "SUBPROCEDURE_NODE" : {
                //     "label": "name",
                //     "size": "name",
                //     "community": "community",
                //     "title_properties": [
                //         "label",
                //     ],
                //     mappedProp: "prop from neo4j node",
                //     [NEOVIS_ADVANCED_CONFIG]: {
                //         static: {
                //             color: "#0000FF" // static property is a constant property for all nodes of the type
                //         },
                //     },
                // },
                // "IMAGE_FINDINGS" : {
                //     "label": "name",
                //     "size": "name",
                //     "community": "community",
                //     "title_properties": [
                //         "label",
                //     ],
                //     mappedProp: "prop from neo4j node",
                //     [NEOVIS_ADVANCED_CONFIG]: {
                //         static: {
                //             color: "#F8AFA6" // static property is a constant property for all nodes of the type
                //         },
                //     },
                // },
                // "TREATMENT" : {
                //     "label": "name",
                //     "size": "name",
                //     "community": "community",
                //     "title_properties": [
                //         "label",
                //     ],
                //     mappedProp: "prop from neo4j node",
                //     [NEOVIS_ADVANCED_CONFIG]: {
                //         static: {
                //             color: "#B68D40" // static property is a constant property for all nodes of the type
                //         },
                //     },
                // },
                // "HISTOLOGY": {
                //     "label": "name",
                //     "size": "name",
                //     "community": "community",
                //     "title_properties": [
                //         "label",
                //     ],
                //     mappedProp: "prop from neo4j node",
                //     [NEOVIS_ADVANCED_CONFIG]: {
                //         static: {
                //             color: "#122620" // static property is a constant property for all nodes of the type
                //         },
                //     },
                // },
                // "WORKUP" : {
                //     "label": "name",
                //     "size": "name",
                //     "community": "community",
                //     "title_properties": [
                //         "label",
                //     ],
                //     mappedProp: "prop from neo4j node",
                //     [NEOVIS_ADVANCED_CONFIG]: {
                //         static: {
                //             color: "#7700b3" // static property is a constant property for all nodes of the type
                //         },
                //     },
                // },
                // "IMAGING;PROCEDURE" : {
                //     "label": "name",
                //     "size": "name",
                //     "community": "community",
                //     "title_properties": [
                //         "label",
                //     ],
                //     mappedProp: "prop from neo4j node",
                //     [NEOVIS_ADVANCED_CONFIG]: {
                //         static: {
                //             color: "#cda5f3" // static property is a constant property for all nodes of the type
                //         },
                //     },
                // },
                // "IMAGING;SCREENING" : {
                //     "label": "name",
                //     "size": "name",
                //     "community": "community",
                //     "title_properties": [
                //         "label",
                //     ],
                //     mappedProp: "prop from neo4j node",
                //     [NEOVIS_ADVANCED_CONFIG]: {
                //         static: {
                //             color: "#8674aa" // static property is a constant property for all nodes of the type
                //         },
                //     },
                // },
                // "PHYSICAL_FINDINGS" : {
                //     "label": "name",
                //     "size": "name",
                //     "community": "community",
                //     "title_properties": [
                //         "label",
                //     ],
                //     mappedProp: "prop from neo4j node",
                //     [NEOVIS_ADVANCED_CONFIG]: {
                //         static: {
                //             color: "#99ff99" // static property is a constant property for all nodes of the type
                //         },
                //     },
                // },
                // "SUGGESTION" : {
                //     "label": "name",
                //     "size": "name",
                //     "community": "community",
                //     "title_properties": [
                //         "label",
                //     ],
                //     mappedProp: "prop from neo4j node",
                //     [NEOVIS_ADVANCED_CONFIG]: {
                //         static: {
                //             color: "#99ff99" // static property is a constant property for all nodes of the type
                //         },
                //     },
                // },
                // "TEST" : {
                //     "label": "name",
                //     "size": "name",
                //     "community": "community",
                //     "title_properties": [
                //         "label",
                //     ],
                //     mappedProp: "prop from neo4j node",
                //     [NEOVIS_ADVANCED_CONFIG]: {
                //         static: {
                //             color: "#9d2c15" // static property is a constant property for all nodes of the type
                //         },
                //     },
                // },
                // "IMAGING" : {
                //     "label": "name",
                //     "size": "name",
                //     "community": "community",
                //     "title_properties": [
                //         "label",
                //     ],
                //     mappedProp: "prop from neo4j node",
                //     [NEOVIS_ADVANCED_CONFIG]: {
                //         static: {
                //             color: "#9d7215" // static property is a constant property for all nodes of the type
                //         },
                //     },
                // },
                // "DIAGNOSIS": {
                //     "label": "name",
                //     "size": "name",
                //     "community": "community",
                //     "title_properties": [
                //         "label",
                //     ],
                //     mappedProp: "prop from neo4j node",
                //     [NEOVIS_ADVANCED_CONFIG]: {
                //         static: {
                //             color: "#FF9671" // static property is a constant property for all nodes of the type
                //         },
                //     },
                // },
                // "SCREENING_STEP" : {
                //     "label": "name",
                //     "size": "name",
                //     "community": "community",
                //     "title_properties": [
                //         "label",
                //     ],
                //     mappedProp: "prop from neo4j node",
                //     [NEOVIS_ADVANCED_CONFIG]: {
                //         static: {
                //             color: "#008F7A" // static property is a constant property for all nodes of the type
                //         },
                //     },
                // },
                // "PROCEDURE" : {
                //     "label": "name",
                //     "size": "name",
                //     "community": "community",
                //     "title_properties": [
                //         "label",
                //     ],
                //     mappedProp: "prop from neo4j node",
                //     [NEOVIS_ADVANCED_CONFIG]: {
                //         static: {
                //             color: "#4B4453" // static property is a constant property for all nodes of the type
                //         },
                //     },
                // },
                //label1
                "Rules": {
                    "label": "name",
                    "size": "name",
                    "community": "community",
                    "title_properties": [
                        "label",
                    ],
                    mappedProp: "prop from neo4j node",
                    [NEOVIS_ADVANCED_CONFIG]: {
                        static: {
                            color: "red" // static property is a constant property for all nodes of the type
                        },
                    },
                },

                //label2
                "Company": {
                    "label": "name",
                    "size": "name",
                    "community": "label",
                    mappedProp: "prop from neo4j node",
                    [NEOVIS_ADVANCED_CONFIG]: {
                        static: {
                            color: "#79DA61" // static property is a constant property for all nodes of the type
                        }
                    },
                },
                //label3
                "College": {
                    "label": "name",
                    "size": "name",
                    "community": "label",
                },
                //label4
                "Screening_step": {
                    "label": "name",
                    "size": "name",
                    "community": "label",
                    mappedProp: "prop from neo4j node",
                    [NEOVIS_ADVANCED_CONFIG]: {
                        static: {
                            color: "green" // static property is a constant property for all nodes of the type
                        }
                    },
                },
                //label5
                "Image_findings": {
                    "label": "name",
                    "size": "name",
                    "community": "label",
                    mappedProp: "prop from neo4j node",
                    [NEOVIS_ADVANCED_CONFIG]: {
                        static: {
                            color: "purple" // static property is a constant property for all nodes of the type
                        }
                    },
                },
                "karthiklabel": {
                    "label": "name",
                    "size": "name",
                    "community": "label",
                    // "id":"id",
                    mappedProp: "prop from neo4j node",
                    [NEOVIS_ADVANCED_CONFIG]: {
                        static: {
                            color: "black" // static property is a constant property for all nodes of the type
                        }
                    },
                },
                //label6
                "Sairam": {
                    "label": "name",
                    "size": "name",
                    "community": "label",
                    mappedProp: "prop from neo4j node",
                    [NEOVIS_ADVANCED_CONFIG]: {
                        static: {
                            color: "orange" // static property is a constant property for all nodes of the type
                        },
                        // function: {
                        //     title: NeoVis.objectToTitleHtml
                        // },
                    },
                },
                //label7
                "Ind": {
                    "label": "name",
                    "size": "name",
                    "community": "label",
                    mappedProp: "prop from neo4j node",
                    [NEOVIS_ADVANCED_CONFIG]: {
                        static: {
                            color: "#a56eff" // static property is a constant property for all nodes of the type
                        },
                        functions: {
                            // group: (node) => node.raw.labels[0],
                            // title: (props) => NeoVis.objectToTitleHtml(props, ["name"])
                            label: (node) => "name"
                        },
                    },
                },
                "PROCEDURE": {
                    "label": "name",
                    "size": "name",
                    "community": "label",
                    mappedProp: "prop from neo4j node",
                    [NEOVIS_ADVANCED_CONFIG]: {
                        static: {
                            color: "#a56eff" // static property is a constant property for all nodes of the type
                        },
                        functions: {
                            // group: (node) => node.raw.labels[0],
                            // title: (props) => NeoVis.objectToTitleHtml(props, ["name"])
                            label: (node) => "name"
                        },
                    },
                },
            },
            ///////TRYYY15Sep
            // labels: {
            //     [NeoVis.NEOVIS_DEFAULT_CONFIG]: { // or NEOVIS_DEFAULT_CONFIG if you're importing it es6 way
            //         "label": "name",
            //         "size": "name",
            //         "community": "label",
            //         [NEOVIS_ADVANCED_CONFIG]: {
            //             functions: {
            //                group: (node) => node.raw.labels[0],
            //             //    label: (node) => node.name,
            //             //    title: (props) => NeoVis.objectToTitleHtml(props, ["name", "pagerank"])
            //             }
            //         }
            //         // mappedProp: "prop from neo4j node"
            //     },
            //     // [NEOVIS_ADVANCED_CONFIG]: {
            //     //     functions: {
            //     //        group: (node) => node.raw.labels[0],
            //     //     //    label: (node) => node.name,
            //     //     //    title: (props) => NeoVis.objectToTitleHtml(props, ["name", "pagerank"])
            //     //     }
            //     // }
            // },
            relationships: {
                [NeoVis.NEOVIS_DEFAULT_CONFIG]: { // or NEOVIS_DEFAULT_CONFIG if you're importing it es6 way
                    "thickness": 2
                }
            },
            initialCypher: initCypher
            // initialCypher: "MATCH (m), (a)-[r]->(b) RETURN a,b,r,m ",
            // initialCypher: "MATCH (n) WHERE id(n) IN [56,50] MATCH (q:Image_findings)-[b *..2]->(r) WHERE q.name = 'psg tech' RETURN n, q, r, b"
        };
        console.log(config)
        neoViz = new NeoVis(config);
        neoViz.render();

        // const canvas = document.getElement'canvas');
        // console.log(canvas.width); // 300
        neoViz.registerOnEvent("completed", (e) => {
            console.log(e)
            // neoViz["_network"].on("click", (event)=>{
            //     //...put here what happen when click on a node or edge...
            //     console.log("OKAY, click event!")
            // });
            console.log("Complete event start.");
            // neoViz.network.onClick((nodes) => console.log(nodes));
            //neoViz._network.on("click", (nodes) => console.log(nodes));
            // neoViz._network.on("clickNode", (nodes) => console.log(nodes));
            neoViz.registerOnEvent('clickNode', (properties) => {

                console.log("_____NODE CLICK____")
                console.log(properties)
                console.log(properties.node.id)
                setNodeId(properties.node.id)
                // console.log(properties.node.label)
                console.log(properties.node.raw.properties['name'])
                console.log(properties.node.raw.labels[0])
                console.log(properties.node.raw.properties)
                console.log(Object.keys(properties.node.raw.properties))
                console.log(Object.values(properties.node.raw.properties))

                const nodname = properties.node.raw.properties['name']
                const nodtype = properties.node.raw.labels[0]
                localStorage.setItem("nodename", nodname)
                localStorage.setItem("nodetypedd", nodtype)
                const arr_props = properties.node.raw.properties;
                const prop_keys = Object.keys(properties.node.raw.properties)
                const prop_values = Object.values(properties.node.raw.properties)
                nodeRows = Object.entries(arr_props)

                document.getElementById("toolkittext_nname_pdf").focus();
                // for (const cypher of cyphers) {
                //     neoViz.updateWithCypher(cypher);
                //   }
                setName(nodname)
                localStorage.setItem("nname", nodname)
                localStorage.setItem("ntype", nodtype)
                setType(nodtype)
                // nodeRows = []
                // Do something
            });
            neoViz.registerOnEvent('clickEdge', (properties) => {
                console.log("_____EDGE CLICK____")
                console.log(properties)
                console.log(properties.edge.from)
                console.log(properties.edge.to)
                console.log(properties.edgeId)
                console.log(properties.edge.raw.properties)

                const relnode1ID = properties.edge.from
                const relnode2ID = properties.edge.to
                const edgeId = properties.edgeId
                const arr_edge_props = properties.edge.raw.properties

                setRelNode1ID(relnode1ID)
                setRelNode2ID(relnode2ID)
                console.log(getNodesNameFromRelID(edgeId))
                // console.log(name_dict)
                setEdgeId(edgeId)
                relnPropRows = Object.entries(arr_edge_props)
            });
            console.log("Complete event end.");
            // neoViz._network.on()
        });
        
    }
    const onChangeNodeName = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    return (
        <div>
            {/* <AppBar position="static">
                <Toolbar variant="dense" style={{backgroundColor: "#26A69A"}} >
                    <Typography variant="h6" color="inherit" component="div" >
                        NCCN UI Tool
                    </Typography>
                </Toolbar>
            </AppBar> */}
            {/* <PlayingwithNeovisGraph></PlayingwithNeovisGraph> */}
            {/* NEOVIS _ integrated new module */}
            <Button onClick={(e) => neoVizRelationship(e, "MATCH (m), (a)-[r]->(b) RETURN a,b,r,m ")} color="secondary">Render Graph</Button>
            <div id="maindiv" className="maindiv">

            </div>
            <Box display="flex" justifyContent="center">
                <Autocomplete
                    style={{justifyContent: "center", display: "block", alignItems: "center" }}
                    disablePortal
                    onFocus = {(e) => getNodesFromServer(e)}
                    justifyContent="flex-end"
                    id="nodenamesdd"
                    style={{ color: "white" }}
                    options={options}
                    sx={{ width: 200 }}
                    color="primary"
                    size="small"
                    onChange={(event) => { onNodeSelect(event) }}
                    renderInput={(params) => <TextField {...params} label="Choose Node" style={{ color: "white" }} />}
                />
                <br></br>
                <Button onClick={(e) => onRenderSpecificHandle(e)}> Render Specific to this</Button>
            </Box>
            {/* <JustNeovis></JustNeovis> */}
            {/* <iframe id="maindiv" onLoad={neoVizRelationship()}></iframe> */}

            <div id="tooltip">
                {/* <p id="toolkittext"></p> */}
                <br></br>
            </div>
            <div id="tooltip">
                <AppBar position="static">
                    <Toolbar variant="dense" style={{backgroundColor: "#26A69A"}} >
                        <Typography variant="h6" color="inherit" component="div" >
                            Editor
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
                            {console.log(localStorage.getItem("select_nname"))}
                            {console.log(localStorage.getItem("select_ntype"))}
                            {console.log(typeof(nodeRows))}
                            <TextField disabled="true" id="toolkittext_nname_pdf" value={localStorage.getItem("select_nname")} onChange={(e) => onChangeNodeName(e)} label="Node Name"></TextField>
                            <br></br>
                            <TextField disabled="true" id="toolkittext" value={localStorage.getItem("select_ntype")} label="Node Type"></TextField>
                            <br></br><br></br>
                            <Button variant="contained" color="error" onClick={(e) => nodeDelete(e)}>
                                Delete Node
                            </Button>
                            <Snackbar
                                open={openDeleteNotif}
                                autoHideDuration={6000}
                                onClose={handleClose}
                                message="Deleted Node!"
                            />
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 350 }} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Property Key</TableCell>
                                            <TableCell align="center">Property Value&nbsp;(g)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {console.log(nodeRows)}
                                        {nodeRows.map((row) => (
                                            <TableRow
                                                key={row[0]}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="center" component="th" scope="row">
                                                    {row[0]}
                                                </TableCell>
                                                <TableCell align="center">{row[1]}</TableCell>
                                                <TableCell>
                                                    <IconButton aria-label="delete" onClick={(e) => deleteProperty(e, row[0])}>
                                                        <DeleteIcon />
                                                    </IconButton>

                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <PropertyUpdateNode></PropertyUpdateNode> <br></br>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                {/* <AppBar position="static">
                    <Toolbar variant="dense" style={{backgroundColor: "#26A69A"}} >
                        <Typography variant="h6" color="inherit" component="div" >
                            Relationships
                        </Typography>
                    </Toolbar>
                </AppBar> */}
                {/* RELATIONSHIPPPPPPPP */}
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
                            <TextField value={edgeId} label="Relationship ID"></TextField><br></br>
                            <TextField id="toolkittext" value={relnode1ID} label="Relationship Node1"></TextField>
                            <br></br>
                            <TextField id="toolkittext" value={relnode2ID} label="Relationship Node2"></TextField>
                            <br></br>
                            <TextField id="toolkittext" value={relnode1Name} label="Relationship Node1 Name"></TextField>
                            &nbsp; &nbsp;  -> &nbsp; &nbsp;
                            <TextField id="toolkittext" value={relnode2Name} label="Relationship Node2 Name"></TextField>
                            <br></br><br></br>
                            <Button variant="contained" color="error" onClick={(e) => relDelete(e)}>
                                Delete Relationship
                            </Button>
                            <Snackbar
                                open={openDeleteRelnNotif}
                                autoHideDuration={6000}
                                onClose={handleClose}
                                message="Deleted Relationship!"
                            />
                            <br></br>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 350 }} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Property Key</TableCell>
                                            <TableCell align="center">Property Value&nbsp;(g)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {relnPropRows.map((row) => (
                                            <TableRow
                                                key={row[0]}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="center" component="th" scope="row">
                                                    {row[0]}
                                                </TableCell>
                                                <TableCell align="center">{row[1]}</TableCell>
                                                <TableCell>
                                                    <IconButton aria-label="delete" onClick={(e) => deleteProperty_Reln(e, row[0])}>
                                                        <DeleteIcon />
                                                    </IconButton>

                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {/* <Box display="flex" justifyContent="center">
                                <Autocomplete
                                    onFocus={(e) => getPropKeysFromServer(e)}
                                    style={{ marginRight: "16px", justifyContent: "center", display: "block", alignItems: "center" }}
                                    disablePortal
                                    id="relnshipPropKey"
                                    sx={{ width: 200 }}
                                    options={options_relprop}
                                    onChange={(event) => { onRelnshipPropkeySelect(event) }}
                                    renderInput={(params) => <TextField {...params} label="Reln Property Key" />}
                                />
                                <TextField
                                    id="propvalue"
                                    onChange={(e) => { console.log(e.target.value) }}
                                    label={"Property Value"} //optional
                                    ref={inputClearRef}
                                    name="propvalue"
                                />
                            </Box> */}
                            <PropertyUpdate relnID={edgeId}></PropertyUpdate>
                        </Typography>
                    </AccordionDetails>
                </Accordion>

            </div>
        </div>
    );
}