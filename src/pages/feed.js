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
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        dispatch({ type: 'GOT_USER', payload: user })
      } else {
        navigate('/login')
      }
    })
  }, [ state.user ])

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(({ coords }) => {
      dispatch({ type: 'GOT_COORDS', payload: coords })
    })

    database
      .ref('feed')
      .orderByChild('createdAt')
      .limitToLast(10)
      .once('value', function(snapshot) {
        if (snapshot.val()) {
          const items = Object.values(snapshot.val()).reverse()
          dispatch({ type: 'GOT_FEED', payload: items })
        }
      })
  }, [ state.imageToUpload ])

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

      { state.uploading && (
        <ImageUpload image={state.imageToUpload} />
      )}
    </div>
  )
}

export default Feed
