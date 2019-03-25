import React from 'react'

import { useStateValue } from '../state-provider'

import './header.css'
import logo from '../assets/logo.svg'
import add from '../assets/add.svg'

function Header(props) {
  const [ state, dispatch ] = useStateValue()

  const onFileSelected = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      const reader = new FileReader()

      reader.onload = function (e) {
        var img = new Image()
        img.src = e.target.result;

        img.onload = function () {
          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);

          var MAX_WIDTH = 400;
          var MAX_HEIGHT = 400;
          var width = this.width;
          var height = this.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          var dataurl = canvas.toDataURL(file.type);

          console.log(dataurl)

          dispatch({ type: 'GOT_IMAGE', payload: dataurl })
        }

      };

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
