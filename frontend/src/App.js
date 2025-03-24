// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"; // Import Home Page
import Navbar from "./components/Navbar"; // Import Navbar Component

function App() {
  return (
    <Router>
      <Navbar /> {/* Render Navbar */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Route to Home page */}
      </Routes>
    </Router>
  );
}

export default App;
