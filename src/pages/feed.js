import React from 'react'

import Header from '../components/header'
import Picture from '../components/picture'

import './feed.css'

function Feed(props) {
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
