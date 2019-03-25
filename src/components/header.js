import React from 'react'

import './header.css'
import logo from '../assets/logo.svg'
import add from '../assets/add.svg'

function Header(props) {
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
            accept="image/*;capture=camera"
            type="file"
          />
        </label>
      </div>
    </header>
  )
}

export default Header
