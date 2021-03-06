import React, { useEffect } from 'react'

import { navigate } from '@reach/router'
import Spinner from 'react-spinkit'
import useDebouncedCallback from 'use-debounce/lib/callback';

import { useStateValue } from '../state-provider'
import firebase, { db } from '../firebase'

import Header from '../components/header'
import Picture from '../components/picture'
import ImageUpload from './image-upload'

import './feed.css'

const PAGE_SIZE = 15

function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
}

function Feed(props) {
  const [ state, dispatch ] = useStateValue()

  const [ onScroll ] = useDebouncedCallback((event) => {
    const documentHeight = getDocHeight()
    const scrollPosition = window.scrollY + window.innerHeight

    if (scrollPosition + 100 > documentHeight && state.feed.haveNext) {
      db.collection('posts').orderBy('createdAt', 'desc').startAfter(state.feed.lastVisible).limit(PAGE_SIZE).get()
        .then(snapshot => {
          const lastVisible = snapshot.docs[snapshot.docs.length - 1]
          let posts = []

          snapshot.forEach(doc => posts.push(doc.data()))

          dispatch({ type: 'GOT_MORE_POSTS', posts, lastVisible })
        })
    } else if (window.scrollY == 0) {
      db.collection('posts').orderBy('createdAt', 'desc').limit(PAGE_SIZE).get()
        .then(snapshot => {
          const lastVisible = snapshot.docs[snapshot.docs.length - 1]
          let posts = []

          snapshot.forEach(doc => posts.push(doc.data()))

          dispatch({ type: 'GOT_FEED', posts, lastVisible })
        })
    }
  }, 1000, [ state.feed.lastVisible ])

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
    if (state.geolocationSupport) {
      window.navigator.geolocation.getCurrentPosition(({ coords }) => {
        dispatch({ type: 'GOT_COORDS', payload: coords })
      })
    }

    db.collection('posts').orderBy('createdAt', 'desc').limit(PAGE_SIZE).get()
      .then(snapshot => {
        const lastVisible = snapshot.docs[snapshot.docs.length - 1]
        let posts = []

        snapshot.forEach(doc => posts.push(doc.data()))

        dispatch({ type: 'GOT_FEED', posts, lastVisible })
      })
  }, [ state.imageToUpload ])

  useEffect(() => {
    window.removeEventListener('scroll', onScroll)
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [ state.feed.lastVisible ])

  return (
    <div className="feed">
      <Header />
      <div className="container">
        { !state.feed.loading && state.feed.items.map(item => (
          <Picture
            key={item.id}
            {...item}
          />
        ))}

        { !state.feed.loading && state.feed.items.length === 0 && (
          <div className="feed__empty-state">
            <h2>Ainda não temos fotos publicadas, seja o primeiro ;)</h2>
          </div>
        )}

        { state.feed.loading && (
          <Spinner className="feed__spinner" name="circle" fadeIn="none" />
        )}
      </div>

      { !state.feed.loading && state.feed.haveNext && (
        <Spinner
          name="circle"
          style={{
            margin: '0 auto',
            marginTop: '20px',
            marginBottom: '20px'
          }}
        />
      )}

      { !state.feed.loading && !state.feed.haveNext && (<div></div>) }

      { state.uploading && (
        <ImageUpload image={state.imageToUpload} />
      )}
    </div>
  )
}

export default Feed
