import '../../css/pdftexteditorv2.css'
import React, { useState } from 'react'

// import TextEditor from './TextEditor';
import TextEditor from './TextEditorDraftJS';

export default function PDFAndTextEditor() {
    const [pdfFile, setPdfFile] = useState(null);
    const [pdfFileError, setPdfFileError] = useState('');

    // for submit event
    const [viewPdf, setViewPdf] = useState(null);

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
        <div className='full-container'>
            <div className="texteditorcontainer">
                <h4>Text Editor </h4>
                <TextEditor></TextEditor>
            </div>
            <div className="pdfcontainer">
                <form className='form-group' onSubmit={handlePdfFileSubmit}>
                    <input type="file" className='form-control'
                        required onChange={handlePdfFileChange}
                    />
                    {pdfFileError && <div className='error-msg'>{pdfFileError}</div>}
                    <br></br>
                    <button type="submit" className='btn btn-success btn-lg'>
                        UPLOAD
            </button>
                </form>
                <div className='pdf-container'>
                    {/* show pdf conditionally (if we have one)  */}
                    {/* {viewPdf && <><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                        <Viewer fileUrl={viewPdf}
                        plugins={[defaultLayoutPluginInstance]} />
                    </Worker></>} */}
                    <iframe src={viewPdf} width="600" height="900">

                    </iframe>
                    {/* if we dont have pdf or viewPdf state is null */}
                    {!viewPdf && <>No pdf file selected</>}
                </div>
            </div>
        </div>
    );
}