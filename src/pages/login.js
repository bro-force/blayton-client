import React, { useEffect } from 'react'

import { navigate } from '@reach/router'

import { useStateValue } from '../state-provider'
import firebase, { githubProvider } from '../firebase'

import logo from '../assets/logo.svg'
import './login.css'


function Login(props) {
  const [ state, dispatch ] = useStateValue()

  const loginWithGithub = () => {
    firebase.auth().signInWithPopup(githubProvider)
      .then(result => {
        window.localStorage.setItem('user', JSON.stringify(result.user))
        dispatch({ type: 'GOT_USER', payload: result.user })

        navigate('/')
      })
  }

  useEffect(() => {
    if (state.user !== null) {
      navigate('/')
    }
  }, [ state.user ])


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

          <button
            className="button"
            onClick={loginWithGithub}
          >
            Entrar com Github
          </button>
        </div>
      </div>
    </section>
  )
}

export default Login
