import React, { Component, useEffect } from 'react'

import { Router, Link } from '@reach/router'

import Feed from './pages/feed'
import Login from './pages/login'
import { StateProvider } from './state-provider'

import './App.css';

const initialState = {
  user: JSON.parse(window.localStorage.getItem('user'))
}

function reducer(state, action) {
  switch(action.type) {
    case 'GOT_USER':
      return { ...state, user: action.payload }
    default:
      return state
  }
}

function App(props) {
  return (
    <StateProvider
      initialState={initialState}
      reducer={reducer}
    >
      <Router>
        <Feed path="/" />
        <Login path="/login" />
      </Router>
    </StateProvider>
  )
}

export default App
