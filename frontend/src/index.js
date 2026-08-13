import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// This is the ONE place React connects to the actual HTML page.
// It finds <div id="root"> in index.html and mounts our whole <App /> component tree inside it.
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
