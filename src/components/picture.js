import React, { useState, useEffect } from 'react'

import { storageRef } from '../firebase'

import PictureOwner from './picture-owner'
import PictureFooter from './picture-footer'

import './picture.css'

function Picture(props) {
  const [ image, setImage ] = useState('')

  useEffect(() => {
    storageRef
      .child(props.image)
      .getDownloadURL()
      .then(setImage)
  }, [])

  return (
    <div className="picture">
      <PictureOwner
        photo={props.userPhoto}
        name={props.displayName}
      />

      <img
        src={image}
        className="picture__image"
      />

      <PictureFooter />
    </div>
  )
}

export default Picture
