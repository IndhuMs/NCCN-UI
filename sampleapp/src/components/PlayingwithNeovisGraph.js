import React, { Component } from 'react';
import NeoVis from 'neovis.js';
import { NEOVIS_ADVANCED_CONFIG } from 'neovis.js'
import { useRef } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, createContext, useContext } from "react";
import Box from '@mui/material/Box';
import axios from 'axios';
import '../css/neovis.css';

let neoViz;
var nodeRows = new Array();
var relnPropRows = new Array();
var relnPropkeys = {};
const topicOptions = [
    "Screening",
    "Treatment"
  ]
export default function NeovisSairam({TopicContext}) {
    const topic = useContext(TopicContext);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [nodeId, setNodeId] = useState(0);
    const [relnode1ID, setRelNode1ID] = useState('');
    const [edgeId, setEdgeId] = useState('');
    const [relnode2ID, setRelNode2ID] = useState('');
    const [relnode1Name, setRelNode1Name] = useState('');
    const [relnode2Name, setRelNode2Name] = useState('');
    const [options, setOptions] = React.useState([]);
    const [nodeIdsArray, setNodeIdsArray] = React.useState([]);
    const getNodesFromServer = (e) => {
        <h2>{`Hello ${topic} again!`}</h2>
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
                [NeoVis.NEOVIS_DEFAULT_CONFIG]: { // or NEOVIS_DEFAULT_CONFIG if you're importing it es6 way
                    "label": "name",
                    "size": "name",
                    "community": "label",
                    // mappedProp: "prop from neo4j node"
                }
            },
            relationships: {
                [NeoVis.NEOVIS_DEFAULT_CONFIG]: { // or NEOVIS_DEFAULT_CONFIG if you're importing it es6 way
                    "thickness": 2
                }
            },
            // initialCypher: initCypher
            // initialCypher: "MATCH (m), (a)-[r]->(b) RETURN a,b,r,m ",
            // initialCypher: "MATCH (n) WHERE id(n) IN [56,50] MATCH (q:Image_findings)-[b *..2]->(r) WHERE q.name = 'psg tech' RETURN n, q, r, b"
            initialCypher: "match (n) where n.newproper='true' match (a)-[r]->(b) where a.newproper = 'true' or b.newproper = 'true' return a,b,r,n"
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
            console.log(neoViz.nodes)
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
        const query = `MATCH (p)-[r *..1]->(c) WHERE id(p) = ${selectedId} RETURN p,c,r`
        console.log(query)
        neoVizRelationship(e, query)
    }
    return (
        <div>
            <Button onClick={(e) => neoVizRelationship(e, "MATCH (m), (a)-[r]->(b) RETURN a,b,r,m ")} color="secondary">Render Graph</Button>
            {/* <Button onClick={(e) => neoVizRelationship(e, "MATCH (p)-[r *..1]->(c) WHERE id(p) = 56 RETURN p,c,r")} color="secondary">Render Graph</Button> */}
            <div id="maindiv" className="maindiv"></div>
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
        </div>
    )

}