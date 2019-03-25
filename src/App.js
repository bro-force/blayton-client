import React, { Component, useEffect } from 'react'

import { Router, Link } from '@reach/router'

import Feed from './pages/feed'
import Login from './pages/login'
import distance from './helpers/distance'

import { StateProvider } from './state-provider'

import './App.css';

const eventCoords = {
  latitude: process.env.REACT_APP_EVENT_LATITUDE,
  longitude: process.env.REACT_APP_EVENT_LONGITUDE
}

const initialState = {
  user: JSON.parse(window.localStorage.getItem('user')),
  geolocationSupport: window.navigator.geolocation !== null,
  coords: {},
  eventCoords,
  distance: null
}

function reducer(state, action) {
  switch(action.type) {
    case 'GOT_USER':
      return { ...state, user: action.payload }
    case 'GOT_COORDS':
      return {
        ...state,
        coords: action.payload,
        distance: distance(eventCoords, action.payload)
      }
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
