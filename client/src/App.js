import './App.css';
import React from 'react';
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Upload from "./components/Upload"


function App() {
  return (
    <div className="App">
      <Router>
      <div>
          <Routes>
            <Route path="/" exact element={<Upload/>}/>
          </Routes>
        </div>
    </Router>
    </div>
  );
}

export default App;
