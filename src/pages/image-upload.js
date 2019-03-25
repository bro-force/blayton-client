import React, { useCallback } from 'react'

import ImagePreview from '../components/image-preview'
import ImageFilterPreview from '../components/image-filter-preview'

import { useStateValue } from '../state-provider'
import './image-upload.css'

function ImageUpload(props) {
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

    dispatch({ type: 'COMPLETE_UPLOAD' })
  })

  return (
    <section className="image-upload">
      <div className="image-upload__nav">
        { state.uploadStep === 1 && (
          <a
            className="image-upload__nav-button"
            onClick={cancel}
            href="#"
          >
            Cancelar
          </a>
        )}

        { state.uploadStep > 1 && state.uploadStep <= 3 && (
          <a
            className="image-upload__nav-button"
            onClick={previousStep}
            href="#"
          >
            Voltar
          </a>
        )}

        { state.uploadStep > 0 && state.uploadStep < 3 && (
          <a
            className="image-upload__nav-button"
            onClick={nextStep}
            href="#"
          >
            Próximo
          </a>
        )}

        { state.uploadStep === 3 && (
          <a
            className="image-upload__nav-button"
            onClick={complete}
            href="#"
          >
            Postar
          </a>
        )}
      </div>

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
