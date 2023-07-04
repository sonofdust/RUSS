import React from "react";
import "./App.css";
import "h8k-components";
import GuestForm from "./components/GuestForm";

const title = "Meal Schedule";

const App = () => {
  return (
    <div className="App">
      <label>Hello</label>
      <h8k-navbar header={title}></h8k-navbar>
      <GuestForm />
    </div>
  );
};

export default App;
