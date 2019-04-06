import React, { useState, useEffect, useCallback } from 'react'

import { storageRef, db } from '../firebase'
import { useStateValue } from '../state-provider'

import PictureOwner from './picture-owner'

import './picture.css'

const PAGE_SIZE = 15

function Picture(props) {
  const [ state, dispatch ] = useStateValue()
  const [ image, setImage ] = useState('')
  const [ deleting, setDeleting ] = useState(false)

  useEffect(() => {
    if (!props.imageUrl) {
      storageRef
        .child(props.image)
        .getDownloadURL()
        .then(setImage)
    }
  }, [])

  const fetchFeed = () => {
    db.collection('posts').orderBy('createdAt', 'desc').limit(PAGE_SIZE).get()
      .then(snapshot => {
        const lastVisible = snapshot.docs[snapshot.docs.length - 1]
        let posts = []

        snapshot.forEach(doc => posts.push(doc.data()))

        dispatch({ type: 'GOT_FEED', posts, lastVisible })
      })
  }

  const deleteImage = useCallback(() => {
    setDeleting(true)

    db.collection('posts').doc(props.id).delete()
      .then(() => {
        setDeleting(false)

        fetchFeed()
        dispatch({ type: 'DELETE_POST', payload: props.id })
      })
      .catch(() => {
        setDeleting(false)
        fetchFeed()
      })
  })

  return (
    <div className="picture">
      <PictureOwner
        photo={props.userPhoto}
        name={props.displayName}
        onDelete={deleteImage}
        deleting={deleting}
        canDelete={state.user.uid === props.userId}
      />

      <img
        src={props.imageUrl || image}
        alt={`Foto de ${props.displayName}`}
        className="picture__image"
      />
    </div>
  )
}

export default Picture
