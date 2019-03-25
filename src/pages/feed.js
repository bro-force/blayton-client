import React, { useEffect } from 'react'

import { navigate } from '@reach/router'

import { useStateValue } from '../state-provider'

import Header from '../components/header'
import Picture from '../components/picture'
import ImageUpload from './image-upload'

import placeholder from '../assets/placeholder.jpeg'

import './feed.css'

function Feed(props) {
  const [ state, dispatch ] = useStateValue()

  useEffect(() => {
    if (state.user === null) {
      navigate('/login')
    }
  }, [ state.user ])

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(({ coords }) => {
      dispatch({ type: 'GOT_COORDS', payload: coords })
    })
  }, [])

  return (
    <div className="feed">
      <Header />
      <div className="container">
        <Picture />
      </div>

      { state.imageToUpload && (
        <ImageUpload image={state.imageToUpload} />
      )}
    </div>
  )
}

export default Feed
