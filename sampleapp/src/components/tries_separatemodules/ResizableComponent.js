import { render } from "react-dom";
import { Resizable } from "re-resizable";
import React, { useState } from 'react'
import '../../css/resizable.css'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
import EditorModule from '../NeovisAndForm'

export default function ResizableComponent() {
  const style_resizecontainer = {
    // display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
  };
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState('');
  const [viewPdf, setViewPdf] = useState(null);
  const fileType = ['application/pdf'];
  const [global_size, setGlobalSize] = useState({
    width: 500,
    height: 700
  })
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
    <div className="div-form-parent" >
      {/* &nbsp; &nbsp; &nbsp; &nbsp; */}
      <div className="first-half">
        {/* <Resizable
        style={style_resizecontainer}
        > */}
          <EditorModule></EditorModule>
        {/* </Resizable> */}
      </div>

      <div className="second-half">
        <form className='form-group' onSubmit={handlePdfFileSubmit} >

          <input type="file" className='form-control'
            required onChange={handlePdfFileChange}
          />
          {pdfFileError && <div className='error-msg'>{pdfFileError}</div>}
          <button type="submit" className='btn btn-success btn-lg'>
            UPLOAD
          </button>
        </form>
        <Resizable
          style={style_resizecontainer}
          size={{ width: global_size.width, height: global_size.height }}
          onResizeStop={(e, direction, ref, d) => {
            setGlobalSize({
              width: global_size.width + d.width,
              height: global_size.height + d.height,
            });
          }}
        >
          {!viewPdf && <span style={{ textAlign: "center", justifyContent: "flex-end" }}>No pdf file selected</span>}
          <iframe src={viewPdf} width={global_size.width} height={global_size.height}>

          </iframe>

        </Resizable>
      </div>
    </div>
  )
}