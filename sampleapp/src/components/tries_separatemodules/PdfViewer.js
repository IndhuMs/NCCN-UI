import React, { useState } from 'react';
import samplePdf from './17PW25_review_final.pdf'
import { Document, Page, pdfjs } from 'react-pdf'
//import pdfjsWorker from "react-pdf/node_modules/pdfjs-dist/build/pdf.worker.entry";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
//pdfjs.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js'
// pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker

export default function PdfViewer() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const handleRightClick = (e) => {
    e.preventDefault();
    if (e.nativeEvent.which === 1) {
        console.log("Left click");
      } else if (e.nativeEvent.which === 3) {
        console.log("Right click");

      }
    // console.log("Got right click!");
};

  return (
    <div >
      <Document file={samplePdf} 
      onLoadSuccess={({ numPages })=>setNumPages(numPages)}
      onLoadError={(e)=>console.log(e)}
      onClick={(e) => handleRightClick(e)} onContextMenu={(e) => handleRightClick(e)}
      >
          {Array.apply(null, Array(numPages))
          .map((x, i)=>i+1)
          .map(page => <Page pageNumber={page}/>)}>
        <Page pageNumber={pageNumber} onContextMenu={(event) => handleRightClick(event)}/>
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      {/* <p >
          CLick me
      </p> */}
    </div>
  );
}