import React, { useState } from "react";
import { Menu, MenuItem, Typography } from "@material-ui/core";
import TextEditor from "./tries_separatemodules/TextEditorDraftJS"
import AccExampleTwo from './AccordionExample_Editor'
import axios from 'axios'
import NestedMenuItem from "material-ui-nested-menu-item";
import '../css/dashboard.css'
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import PDFModule from '../components/tries_separatemodules/UploadandViewPDF'
import { local } from "d3";
let nestedOptions = [
    { title: 'Good Morning', score: '' },
    { title: 'Good Evening' },
    { title: 'Good Night' },
    { title: 'Good Afternoon' }
]

export const NestedMenu = () => {
    const [menuPosition, setMenuPosition] = useState(null);
    const [semanticClick, setSemanticClick] = useState(false);
    const [relnSemanticClick, setRelnSemanticClick] = useState(false);
    const [isPropValueFromSelect, setPropValueFromSelect] = useState(false);
    const [isRELPropValueFromSelect, setRELPropValueFromSelect] = useState(false);
    let nodeToAdd_name;
    let relnProp_toAdd;
    let nodeToAdd_propValue;
    let relnAdd_propValue;
    let nodeToAdd_propKey;
    const [suggestions, setSuggestions] = useState([{}])
    const [suggestions_reln, setSuggestionsReln] = useState([{}])
    const [isSuggestionsThere, setIsSuggestionsThere] = useState(false)
    const hit_getRelnSemantics = (e) => {
        setRelnSemanticClick(false)
        var select_dict = {}
        // nodeToAdd_propKey = localStorage.getItem("SELECTEDTEXT_ORIGIN")
        // localStorage.setItem("selected_nodePropKey", nodeToAdd_propKey)
        select_dict['selectedText'] = localStorage.getItem("SELECTEDTEXT_ORIGIN")
        console.log(select_dict)

        axios
            .post('http://127.0.0.1:5000/noderelationsemantic', { select_dict })
            .then(result => {
                // console.log(result);
                console.log(result.data);
                setSuggestionsReln(result.data.suggestions)
                if(suggestions_reln.length==0)
                {
                    setIsSuggestionsThere(false)
                }
                else if (suggestions_reln.length > 0)
                {
                    setIsSuggestionsThere(true)
                }
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
    const hit_getSemantics = (e) => {
        setSemanticClick(false)
        var select_dict = {}
        // nodeToAdd_propKey = localStorage.getItem("SELECTEDTEXT_ORIGIN")
        // localStorage.setItem("selected_nodePropKey", nodeToAdd_propKey)
        select_dict['selectedText'] = localStorage.getItem("SELECTEDTEXT_ORIGIN")
        console.log(select_dict)

        axios
            .post('http://127.0.0.1:5000/nodekeysemantic', { select_dict })
            .then(result => {
                // console.log(result);
                console.log(result.data);
                setSuggestions(result.data.suggestions)
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
    const handleRightClick = (event) => {
        // setSemanticClick(false)
        // setRelnSemanticClick(false)
        setPropValueFromSelect(false);
        setRELPropValueFromSelect(false);
        if (menuPosition) {
            return;
        }
        event.preventDefault();
        setMenuPosition({
            top: event.pageY,
            left: event.pageX
        });
    };

    const handleItemClick = (event) => {
        event.preventDefault();
        setMenuPosition(null);
    };
    const handleAddNode = (e) => {
        // setOpenForm(false)
        e.preventDefault();
        console.log("Adding node")
        console.log(localStorage.getItem("SELECTEDTEXT_ORIGIN"))
        nodeToAdd_name = localStorage.getItem("SELECTEDTEXT_ORIGIN")
        localStorage.setItem("selectedInput_nname", nodeToAdd_name)
        setMenuPosition(null);
    }
    const handleAddPropertyValue = (e) => {
        // setOpenForm(false)
        e.preventDefault();
        console.log("Adding property value")
        console.log(localStorage.getItem("SELECTEDTEXT_ORIGIN"))
        nodeToAdd_propValue = localStorage.getItem("SELECTEDTEXT_ORIGIN")
        localStorage.setItem("selected_nodePropValue", nodeToAdd_propValue)
        setMenuPosition(null);
        if (nodeToAdd_propValue !== "") {
            setPropValueFromSelect(true)
        }
    }
    const handleAddRelnValue = (e) => {
        // setOpenForm(false)
        e.preventDefault();
        console.log("Adding relationship property value")
        console.log(localStorage.getItem("SELECTEDTEXT_ORIGIN"))
        relnAdd_propValue = localStorage.getItem("SELECTEDTEXT_ORIGIN")
        localStorage.setItem("selected_relnPropValue", relnAdd_propValue)
        setMenuPosition(null);
        if (relnAdd_propValue !== "") {
            setRELPropValueFromSelect(true)
        }
    }
    const handleClickNestedButton = (e, chosenNested) => {
        e.preventDefault()
        setSemanticClick(true)
        console.log(localStorage.getItem("SELECTEDTEXT_ORIGIN"))
        nodeToAdd_propKey = localStorage.getItem("SELECTEDTEXT_ORIGIN")
        //localStorage.setItem("selected_nodePropKey", nodeToAdd_propKey)
        console.log(chosenNested)
        localStorage.setItem("selected_nodePropKey", chosenNested)
        console.log(e.target.value)
    }
    const handleClick_RelnNestedButton = (e, chosenNested) => {
        e.preventDefault()
        setRelnSemanticClick(true)
        console.log(localStorage.getItem("SELECTEDTEXT_ORIGIN"))
        relnProp_toAdd = localStorage.getItem("SELECTEDTEXT_ORIGIN")
        //localStorage.setItem("selected_nodePropKey", nodeToAdd_propKey)
        console.log(chosenNested)
        localStorage.setItem("selected_relnPropKey", chosenNested)
        console.log(e.target.value)
    }
    const handleChangeNestedValue = (e, chosenNested) => {
        e.preventDefault()
        console.log(chosenNested)
        console.log(e.target.value)
    }
    const handleRelationshipPropKey = (e) => {
        e.preventDefault();
        console.log(localStorage.getItem("selected_nname1"))
        console.log(localStorage.getItem("selected_nname2"))
        console.log(localStorage.setItem("selected_rel_node1ID"))
        console.log(localStorage.setItem("selected_rel_node2ID"))
        console.log("Adding relationship property")
        console.log(localStorage.getItem("SELECTEDTEXT_ORIGIN"))
        // relnPropKey = localStorage.getItem("SELECTEDTEXT_ORIGIN")
        // localStorage.setItem("selectedInput_relnpropkey", relnPropKey)
        setMenuPosition(null);
        setRelnSemanticClick(true)
    }
    return (
        <div>
            <AppBar position="static">
                <Toolbar variant="dense" style={{backgroundColor: "#26A69A"}} >
                <Breadcrumbs aria-label="breadcrumb" style={{color:"white"}}>
                    <Typography underline="hover">
                    NCCN UI Tool
                    </Typography>
                    <IconButton href="/" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} >
                        <HomeIcon />
                    </IconButton>
                    </Breadcrumbs>
                    <Typography variant="h6" color="inherit" component="div" >
                        {localStorage.getItem("topic")}
                    </Typography>
                    <Button variant="contained" style={{backgroundColor: "#004D40"}} href="/dashboard" edge="end" color="inherit" aria-label="menu" sx={{ ml: 142}} >
                        Create with PDF  
                    </Button>                    
                </Toolbar>
            </AppBar>
            <div className="parent-full">
                <div className="first-half" onContextMenu={handleRightClick}>
                    {/* <Typography>Right click to open menu</Typography> */}
                    <TextEditor></TextEditor>
                    <Menu
                        open={!!menuPosition}
                        onClose={() => setMenuPosition(null)}
                        anchorReference="anchorPosition"
                        anchorPosition={menuPosition}
                    >
                        <MenuItem onClick={(e) => handleAddNode(e)}>Add as Node</MenuItem>
                        <NestedMenuItem
                            label="Add as Propkey"
                            parentMenuOpen={!!menuPosition}
                            onClick={(e) => hit_getSemantics(e)}
                        >
                            {console.log(suggestions)}
                            {suggestions.map((option) => (
                                <MenuItem id="menu_propkeynested"
                                    onClick={(e) => { handleClickNestedButton(e, option['title']) }}>{option['title']}</MenuItem>
                            ))}
                            {/* <MenuItem onClick={handleItemClick}>Sub-Button 1</MenuItem>
                    <MenuItem onClick={handleItemClick}>Sub-Button 2</MenuItem> */}
                        </NestedMenuItem>
                        <MenuItem
                            onClick={(e) => handleAddPropertyValue(e)} >
                            Add as Prop Value
    
                </MenuItem>

                        <NestedMenuItem
                            label="Add as Reln Prop Key"
                            parentMenuOpen={!!menuPosition}
                            onClick={(e) => hit_getRelnSemantics(e)}
                        >
                            {console.log(suggestions_reln)}
                            {suggestions_reln.map((option) => (
                                <MenuItem id="menu_relnpropkeynested"
                                    onClick={(e) => { handleClick_RelnNestedButton(e, option['title']) }}>{option['title']}</MenuItem>
                            ))}
                        </NestedMenuItem>
                        <MenuItem onClick={(e) => handleAddRelnValue(e)}>Add Reln Prop Value</MenuItem>
                    </Menu>
                    <AccExampleTwo
                        buttonSelectedText={localStorage.getItem("selectedInput_nname")}
                        propSelectedText={localStorage.getItem("selected_nodePropKey")}
                        propValueSelected={localStorage.getItem("selected_nodePropValue")}
                        semanticClick={semanticClick}
                        isPropValueFromSelect={isPropValueFromSelect}
                        semanticRelnClick={relnSemanticClick}
                        selectedRelnPropKey={localStorage.getItem("selected_relnPropKey")}
                        selectedRelnPropValue={localStorage.getItem("selected_relnPropValue")}
                        isRELPropValueFromSelect={isRELPropValueFromSelect}
                    >
                    </AccExampleTwo>
                </div>
                <div className="second-half">
                    {/* <h3>hello second half</h3> */}
                    <PDFModule></PDFModule>
                </div>
            </div>
        </div>
    );
};

export default NestedMenu;
