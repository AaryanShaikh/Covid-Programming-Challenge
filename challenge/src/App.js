import React, { Component } from 'react'
import './App.css';
import Home from './components/Home';
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      isLogged: false
    }
  }
  getIsLogged = (e) => {
    this.setState({
      isLogged: e
    })
  }
  render() {
    return (
      <div className="App">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {
          ((localStorage.getItem("isLogged") === null) || (localStorage.getItem("isLogged") === "false")) ?
            <Login getIsLogged={this.getIsLogged} />
            :
            <Home getIsLogged={this.getIsLogged} />
        }
      </div>
    );
  }
}

export default App
