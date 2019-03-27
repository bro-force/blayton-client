import React, { useCallback, useState } from 'react'

import uniqid from 'uniqid'
import Spinner from 'react-spinkit'

import ImagePreview from '../components/image-preview'
import ImageFilterPreview from '../components/image-filter-preview'

import { useStateValue } from '../state-provider'
import { storageRef, database } from '../firebase'
import './image-upload.css'

function ImageUpload(props) {
  const [ loading, setLoading ] = useState(false)
  const [ state, dispatch ] = useStateValue()

  const cancel = useCallback((event) => {
    event.preventDefault()

    dispatch({ type: 'CANCEL_UPLOAD' })
  }, [])

  const nextStep = useCallback((event) => {
    event.preventDefault()

    dispatch({ type: 'NEXT_UPLOAD_STEP' })
  }, [])

  const previousStep = useCallback((event) => {
    event.preventDefault()

    dispatch({ type: 'PREVIOUS_UPLOAD_STEP' })
  }, [])

  const complete = useCallback((event) => {
    event.preventDefault()

    setLoading(true)

    const postId = uniqid('post:')
    const imagePath = `images/${state.user.uid}/${uniqid()}.jpg`
    const ref = storageRef.child(imagePath)
    const uploadTask = ref.putString(state.croppedImage, 'data_url')

    uploadTask.on('state_changed', null, () => setLoading(false), async () => {
      const imageUrl = await storageRef.child(imagePath).getDownloadURL()

      const payload = {
        id: postId,
        userId: state.user.uid,
        displayName: state.user.displayName,
        userPhoto: state.user.photoURL,
        userEmail: state.user.email,
        image: imagePath,
        createdAt: Date.now(),
        imageUrl
      }

      database.ref(`posts/user:${state.user.uid}/${postId}`).set(payload)
      database.ref(`feed/${postId}`).set(payload)

      setLoading(false)
      dispatch({ type: 'COMPLETE_UPLOAD' })
    })
  })

  return (
    <section className="image-upload">
      <div className="image-upload__nav">
        { state.uploadStep === 1 && (
          <button
            className="image-upload__nav-button"
            onClick={cancel}
          >
            Cancelar
          </button>
        )}

        { state.uploadStep > 1 && state.uploadStep <= 2 && (
          <button
            className="image-upload__nav-button"
            onClick={previousStep}
          >
            Voltar
          </button>
        )}

        { state.uploadStep > 0 && state.uploadStep < 2 && (
          <button
            className="image-upload__nav-button"
            onClick={nextStep}
          >
            Próximo
          </button>
        )}

        { state.uploadStep === 2 && !loading && (
          <button
            className="image-upload__nav-button"
            onClick={complete}
          >
            Postar
          </button>
        )}

        { state.uploadStep === 2 && loading && (
          <Spinner name='circle' fadeIn="none" />
        )}
      </div>

      { !props.image && (
        <Spinner
          name="circle"
          fadeIn="none"
          className="image-upload__spinner"
        />
      )}

      <div className="image-preview__content">
        { state.uploadStep === 1 && (
          <ImagePreview image={state.imageToUpload} />
        )}

        { state.uploadStep === 2 && (
          <ImageFilterPreview image={state.croppedImage} />
        )}
      </div>
    </section>
  )
}

export default ImageUpload
