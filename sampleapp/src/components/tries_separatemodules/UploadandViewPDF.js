import React, { useState } from 'react'
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
import BasicGraphEditor from '../../components/BasicGraphEditor'
// Import the styles
import '../../css/pdfandtexteditor.css'
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library
// import TextEditor from './TextEditor';
import TextEditor from './TextEditorDraftJS';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { TextField } from '@material-ui/core';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import { Icon } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { Fragment } from 'react';

export const UploadandViewPDF = () => {

  const reader=(e)=>{
    return(<h1>hello World</h1>);
  }
  const googleurl = "https://www.google.com";
  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  // for onchange event
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState('');

  // for submit event
  const [viewPdf, setViewPdf] = useState(<Fragment><p>copy copy copy<strong>strong copy</strong></p></Fragment>);

  // onchange event
  const fileType = ['application/pdf'];
  const handlePdfFileChange = (e) => {

    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
          setPdfFileError('');
        }
      }
      else {
        setPdfFile(null);
        setPdfFileError('Please select valid pdf file');
      }
    }
    else {
      console.log('select your file');
    }
  }

  // form submit
  const handlePdfFileSubmit = (e) => {
    e.preventDefault();
    if (pdfFile !== null) {
      setViewPdf(pdfFile);
    }
    else {
      setViewPdf(null);
    }
  }

  return (
    <div>
     
    </div>
  )
}

export default UploadandViewPDF