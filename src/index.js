import React, { useState } from 'react';
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
let hashHistory = Routes.hashHistory;
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import UploadNFT from './UploadNFT/UploadNFT';


const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <TabsExample />
      <Routes history={hashHistory}>
        <Route path="*" element={<App />}></Route>
        <Route path="expenses" element={<Expense />}></Route>
        <Route path="invoices" element={<Invoices />}></Route>
        <Route path="mint" element={<Mint />}></Route>
        <Route path="register" element={<RegistrationForm />}></Route>
        <Route path="s3-bucket" element={<UploadNFT  />}></Route>
   
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
