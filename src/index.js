import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Expense from "./routes/expenses";
import Invoices from "./routes/invoices";
import Mint from "./Mint/Mint"
import RegistrationForm from "./RegistrationForm/RegistrationForm";
import { TabsExample } from './Nav/TabsExample';


import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <TabsExample />
      <Routes>
        <Route path="*" element={<App />}></Route>
        <Route path="expenses" element={<Expense />}></Route>
        <Route path="invoices" element={<Invoices />}></Route>
        <Route path="mint" element={<Mint />}></Route>
        <Route path="register" element={<RegistrationForm /> }></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
