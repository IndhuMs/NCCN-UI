import React from 'react';
import { useState, createContext, useContext , useEffect} from "react";
import ReactDOM from 'react-dom';
import { Editor, EditorState } from 'draft-js';
import { convertToRaw} from 'draft-js';
import "../../css/pdftexteditorv2.css"
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import useRightClickMenu from '../../hooks/useRightClickMenu'
import Menu from './Menu'
import AccExampleTwo from '../AccordionExample_Editor'
// import Component5 from '../Component5'
import NeovisAndForm from '../NeovisAndForm'
import { TextField, Typography } from '@material-ui/core';
import { local } from 'd3';
import SemanticOptions from '../SemanticOptions'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const UserContext = createContext();

export default function TextEditorDraftJS() {
    const [openForm, setOpenForm] = React.useState(false);
    const {x, y, showMenu} = useRightClickMenu();
    const [openAlert, setOpenAlert] = React.useState(false);
    const [editorState, setEditorState] = React.useState(
        EditorState.createEmpty()
    );
    const [user, setUser] = useState('')
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };
    useEffect(() => {
        // Update the document title using the browser API
        //document.title = `You clicked ${count} times`;
        setUser(localStorage.getItem("inpnodename"))
      });
    const Conditional = () => {
        if(selectedText == '') {
            console.log("Nothing is selected")
            // return (
            //     <Alert autoHideDuration={2000} severity="error">This is an error message!</Alert>
            // )
        }
        else if (selectedText.length > 1) {
            localStorage.setItem("inpnodename", selectedText)
            return (
                //<Menu x={x} y={y} showMenu={showMenu} textsel ={selectedText}/>
                <SemanticOptions showMenu={showMenu} textsel ={selectedText}></SemanticOptions>
            )
        }
    }

    const editor = React.useRef(null);
    var selectionState = editorState.getSelection();
    var anchorKey = selectionState.getAnchorKey();
    var currentContent = editorState.getCurrentContent();
    var currentContentBlock = currentContent.getBlockForKey(anchorKey);
    var start = selectionState.getStartOffset();
    var end = selectionState.getEndOffset();
    var selectedText = currentContentBlock.getText().slice(start, end);
    const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
    const value_withenter = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
    
    localStorage.setItem("SELECTEDTEXT_ORIGIN", selectedText)
    localStorage.setItem("SELECTEDTEXT_ORIGIN", value_withenter)
    function focusEditor() {
        editor.current.focus();
        console.log(selectedText)
        console.log(localStorage.getItem("SELECTEDTEXT_ORIGIN"))
    }

    const popupSelected = () => {
        setOpenAlert(true)
    }
    React.useEffect(() => {
        focusEditor()
    }, []);

    return (
        <div>
            <div onClick={focusEditor}>
                <div>
                    <br></br>
                    <Typography>Text Editor </Typography>
                    <br></br>
                    <Editor
                        ref={editor}
                        editorState={editorState}
                        onChange={editorState => setEditorState(editorState)}
                        
                    />
                    {/* {Conditional()} */}
                </div>
                {/* <Button variant="outlined" onClick={popupSelected}>
                    Show selected text
                </Button> */}
                <Snackbar open={openAlert} autoHideDuration={2500} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                        {selectedText} is the selected text from editor!
                    </Alert>
                </Snackbar>
                {/* <TextField disabled="true" id="pdfnodename_tf"></TextField> */}
                {/* <NeovisAndForm></NeovisAndForm> */}
            </div>
            {/* {console.log("Actual selected : " + localStorage.getItem("selectedInput_nname"))} */}
            {/* <AccExampleTwo 
            buttonSelectedText={ localStorage.getItem("selectedInput_nname")} 
            propSelectedText = {localStorage.getItem("selected_nodePropKey")} 
            propValueSelected = {localStorage.getItem("selected_nodePropValue")}>
                
            </AccExampleTwo> */}
        </div>
        // <UserContext.Provider value = {user}>
                
        // </UserContext.Provider>
    );
}