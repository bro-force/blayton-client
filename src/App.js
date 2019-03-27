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
  user: null,
  geolocationSupport: window.navigator.geolocation !== null,
  coords: {},
  eventCoords,
  distance: null,
  croppedImage: null,
  uploadStep: 0,
  feed: []
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
    case 'GOT_IMAGE':
      return {
        ...state,
        imageToUpload: action.payload,
        uploadStep: 1
      }
    case 'GOT_CROPPED_AREA_PIXELS':
      return { ...state, croppedAreaPixels: action.payload }
    case 'GOT_CROPPED_IMAGE':
      return {
        ...state,
        croppedImage: action.payload,
        finalImage: action.payload
      }
    case 'CANCEL_UPLOAD':
      return {
        ...state,
        uploadStep: 0,
        uploading: false,
        imageToUpload: null,
        croppedImage: null,
        croppedAreaPixels: null
      }
    case 'NEXT_UPLOAD_STEP':
      return { ...state, uploadStep: state.uploadStep + 1 }
    case 'PREVIOUS_UPLOAD_STEP':
      return { ...state, uploadStep: state.uploadStep - 1 }
    case 'COMPLETE_UPLOAD':
      return {
        ...state,
        uploadStep: 0,
        uploading: false,
        imageToUpload: null,
        croppedImage: null,
        croppedAreaPixels: null
      }
    case 'GOT_FINAL_IMAGE':
      return { ...state, finalImage: action.payload }
    case 'GOT_FEED':
      return { ...state, feed: action.payload }
    case 'START_UPLOADING':
      return { ...state, uploading: true }
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
