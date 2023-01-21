import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Header from './components/Header';
import Products from './components/Products';
import Footer from './components/Footer';

class App extends Component {

  constructor() {
    super();
    this.state = {
      products: [],
      isFetch: false
    }
  }

  componentDidMount() {
    axios.get('https://fakestoreapi.com/products/')
      .then((response) => {
        this.setState({ products: [response.data].flat() });
      })
      .catch((err) => {
        this.setState({ isFetch: true });
        console.error(err);
      });
  }

  render() {
    return (
      <div className="App">
        {this.state.isFetch === true ?
          <div className='fetch-fail'>
            <h2> Something went wrong !</h2>
          </div>
          :
          (this.state.products.length === 0 ?
            <div className="loader-container">
              <div className="lds-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            :
            (this.state.products[0] === "" ?
              <div className="no-data">
                <h1>No data found</h1>
              </div>
              :
              <div>
                <div className='header-container'>
                  <Header />
                </div>
                <div className="main-coontainer">
                  <ul>
                    <Products products={this.state.products} />
                  </ul>
                </div>
                <div className='footer-container'>
                  <Footer />
                </div>
              </div>
            )
          )
        }
      </div>
    );
  }
}

export default App;
