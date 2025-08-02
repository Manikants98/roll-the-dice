import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
import "./index.css";
import EmployeeManagementApp from "./Employee/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EmployeeManagementApp />
    {/* <App /> */}
  </StrictMode>
);
