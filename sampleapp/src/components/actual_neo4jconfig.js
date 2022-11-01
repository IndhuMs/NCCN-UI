//this file stores the actual cconfig of neo4j database
const config = {
            containerId: "maindiv",
            neo4j: {
                //Sample NEO4j db
                //serverUrl: "neo4j://c822ccbf.databases.neo4j.io:7687/",
                serverUrl: "neo4j://e9c642e9.databases.neo4j.io",
                arrows: true,
                serverUser: "neo4j",
                serverPassword:"3yKkqqHaeAsy6mvk_aswwLpCPAy2O_Ep2qQQaGoAORE",
                //serverPassword: "qhbT-2MoWJhDMHcxZ-uBy1MAoinlIpm-p32Hq687BGk",
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
                        maximum: 90
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
                //ACTUAL LABELS START
                "CRITERIA" : {
                    "label": "name",
                    "size": "name",
                    "community": "community",
                    "title_properties": [
                        "label",
                    ],
                    mappedProp: "prop from neo4j node",
                    [NEOVIS_ADVANCED_CONFIG]: {
                        static: {
                            color: "#2FF3E0" // static property is a constant property for all nodes of the type
                        },
                    },
                },
                "SURVEILLANCE_FOLLOWUP" : {
                    "label": "name",
                    "size": "name",
                    "community": "community",
                    "title_properties": [
                        "label",
                    ],
                    mappedProp: "prop from neo4j node",
                    [NEOVIS_ADVANCED_CONFIG]: {
                        static: {
                            color: "#F8D210" // static property is a constant property for all nodes of the type
                        },
                    },
                },
                "IMAGING;SURVEILLANCE_FOLLOWUP" : {
                    "label": "name",
                    "size": "name",
                    "community": "community",
                    "title_properties": [
                        "label",
                    ],
                    mappedProp: "prop from neo4j node",
                    [NEOVIS_ADVANCED_CONFIG]: {
                        static: {
                            color: "#FA26A0" // static property is a constant property for all nodes of the type
                        },
                    },
                },
                "DECISION_NODE" : {
                    "label": "name",
                    "size": "name",
                    "community": "community",
                    "title_properties": [
                        "label",
                    ],
                    mappedProp: "prop from neo4j node",
                    [NEOVIS_ADVANCED_CONFIG]: {
                        static: {
                            color: "#F51720" // static property is a constant property for all nodes of the type
                        },
                    },
                },
                 "INDICATION": {
                    "label": "name",
                    "size": "name",
                    "community": "community",
                    "title_properties": [
                        "label",
                    ],
                    mappedProp: "prop from neo4j node",
                    [NEOVIS_ADVANCED_CONFIG]: {
                        static: {
                            color: "#81B622" // static property is a constant property for all nodes of the type
                        },
                    },
                },
                "START" : {
                    "label": "name",
                    "size": "name",
                    "community": "community",
                    "title_properties": [
                        "label",
                    ],
                    mappedProp: "prop from neo4j node",
                    [NEOVIS_ADVANCED_CONFIG]: {
                        static: {
                            color: "#050A30" // static property is a constant property for all nodes of the type
                        },
                    },
                },
                "STEP" : {
                    "label": "name",
                    "size": "name",
                    "community": "community",
                    "title_properties": [
                        "label",
                    ],
                    mappedProp: "prop from neo4j node",
                    [NEOVIS_ADVANCED_CONFIG]: {
                        static: {
                            color: "#ECF87F" // static property is a constant property for all nodes of the type
                        },
                    },
                },
                "SUBPROCEDURE_NODE" : {
                    "label": "name",
                    "size": "name",
                    "community": "community",
                    "title_properties": [
                        "label",
                    ],
                    mappedProp: "prop from neo4j node",
                    [NEOVIS_ADVANCED_CONFIG]: {
                        static: {
                            color: "#0000FF" // static property is a constant property for all nodes of the type
                        },
                    },
                },
                "IMAGE_FINDINGS" : {
                    "label": "name",
                    "size": "name",
                    "community": "community",
                    "title_properties": [
                        "label",
                    ],
                    mappedProp: "prop from neo4j node",
                    [NEOVIS_ADVANCED_CONFIG]: {
                        static: {
                            color: "#F8AFA6" // static property is a constant property for all nodes of the type
                        },
                    },
                },
                "TREATMENT" : {
                    "label": "name",
                    "size": "name",
                    "community": "community",
                    "title_properties": [
                        "label",
                    ],
                    mappedProp: "prop from neo4j node",
                    [NEOVIS_ADVANCED_CONFIG]: {
                        static: {
                            color: "#B68D40" // static property is a constant property for all nodes of the type
                        },
                    },
                },
                "HISTOLOGY": {
                    "label": "name",
                    "size": "name",
                    "community": "community",
                    "title_properties": [
                        "label",
                    ],
                    mappedProp: "prop from neo4j node",
                    [NEOVIS_ADVANCED_CONFIG]: {
                        static: {
                            color: "#122620" // static property is a constant property for all nodes of the type
                        },
                    },
                },
                "WORKUP" : {
                    "label": "name",
                    "size": "name",
                    "community": "community",
                    "title_properties": [
                        "label",
                    ],
                    mappedProp: "prop from neo4j node",
                    [NEOVIS_ADVANCED_CONFIG]: {
                        static: {
                            color: "#7700b3" // static property is a constant property for all nodes of the type
                        },
                    },
                },
                "IMAGING;PROCEDURE" : {
                    "label": "name",
                    "size": "name",
                    "community": "community",
                    "title_properties": [
                        "label",
                    ],
                    mappedProp: "prop from neo4j node",
                    [NEOVIS_ADVANCED_CONFIG]: {
                        static: {
                            color: "#cda5f3" // static property is a constant property for all nodes of the type
                        },
                    },
                },
                "IMAGING;SCREENING" : {
                    "label": "name",
                    "size": "name",
                    "community": "community",
                    "title_properties": [
                        "label",
                    ],
                    mappedProp: "prop from neo4j node",
                    [NEOVIS_ADVANCED_CONFIG]: {
                        static: {
                            color: "#8674aa" // static property is a constant property for all nodes of the type
                        },
                    },
                },
                "PHYSICAL_FINDINGS" : {
                    "label": "name",
                    "size": "name",
                    "community": "community",
                    "title_properties": [
                        "label",
                    ],
                    mappedProp: "prop from neo4j node",
                    [NEOVIS_ADVANCED_CONFIG]: {
                        static: {
                            color: "#99ff99" // static property is a constant property for all nodes of the type
                        },
                    },
                },
                "SUGGESTION" : {
                    "label": "name",
                    "size": "name",
                    "community": "community",
                    "title_properties": [
                        "label",
                    ],
                    mappedProp: "prop from neo4j node",
                    [NEOVIS_ADVANCED_CONFIG]: {
                        static: {
                            color: "#99ff99" // static property is a constant property for all nodes of the type
                        },
                    },
                },
                "TEST" : {
                    "label": "name",
                    "size": "name",
                    "community": "community",
                    "title_properties": [
                        "label",
                    ],
                    mappedProp: "prop from neo4j node",
                    [NEOVIS_ADVANCED_CONFIG]: {
                        static: {
                            color: "#9d2c15" // static property is a constant property for all nodes of the type
                        },
                    },
                },
                "IMAGING" : {
                    "label": "name",
                    "size": "name",
                    "community": "community",
                    "title_properties": [
                        "label",
                    ],
                    mappedProp: "prop from neo4j node",
                    [NEOVIS_ADVANCED_CONFIG]: {
                        static: {
                            color: "#9d7215" // static property is a constant property for all nodes of the type
                        },
                    },
                },
                "DIAGNOSIS": {
                    "label": "name",
                    "size": "name",
                    "community": "community",
                    "title_properties": [
                        "label",
                    ],
                    mappedProp: "prop from neo4j node",
                    [NEOVIS_ADVANCED_CONFIG]: {
                        static: {
                            color: "#FF9671" // static property is a constant property for all nodes of the type
                        },
                    },
                },
                "SCREENING_STEP" : {
                    "label": "name",
                    "size": "name",
                    "community": "community",
                    "title_properties": [
                        "label",
                    ],
                    mappedProp: "prop from neo4j node",
                    [NEOVIS_ADVANCED_CONFIG]: {
                        static: {
                            color: "#008F7A" // static property is a constant property for all nodes of the type
                        },
                    },
                },
                "PROCEDURE" : {
                    "label": "name",
                    "size": "name",
                    "community": "community",
                    "title_properties": [
                        "label",
                    ],
                    mappedProp: "prop from neo4j node",
                    [NEOVIS_ADVANCED_CONFIG]: {
                        static: {
                            color: "#4B4453" // static property is a constant property for all nodes of the type
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