import React from 'react'

import { useStateValue } from '../state-provider'

import './header.css'
import logo from '../assets/logo.svg'
import add from '../assets/add.svg'

function Header(props) {
  const [ state, dispatch ] = useStateValue()

  const onFileSelected = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader()

      reader.onload = function (e) {
        dispatch({ type: 'GOT_IMAGE', payload: e.target.result })
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
