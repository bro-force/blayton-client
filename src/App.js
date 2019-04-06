import React from 'react'

import { Router } from '@reach/router'

import Feed from './pages/feed'
import Login from './pages/login'
import distance from './helpers/distance'
import uniqBy from 'lodash/uniqBy'

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
  feed: {
    loading: true,
    items: [],
    error: null,
    lastVisible: null,
    haveNext: true
  }
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
      return {
        ...state,
        feed: {
          ...state.feed,
          loading: false,
          items: action.posts,
          lastVisible: action.lastVisible,
          haveNext: action.posts.length > 0
        }
      }
    case 'GOT_MORE_POSTS':
      return {
        ...state,
        feed: {
          ...state.feed,
          loading: false,
          items: [ ...state.feed.items, ...action.posts ],
          lastVisible: action.lastVisible,
          haveNext: action.posts.length > 0
        }
      }
    case 'START_UPLOADING':
      return { ...state, uploading: true }
    case 'DELETE_POST':
      const newPosts =
        state.feed.items.filter(item => item.id !== action.payload)

      return {
        ...state,
        feed: {
          ...state.feed,
          items: newPosts
        }
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
