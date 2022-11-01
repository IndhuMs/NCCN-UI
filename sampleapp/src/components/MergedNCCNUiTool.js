// Om sri sairam
// THis is going to be our merged tool home page
// must redirect to pages easily
import React from "react";
import Link from '@mui/material/Link';
import TextField from "@material-ui/core/TextField";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState, createContext, useContext } from "react";
import { Typography } from "@material-ui/core";
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import axios from 'axios'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Playing from '../components/PlayingwithNeovisGraph'
const filter = createFilterOptions();
const TopicContext = createContext();
const topicOptions_local = [
    "Screening",
    "Treatment",
    null
]
export default function HomePage() {
    let history = useNavigate();
    const [topic, setTopic] = useState("default");
    const [topicOptions, setTopicOptions] = useState([])
    const [topicSelected, setTopicSelected] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [openAddTopic, setOpenAddTopicDialog] = React.useState(false);

    const handleClickOpenAddTopic = (e) => {
        console.log("adding topic dialog")
        setOpenAddTopicDialog(true);
    };

    const handleCloseAddTopic = () => {
        setOpenAddTopicDialog(false);
    };

    const commitTopic = (event) => {
        localStorage.setItem("topic", document.getElementById("topicdropdown").value)
        console.log(localStorage.getItem("topic"))
        setTopic(localStorage.getItem("topic"))
        setShowCreate(true)
    }
    const onTopicSelect = (event) => {
        event.preventDefault();
        setTopicSelected(true)
        console.log(event.target.value)
      }
    const routeToCreate = (e) => {
        history("/create");
    }
    const routeToEdit = (e) => {
        history("/neovisandform");
    }
    const routeToDashboard = (e) => {

        history("/dashboard");
    }
    const routeToTextEditor = (e) => {

        history("/semanticrightclick");
    }
    const getTopics = (e) => {
        e.preventDefault()
        console.log("im into topic api")
        axios
            .get('http://127.0.0.1:5000/topicsubgraph')
            .then(result => {
                var topicsDict = result.data
                var topicOptions = topicsDict.topic
                console.log(topicOptions)
                setTopicOptions(topicOptions)
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
            console.log("exit topic api")
    }
    return (
        <div>
            <AppBar position="static">
                <Toolbar variant="dense" style={{backgroundColor: "#26A69A"}} >
                    <Typography variant="h6" color="inherit" component="div" >
                        NCCN UI Tool
                    </Typography>
                </Toolbar>
            </AppBar>
            <br></br><br></br><br></br><br></br><br></br>
            <Box style={{textAlign:"center", display:"flex", justifyContent: "center"}}>
                <Autocomplete
                    // style={{ justifyContent: "center", display: "block", alignItems: "center" }}
                    disablePortal
                    onFocus={(e) => getTopics(e)}
                    justifyContent="flex-end"
                    id="topicdropdown"
                    style={{ color: "white" }}
                    options={topicOptions}
                    sx={{ width: 350 }}
                    color="primary"
                    size="small"
                    onChange={(event) => { onTopicSelect(event) }}
                    renderInput={(params) => <TextField {...params} label="Topic/Flow" style={{ color: "white" }} />}
                />
                <IconButton aria-label="addtopic" onClick={(e) => handleClickOpenAddTopic(e)}>
                    <AddCircleOutlinedIcon />
                </IconButton>
                <Dialog open={openAddTopic} onClose={handleCloseAddTopic}>
                    <DialogTitle>New Topic</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            The segment where we can add a new topic
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="topicname"
                            label="Topic"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseAddTopic}>Cancel</Button>
                        <Button onClick={handleCloseAddTopic}>Create Topic</Button>
                    </DialogActions>
                </Dialog>
                &nbsp; &nbsp; &nbsp;
                {topicSelected && <Button variant="contained" style={{backgroundColor: "#004D40"}} onClick={(e) => commitTopic(e)}>Submit</Button>}
            </Box>
            
            {showCreate &&
                <Box>
                    <br></br><br></br>
                    <Button variant="contained" style={{backgroundColor: "#00BFA5"}} onClick={(e) => routeToDashboard(e)}>Create with PDF</Button>
                    &nbsp; &nbsp;
                    <Button variant="contained" style={{backgroundColor: "#00BFA5"}} onClick={(e) => routeToTextEditor(e)}>Create with Editor</Button>
                </Box>
            }
        </div>
    )

}