import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { CityContextProvider } from "./context/context";

ReactDOM.render(
  <React.StrictMode>
    <CityContextProvider>
      <App />
    </CityContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
