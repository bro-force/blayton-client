import React, { useState, useEffect } from 'react'

import { storageRef } from '../firebase'

import PictureOwner from './picture-owner'
import PictureFooter from './picture-footer'

import './picture.css'

function Picture(props) {
  const [ image, setImage ] = useState('')

  useEffect(() => {
    if (!props.imageUrl) {
      storageRef
        .child(props.image)
        .getDownloadURL()
        .then(setImage)
    }
  }, [])

  return (
    <div className="picture">
      <PictureOwner
        photo={props.userPhoto}
        name={props.displayName}
      />

      <img
        src={props.imageUrl || image}
        alt={`Foto de ${props.displayName}`}
        className="picture__image"
      />

      <PictureFooter />
    </div>
  )
}

export default Picture
