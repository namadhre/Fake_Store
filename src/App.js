import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Products from './components/Products';
import Loader from './components/Loader';

class App extends Component {

  constructor(props) {
    super(props);

    this.API_STATES = {
      LOADING: "loading",
      LOADED: "loaded",
      ERROR: "error",
    }

    this.state = {
      products: [],
      status: this.API_STATES.LOADING,
      errorMessage: "",
    }

    this.URL = 'https://fakestoreapi.com/products/'
  }

  fetchData = (url) => {
    this.setState({
      status: this.API_STATES.LOADING,
    }, () => {
      axios.get(url)
        .then((response) => {
          this.setState({
            status: this.API_STATES.LOADED,
            products: response.data,
          })

        })
        .catch((err) => {
          this.setState({
            status: this.API_STATES.ERROR,
            errorMessage: "An API error occured. Please try again in a few minutes.",
          })
        })
    })
  }

  componentDidMount = () => {
    this.fetchData(this.URL);
  }

  render() {

    return (
      <div className="App">
        {this.state.status === this.API_STATES.ERROR &&
          <div className='fetch-fail'>
            <h2> {this.state.errorMessage} </h2>
          </div>
        }

        {this.state.status === this.API_STATES.LOADING &&
          <Loader />
        }
        {this.state.status === this.API_STATES.LOADED && this.state.products.length === 0 &&
          <div className="no-data">
            <h1>No products available at the moment. Please try again.</h1>
          </div>
        }
        {this.state.status === this.API_STATES.LOADED && this.state.products.length > 0 &&
          < div className="main-coontainer">
            <ul>
              <Products products={this.state.products} />
            </ul>
          </div>
        }
      </div>
    );
  }
}

export default App;
