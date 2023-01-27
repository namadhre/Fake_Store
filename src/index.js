import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Header from './components/Header';
import Product from './components/Product';
import Carts from './components/Carts';

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Route path="/" exact>
        <App />
      </Route>
      <Route path="/product/:id" component={Product}>
      </Route>
      <Route path="/cart">
        <Carts />
      </Route>
    </Router>
  </React.StrictMode>,
);
