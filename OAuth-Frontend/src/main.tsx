import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = String(import.meta.env.VITE_APP_GOOGLE_CLIENT_ID);
console.log(clientId);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={clientId}>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */},
  </GoogleOAuthProvider>
);
