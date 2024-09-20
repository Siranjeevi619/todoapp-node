import React from "react";
import Navbar from "../components/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import CompletedTask from "../pages/completed/CompletedTask";
import RemovedTask from "../pages/removed/RemovedTask";

function AppNavigation() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/completed" element={<CompletedTask />} />
        <Route path="/removed" element={<RemovedTask />} />
      </Routes>
    </div>
  );
}

export default AppNavigation;
