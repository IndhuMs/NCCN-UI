import React, { Component } from 'react';
import NeoVis from 'neovis.js';
import { NEOVIS_ADVANCED_CONFIG } from 'neovis.js'
let neoViz;
function neoVizRelationship() {
    //CONSTRUCT NEOVIS CONFIG for Neo4J graph display
    const config = {
        containerId: "maindiv",
        neo4j: {
            //Sample NEO4j db
            serverUrl: "neo4j://<db_id>.databases.neo4j.io/",
            arrows: true,
            serverUser: "neo4j",
            serverPassword: "<pass>",
            // encrypted: 'ENCRYPTION_ON',
        },
        visConfig: {
            interaction: {
                hover: true,
                hoverConnectedEdges: true,
                zoomView: true,
            },
            nodes: {
                // mass: 2,
                shape: 'circle',
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
            "Node Label": {
                "label": "name",
                "size": "name",
                "community": "label",
                mappedProp: "prop from neo4j node",
                [NEOVIS_ADVANCED_CONFIG]: {
                    static: {
                        color: "orange"
                    },
                },
            },
            //other labels
        },
        relationships: {
            [NeoVis.NEOVIS_DEFAULT_CONFIG]: {
                "thickness": 2
            }
        },
        initialCypher: "MATCH (m), (a)-[r]->(b) RETURN a,b,r,m "
    };
    console.log(config)
    neoViz = new NeoVis(config);
    //rendering neovis with above config through foll. API call @line 70.
    neoViz.render();
}
export default function NeovisRendering() {
    return (
        <div id="maindiv" onClick={neoVizRelationship()} className="maindiv">
            Neovis display container!
        </div>
    )
}