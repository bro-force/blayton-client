import React, { useState, useCallback } from 'react'

import Cropper from 'react-easy-crop'

import getCroppedImg from '../helpers/create-image'
import './image-preview.css'

function ImagePreview(props) {
  const [ zoom, setZoom ] = useState(1)
  const [ crop, setCrop ] = useState({ x: 0, y: 0 })
  const [ pixelCrop, setPixelCrop ] = useState()

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setPixelCrop(croppedAreaPixels)
  }, [ zoom, crop ])

  const onComplete = useCallback(async (event) => {
    const base64 = await getCroppedImg(props.image, pixelCrop)
  }, [ pixelCrop ])

  return (
    <section
      className="image-preview"
    >
      <div className="image-preview__cropper-wrapper">
        <Cropper
          image={props.image}
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
    </section>
  )
}

export default ImagePreview
