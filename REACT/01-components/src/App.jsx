import React from "react";
import Card from "./components/Card.jsx";
import "./App.css";
import Navbar from "./components/Navbar.jsx";

const App = () => {
  return (
    <>
      <Navbar />
      <Card />
      <Card />
      <Card />
    </>
  );
};

export default App;
