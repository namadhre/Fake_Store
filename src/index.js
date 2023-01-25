import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Header from './components/Header';
import Product from './components/Product';

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Route path="/" exact>
        <App />
      </Route>
      <Route path="/product/:id" component={Product} exact>
      </Route>
    </Router>
  </React.StrictMode>,
);

