import React, { Component } from 'react';

import Header from './components/header'
import Picture from './components/picture'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <Picture />
        </div>
      </div>
    );
  }
}

export default App;
