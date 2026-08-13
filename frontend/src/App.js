import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import TourList from "./components/TourList";
import TourDetail from "./components/TourDetail";
import BookingForm from "./components/BookingForm";
import "./App.css";

// This is the "traffic controller" of the app.
// react-router-dom watches the URL and renders whichever component matches.
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tours" element={<TourList />} />
        <Route path="/tours/:id" element={<TourDetail />} />
        <Route path="/book/:id" element={<BookingForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
