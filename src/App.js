import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Products from './components/Products';
import Loader from './components/Loader';

class App extends Component {

  constructor() {
    super();
    this.state = {
      products: [],
      isFetch: true
    }
  }

  componentDidMount() {
    axios.get('https://fakestoreapi.com/products/')
      .then((response) => {
        this.setState({ products: [response.data].flat() });
      })
      .catch((err) => {
        this.setState({ isFetch: false });
        console.error(err);
      });
  }

  render() {
    return (
      <div className="App">
        {this.state.isFetch === false ?
          <div className='fetch-fail'>
            <h2> Something went wrong !</h2>
          </div>
          :
          (this.state.products.length === 0 ?
            <Loader />
            :
            (this.state.products[0] === "" ?
              <div className="no-data">
                <h1>No data found</h1>
              </div>
              :
              <div className="main-coontainer">
                <ul>
                  <Products products={this.state.products} />
                </ul>
              </div>
            )
          )
        }
      </div>
    );
  }
}

export default App;
