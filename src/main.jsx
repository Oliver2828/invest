import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./i18n";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="w-screen h-screen overflow-x-hidden overflow-y-auto">
      <App />
    </div>
  </React.StrictMode>
);
