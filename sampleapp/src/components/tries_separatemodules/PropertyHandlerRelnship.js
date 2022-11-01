import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from "@material-ui/core/TextField"
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';

const hit_propertyUpdation = (key, value, e) => {
    
}

export default function PropertyHandler() {
    const inputClearRef = useRef(null);
    const [propertiesList, setPropertyList] = useState([
        { propertyAdd: " " }
    ])
    const onClearButton = () => {
        // @ts-ignore (us this comment if typescript raises an error)
        inputClearRef.current.value = "";
    };

    const handlePropertyClear = (index) => {
        const list = [...propertiesList]
        list.splice(index, 1)
        setPropertyList(list);
    }
    const handlePropertyAdd = (key, value) => {
        if (document.getElementById('propkey').value == "" && document.getElementById('propvalue') == "")
            console.log("HI")
        setPropertyList([...propertiesList, { propertyAdd: " " }])
    }

    return (
        <div>
            <label htmlFor="propertyAdd" />
            {propertiesList.map((singleProperty, index) => (
                <div key={index} className="properties">
                    <Box  display="flex" justifyContent="center">
                        <TextField
                            id="propkey"
                            onChange={(e) => { console.log(e.target.value) }}
                            label={"Property Key"} //optional
                            ref={inputClearRef}
                            name="propkey"
                        />
                        &nbsp; &nbsp; &nbsp;
                        <TextField
                            id="propvalue"
                            onChange={(e) => { console.log(e.target.value) }}
                            label={"Property Value"} //optional
                            ref={inputClearRef}
                            name="propvalue"
                        />
                    </Box>
                    {propertiesList.length - 1 === index && propertiesList.length < 10 &&
                        (
                            <IconButton style={{ marginTop: "10px" }} aria-label="tick" size="small"
                                onClick={() => handlePropertyAdd(document.getElementsByName('propkey'), document.getElementsByName('propvalue'))}
                            >
                                <DoneAllOutlinedIcon color="blue" />
                            </IconButton>
                        )}

                    {propertiesList.length >= 1 &&
                        (
                            <IconButton aria-label="delete"
                                onClick={() => handlePropertyClear(index)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        )}
                </div>
            ))}
            <br></br>
            <Button disabled variant="contained" color="success" onClick={(e) => hit_propertyUpdation(document.getElementsByName('propkey'), document.getElementsByName('propvalue'), e)}>
                Save Changes
            </Button>
        </div>
    )
}