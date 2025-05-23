import React from "react";
import { createRoot } from "react-dom/client";
import './styles/tailwind.css';
import App from "./components/App";
import './i18n'; 

const root = createRoot(document.getElementById("root"));
root.render(<App />);