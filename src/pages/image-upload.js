import React from 'react'

import ImagePreview from '../components/image-preview'

import { useStateValue } from '../state-provider'
import './image-upload.css'

function ImageUpload(props) {
  const [ state, dispatch ] = useStateValue()

  return (
    <section className="image-upload">
      <div className="image-upload__nav">
        <a
          className="image-upload__nav-button"
          href="#"
        >
          Cancelar
        </a>
        <a
          className="image-upload__nav-button"
          href="#"
        >
          Próximo
        </a>
      </div>

      <div className="image-preview__content">
        <ImagePreview image={state.imageToUpload} />
      </div>
    </section>
  )
}

export default ImageUpload
