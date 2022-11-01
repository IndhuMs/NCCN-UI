import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';

export default function MyApp() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  let i =1;

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document file="./test1.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        {i<=numPages
            &&
            <div>
                {/* {i++ && setPageNumber(i)} */}
                <Page pageNumber={i} />
            </div>  
        }
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}