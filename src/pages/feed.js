import React, { useEffect } from 'react'

import { navigate } from '@reach/router'

import { useStateValue } from '../state-provider'
import firebase, { storageRef, database } from '../firebase'

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

    database.ref('feed').once('value', function(snapshot) {
      if (snapshot.val()) {
        const items = Object.values(snapshot.val())
        dispatch({ type: 'GOT_FEED', payload: items })
      }
    })
  }, [])

  return (
    <div className="feed">
      <Header />
      <div className="container">
        { state.feed.map(item => (
          <Picture
            key={item.id}
            {...item}
          />
        ))}
      </div>

      { state.imageToUpload && (
        <ImageUpload image={state.imageToUpload} />
      )}
    </div>
  )
}

export default Feed
