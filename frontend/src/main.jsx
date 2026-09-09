import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CompanyProvider } from "./context/CompanyContext.jsx";
import { JobsProvider } from "./context/JobsContext.jsx";
import { ThemeProvider } from "./context/ThemeProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <CompanyProvider>
          <JobsProvider>
            <App />
          </JobsProvider>
        </CompanyProvider>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>,
);
