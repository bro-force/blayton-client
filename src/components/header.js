import React from 'react'

import loadImage from 'blueimp-load-image'
import EXIF from 'exif-js'

import { useStateValue } from '../state-provider'

import './header.css'
import logo from '../assets/logo.svg'
import add from '../assets/add.svg'

function Header(props) {
  const [ state, dispatch ] = useStateValue()

  const onFileSelected = (event) => {
    if (event.target.files && event.target.files[0]) {
      dispatch({ type: 'START_UPLOADING' })

      const reader = new FileReader()

      reader.onload = function (e) {
        const img = new Image()
        img.src = e.target.result

        img.onload = function() {
          // Use EXIF to read the correct orientation
          EXIF.getData(img, function() {
            const orientation = EXIF.getTag(this, 'Orientation')
            const canvas =
              // Use loadImage to scale and set the correct orientation
              loadImage.scale(img, {
                orientation: orientation || 0,
                canvas: true,
                maxWidth: 1000 // maximum safe value for iOS
              })

            const dataUrl = canvas.toDataURL('image/jpg')

            dispatch({ type: 'GOT_IMAGE', payload: dataUrl })
          })
        }
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  return (
    <header className="header">
      <div className="header__logo">
        <img
          src={logo}
          alt="Heart"
          className="header__logo-image"
        />
        <div className="header__site-name">
          <small>#</small>Blayton
        </div>
      </div>

      <div className="header__new">
        <label htmlFor="uploader">
          <img src={add} className="header__add-icon" />
          <input
            id="uploader"
            className="header__uploader"
            accept="image/*"
            onChange={onFileSelected}
            type="file"
            capture
          />
        </label>
      </div>
    </header>
  )
}

export default Header
