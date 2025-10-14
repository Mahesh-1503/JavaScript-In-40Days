import React from "react";
import "./App.css"
import Inline from "./components/Inline";
import External from "./components/External";
import Quote from "./components/Quote";

const App = () => {
  return (
    <>
      <Inline />
      <External/>
      <Quote/>
    </>
  );
};

export default App;
