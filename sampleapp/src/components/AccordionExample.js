import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import NeoVis from 'neovis.js';
import { NEOVIS_ADVANCED_CONFIG } from 'neovis.js'
import '../css/neovis.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import * as React from 'react';
import BasicGraphEditor from '../components/BasicGraphEditor';
import JustNeovis from '../components/JustNeovis'
import BasicRelationshipEditor from '../components/BasicRelationshipEditor';
import { useState, createContext, useContext } from "react";

const topicOptions = [
    "Screening",
    "Treatment"
]
let neoViz;
function neoVizRelationship(e, initCypher) {

    e.preventDefault()
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

    neoViz.registerOnEvent("completed", (e) => {
        console.log(e)
        console.log("Complete event start.");
        console.log("Complete event end.");
        // neoViz._network.on()
    });

}
export default function AccordionExample() {
    const onTopicSelect = (event) => {
        event.preventDefault();

        console.log(event.target.value)
    }
    const commitTopic = (event) => {
        localStorage.setItem("topic", document.getElementById("topicdropdown").value)
        console.log(localStorage.getItem("topic"))
        // setTopic(localStorage.getItem("topic"))
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
                        <BasicGraphEditor></BasicGraphEditor>
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
                        <BasicRelationshipEditor></BasicRelationshipEditor>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            {/* <Accordion disabled>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Disabled Accordion</Typography>
        </AccordionSummary>
      </Accordion> */}
        </div>
    );
}
