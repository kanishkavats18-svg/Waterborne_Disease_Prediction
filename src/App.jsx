import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import DiseasePredictor from "./pages/DiseasePredictor";
import RiskPredictor from "./pages/RiskPredictor";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <BrowserRouter>
      <div className="layout">

        <Sidebar />

        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/disease" element={<DiseasePredictor />} />
            <Route path="/risk" element={<RiskPredictor />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;