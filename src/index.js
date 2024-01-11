import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./bootstrap.min.css"
import { BrowserRouter } from 'react-router-dom';
import ContextShare from './context/ContextShare';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
  <ContextShare>
      
      <BrowserRouter>
          <App />
      </BrowserRouter>
    
  </ContextShare> 

  </React.StrictMode>
);

