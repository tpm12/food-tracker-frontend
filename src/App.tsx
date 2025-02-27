import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/Home";
import WaterTracker from "./components/WaterTracker";

const App: React.FC = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/water-tracker" element={<WaterTracker />} />
      </Routes>
    </DashboardLayout>
  );
};

export default App;
