import TextField from "@material-ui/core/TextField";
import DeleteIcon from '@mui/icons-material/Delete';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import React, { useRef, useState } from "react";
var totalList = new Array();


const getkeyvaluePairs = (key, value) => {
    // var totalList = new Array();
    totalList = [];
    totalList.push(localStorage.getItem("nodename"))
    totalList.push(localStorage.getItem("nodetypedd"))
    for (let i = 0, j = 0; i < key.length, j < value.length; i++ , j++) {
        var keyvaluepairs = new Array();
        console.log(key[i] + "::::" + value[j].value)
        localStorage.setItem("propkey", String(key[i].value))
        localStorage.setItem("propvalue", String(value[j].value))
        keyvaluepairs.push(localStorage.getItem("propkey"));
        keyvaluepairs.push(localStorage.getItem("propvalue"));
        totalList.push(keyvaluepairs)
    }
    console.log(totalList)
    localStorage.setItem("opProplist", totalList);
    // totalList = [];
    // console.log(localStorage.getItem("opPropList"))
    // testfunc();
}
const testfunc = () => {
    console.log(localStorage.getItem("opProplist"));
    console.log(totalList);
}


const storeIntoDict = (key, value) => {
    var dict_single = {};
    var dict_arr = new Array();
    var dict_list = {};
    for (let i = 0, j = 0; i < key.length, j < value.length; i++ , j++) {
        console.log(key[i].value + "::::" + value[j].value)
        localStorage.setItem("propkey", String(key[i].value))
        localStorage.setItem("propvalue", String(value[j].value))
        dict_single['propkey'] = localStorage.getItem('propkey')
        dict_single['propvalue'] = localStorage.getItem('propvalue')
        console.log(dict_single)
        dict_arr.push(dict_single)
        dict_list['main'] = dict_arr
    }
    console.log(dict_list)
}

const hit_propertyUpdation = (key, value, e) => {
    var property = localStorage.getItem("opProplist")
    var arrayinp = ["start", "hello"]
    console.log(key)
    console.log(value)
    getkeyvaluePairs(key, value);
    console.log(totalList)
    // console.log(localStorage.getItem("opProplist"))
    
    axios
        .post('http://127.0.0.1:5000/nodeprop', {totalList})
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
            <Button variant="contained" color="success" onClick={(e) => hit_propertyUpdation(document.getElementsByName('propkey'), document.getElementsByName('propvalue'), e)}>
                Save Changes
            </Button>
        </div>
    );
}
