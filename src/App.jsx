import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DynamicTable from "./components/DynamicTable.jsx";
import CustomerPage from "./components/CustomerPage.jsx"; // Import the new page

import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-center p-4">P25.1.3 Ms Traders Table</h1>
        <Routes>
          <Route path="/" element={<DynamicTable />} />
          <Route path="/customer/:customerName" element={<CustomerPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
