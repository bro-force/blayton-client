import React, { Component } from 'react'

import { Router, Link } from '@reach/router'

import Feed from './pages/feed'
import Login from './pages/login'

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Feed path="/" />
        <Login path="/login" />
      </Router>
    )
  }
}

export default App
