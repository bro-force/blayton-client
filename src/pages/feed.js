import React, { useEffect } from 'react'

import { navigate } from '@reach/router'

import { useStateValue } from '../state-provider'

import Header from '../components/header'
import Picture from '../components/picture'

import './feed.css'

function Feed(props) {
  const [ state, dispatch ] = useStateValue()

  useEffect(() => {
    if (state.user === null) {
      navigate('/login')
    }
  }, [ state.user ])

  return (
    <div className="feed">
      <Header />
      <div className="container">
        <Picture />
      </div>
    </div>
  )
}

export default Feed
