import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router";

import './index.css';
import reportWebVitals from './reportWebVitals';
import { Router } from "./routes/Routes";

const Root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

Root.render(
    <React.StrictMode>
        <RouterProvider router={ Router } />
    </React.StrictMode>
);

reportWebVitals();
