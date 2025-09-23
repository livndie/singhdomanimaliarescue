import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import GetInvolvedPage from "./pages/GetInvolvedPage";
import app from "./firebase"
import { getApp } from "firebase/app";

function App() {
  useEffect(() => {
    const firebaseApp = getApp();
    console.log("✅ Firebase connected:", firebaseApp.options.projectId);
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/get-involved" element={<GetInvolvedPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;