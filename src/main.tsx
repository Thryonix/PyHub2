import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GandiProvider } from "@gandi-ide/gandi-ui";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GandiProvider>
      <App />
    </GandiProvider>
  </React.StrictMode>
);
