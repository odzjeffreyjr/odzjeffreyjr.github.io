import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Portfolio from "./Portfolio";
import ProjectsPage from "./pages/ProjectsPage";
import MePage from "./pages/MePage";
import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/me" element={<MePage />} />
        </Routes>
      </div>
    </Router>
  );
}
