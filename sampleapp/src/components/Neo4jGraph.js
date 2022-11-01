import * as d3 from 'd3';
import React, {Component} from 'react';

export default function Neo4jGraph() {
    const drawChart = (event) => {
        event.preventDefault();
        d3.scaleTime()
        console.log("hi entred neo4j func")
        var margin =
            { top: 10, right: 30, bottom: 30, left: 40 },
            width = 800 - margin.left - margin.right,
            height = 800 - margin.top - margin.bottom;

            // append the svg object to the body of the page
            var svg = d3.select("#hello")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

          
            // let data_input = require("https://raw.githubusercontent.com/niveydhithaa/NccnUiToolRepo/main/nccn_json.json")
            // let data_input = require('./nccn_data.json')    
            var data_input;
            fetch('http://localhost:5000/exportdata', {
                headers : { 
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                  'Accept': 'application/json',
                  'mode': 'no-cors'
                 }
          
              })
              .then(function(response) {
                    data_input = response.json();
                    return data_input;
              })
              .then(function(data) {
                console.log(data); // this will be a string
              });  

            d3.json('http://localhost:5000/exportdata').then(function(data){ console.log(data)
              console.log(data.links)
            
                var textsAndNodes = svg.append("g")
                    .selectAll("g")
                    .data(data.nodes)
                    .enter()
                    .append("g");
                
                var circles = textsAndNodes.append('circle')
                    .attr("fill","aquamarine")
                    .attr("r", 20);
                textsAndNodes.on('click', function(d,i){ 
                    console.log("Hi") 
                    console.log(d3.select("#circles"))
                        // .style("fill", "red");
                })
                
                var texts = textsAndNodes
                    .append('text')
                    .style("font-size", 12)
                    .text(function(d) {return d.name ; });
                
                //accomodate starts
                // var w = 10;
                // var h = 10;  
                // var pad = 4;
                // var bbox = texts.node().getBBox();
                // w = Math.max(w,bbox.width);
                // h = Math.max(h,bbox.height);
                // circles
                //     .attr("r", Math.sqrt(w*w + h*h)/2 + pad)
                //     .on('mouseenter', function(d) {return d.name});
                // console.log(Math.sqrt(w*w + h*h)/2 + pad)

                //accomodate ends
                console.log(texts)
                
                var links = svg
                    .selectAll("line")
                    .data(data.links)
                    .enter()
                    .append("line")
                    .style("stroke", "#aaa")
                    //new
                    .attr("stroke-width",1)  
                  // define arrow markers for graph links
                links.append('svg:defs').append('svg:marker')
                .attr('id', 'end-arrow')
                .attr('viewBox', '0 -5 10 10')
                .attr('refX', 6)
                .attr('markerWidth', 3)
                .attr('markerHeight', 3)
                .attr('orient', 'auto')
                .append('svg:path')
                .attr('d', 'M0,-5L10,0L0,5')
                .attr('fill', '#000');

                links.append('svg:defs').append('svg:marker')
                .attr('id', 'start-arrow')
                .attr('viewBox', '0 -5 10 10')
                .attr('refX', 4)
                .attr('markerWidth', 3)
                .attr('markerHeight', 3)
                .attr('orient', 'auto')
                .append('svg:path')
                .attr('d', 'M10,-5L0,0L10,5')
                .attr('fill', '#000');

                var path = svg.append("svg:g").selectAll("path")
                    .data(data.links)
                    .enter().append("svg:path")
                    .attr("marker-end", "url(#" + window.location.href + "/end)"); // not .attr("marker-end", "url(#end)");
                
                // svg.append(defs);
                 // Let's list the force we wanna apply on the network
                var simulation = d3
                    .forceSimulation(data.nodes)
                    .force("link", d3.forceLink(data.links).id(function (d) { return d.id; }))                     // This provide  the id of a node                           // and this the list of links)                 // Force algorithm is applied to data.nodes
                    .force("charge", d3.forceManyBody().strength(-60))         // This adds repulsion between nodes. Play with the -400 for the repulsion strength
                    .force("center", d3.forceCenter(width / 2, height / 2))     // This force attracts nodes to the center of the svg area
                    .on("tick", ticked);
                
                //add drag capabilities  
                var drag_handler = d3.drag()
                .on("start", drag_start)
                .on("drag", drag_drag)
                .on("end", drag_end); 
                
                drag_handler(textsAndNodes);
                //add zoom capabilities 
                // var zoom_handler = d3.zoom()
                //     .on("zoom", zoom_actions);

                // zoom_handler(svg);     

                /** Functions **/

                //Drag functions 
                //d is the node 
                function drag_start(d) {
                if (!d3.event.active) simulation.alphaTarget(0.3).restart();
                    d.fx = d.x;
                    d.fy = d.y;
                }

                //make sure you can't drag the circle outside the box
                function drag_drag(d) {
                d.fx = d3.event.x;
                d.fy = d3.event.y;
                }

                function drag_end(d) {
                if (!d3.event.active) simulation.alphaTarget(0);
                d.fx = null;    
                d.fy = null;
                }

                //Zoom functions 
                // function zoom_actions(){
                //     g.attr("transform", d3.event.transform)
                // }

                //This function is run at each iteration of the force algorithm, updating the nodes position.
                function ticked() {
                    textsAndNodes
                        .attr("transform", function(d) {
                            return "translate(" + d.x + "," + d.y + ")" ; 
                        })
                    links
                        .attr("x1", function (d) { return d.source.x; })
                        .attr("y1", function (d) { return d.source.y; })
                        .attr("x2", function (d) { return d.target.x; })
                        .attr("y2", function (d) { return d.target.y; });
                    
                        // .attr("cx", function (d) { return d.x + 6; })
                        // .attr("cy", function (d) { return d.y - 6; });
                }
            });
        console.log("exit neo4j func")
    }
    return (<div id="hello" onClick={(event) => drawChart(event)}>CLCK me</div>);
}