import React from 'react'
import samplePdf from './UNITTESTING.pdf'
const handleRightClick = (e) => {
    e.preventDefault();
    if (e.nativeEvent.which === 1) {
        console.log("Left click");
      } else if (e.nativeEvent.which === 3) {
        console.log("Right click");
        const parentDoc = document.getElementById("maindiv")
        const a = document.createElement("button")
        a.innerHTML = "Save me"
        parentDoc.appendChild(a);
      }
    // console.log("Got right click!");
};
const PdfTextHandler = () => {
    return (
        // <PDFViewer
        //     style={{ height: "50vh", width: "100%"}}
        //     document={samplePdf}
        // />
        <div id="maindiv" onClick={(e) => handleRightClick(e)} onContextMenu={(e) => handleRightClick(e)}>
            <iframe onContextMenu={(e) => handleRightClick(e)} src={samplePdf} title="title" style= {{height: '100vh', alignContent: "center", width: '70%'}}>
                Presss me: <a href="../UNITTESTING.pdf">Download PDF</a>
            </iframe>
        </div>
            
    )
}

export default PdfTextHandler