import React from 'react'

import logo from '../assets/logo.svg'
import './login.css'

function Login(props) {
  return (
    <section className="login">
      <div className="login__content">
        <div className="login__logo">
          <img
            src={logo}
            className="login__logo-image"
          />

          <h4 className="login__logo-name">
            <small>#</small>Blayton
          </h4>
        </div>

        <div className="login__options">
          <button className="button">
            Entrar com Instagram
          </button>

          <button className="button">
            Entrar com Facebook
          </button>

          <button className="button">
            Entrar com Github
          </button>
        </div>
      </div>
    </section>
  )
}

export default Login
