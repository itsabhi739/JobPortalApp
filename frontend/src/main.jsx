import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CompanyProvider } from "./context/CompanyContext.jsx";
import { JobsProvider } from "./context/JobsContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <CompanyProvider>
        <JobsProvider>
          <App />
        </JobsProvider>
      </CompanyProvider>
    </AuthProvider>
  </BrowserRouter>,
);
