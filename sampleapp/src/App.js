import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
// import GraphVisualization from './components/GraphVisualization';
import AccordionExample from './components/AccordionExample';
import BasicGraphEditor from './components/BasicGraphEditor';
import BasicRelationshipEditor from './components/BasicRelationshipEditor';
import Neo4jGraph from './components/Neo4jGraph';
import NeovisAndForm from './components/NeovisAndForm';
import PropertyUpdateRelationship from './components/PropertyUpdateRelationship';
import TestRightClick from './components/tries_separatemodules/TestRightClick';
import UploadandViewPDF from './components/tries_separatemodules/UploadandViewPDF';
import NeovisRendering from './components/tries_separatemodules/NeovisRendering';
// import ContextExample from './components/ContextExample'
import SemanticOptions from './components/SemanticOptions'
import Autocmplete_Doc from './components/tries_separatemodules/Autocmplete_Doc'
import PlayNeovis from './components/PlayingwithNeovisGraph'
import MergedNCCNUiTool from './components/MergedNCCNUiTool'
import SampleDialog from './components/SampleDialog';
import Dashboard from './components/Dashboard'
import PDFAndTextEditor from "./components/tries_separatemodules/PDFAndTextEditor";
import ResizableDashboard from "./components/tries_separatemodules/ResizableComponent";
import REACTPDFVIewer_V1 from './components/PDF_TRIES/REACTPDFComponent';
import ReactViewPDF_V2 from './components/PDF_TRIES/ReactViewPDF';
import ReactPDFSimple from './components/PDF_TRIES/React_SimpleInputViaFile';

function App() {
  return (
    <div className="App">
      
      <Router>
        <Routes>
          <Route>
            <Route path="/create" element = {<AccordionExample/>} />
            <Route path="/graphcreation" element = {<BasicGraphEditor/>} />
            <Route path="/relncreation" element = {<BasicRelationshipEditor/>} />
            <Route path="/neo4j" element = {<Neo4jGraph/>} />
            {/* tries modules */}
            <Route path="/neovisandform" element = {<NeovisAndForm/>} />
            <Route path="/semanticrightclick" element = {<SemanticOptions/>} />
            <Route path="/uploadpdf" element = {<UploadandViewPDF/>} />
            <Route path="/pdftexteditorv2" element = {<PDFAndTextEditor/>} />
            <Route path="/testrightclick" element = {<TestRightClick/>} />
            <Route path="/propupdaterel" element = {<PropertyUpdateRelationship/>} /> 
            {/* <Route path="/testneovis" element = {<NeovisRendering/>} />  */}
            <Route path="/autoc" element = {<Autocmplete_Doc/>} />
            <Route path="/playneovis" element = {<PlayNeovis/>} />
            <Route path="/sampledialog" element = {<SampleDialog/>} />
            <Route path="/" element = {<MergedNCCNUiTool/>} />
            <Route path="/dashboard" element = {<Dashboard/>} />
            <Route path="/react-pdf-v1" element = {<REACTPDFVIewer_V1/>} />
            <Route path="/react-pdf-view-v2" element = {<ReactViewPDF_V2/>} />
            <Route path="/resizabledash" element={<ResizableDashboard/>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
