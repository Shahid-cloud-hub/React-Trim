import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "rsuite/dist/rsuite.min.css";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you have the reportWebVitals setup, keep this line, otherwise, you can remove it
reportWebVitals();
