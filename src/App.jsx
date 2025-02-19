import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DynamicTable from "./pages/DynamicTable.jsx";
import CustomerPage from "./pages/CustomerPage.jsx";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AboutUsPage from "./pages/AboutUs.jsx";
import Navbar from "./components/Navbar.jsx";
import Product from "./pages/Product.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx"; // import the protected route component

import "./App.css";

function App() {
  return (
    <Router>
      <div className="w-full">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/table"
            element={
              <ProtectedRoute>
                <DynamicTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/:customerName"
            element={
              <ProtectedRoute>
                <CustomerPage />
              </ProtectedRoute>
            }
          />
          <Route path="/aboutus" element={<AboutUsPage />} />
          <Route path="/product" element={<Product />} />
          <Route path="/Contact" element={<ContactUs />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
