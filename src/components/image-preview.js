import React, { useState, useCallback } from 'react'

import Cropper from 'react-easy-crop'

import { useStateValue } from '../state-provider'
import getCroppedImg from '../helpers/create-image'
import './image-preview.css'

function ImagePreview(props) {
  const [ state, dispatch ] = useStateValue()

  const [ zoom, setZoom ] = useState(1)
  const [ crop, setCrop ] = useState({ x: 0, y: 0 })

  const onCropComplete = useCallback(async (croppedArea, croppedAreaPixels) => {
    const base64 = await getCroppedImg(props.image, croppedAreaPixels)

    dispatch({ type: 'GOT_CROPPED_AREA_PIXELS', payload: croppedAreaPixels })
    dispatch({ type: 'GOT_CROPPED_IMAGE', payload: base64 })
  }, [ zoom, crop ])

  return (
    <section
      className="image-preview"
    >
      <div className="image-preview__cropper-wrapper">
        <Cropper
          image={props.image}
          crop={crop}
          zoom={zoom}
          aspect={0.95}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
    </section>
  )
}

export default ImagePreview
