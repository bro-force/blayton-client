import React, { useEffect, useState } from 'react'

import { navigate } from '@reach/router'
import Spinner from 'react-spinkit'

import { useStateValue } from '../state-provider'
import firebase, { providers } from '../firebase'

import logo from '../assets/logo.svg'
import './login.css'


function Login(props) {
  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState()
  const [ state, dispatch ] = useStateValue()

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        dispatch({ type: 'GOT_USER', payload: user })
        setLoading(false)
      } else {
        setLoading(false)
        navigate('/login')
      }
    })
  }, [ state.user ])


  const loginWith = providerName => async () => {
    const provider = providers[providerName]

    setLoading(true)

    if (provider) {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

      try {
        const { user } = await firebase.auth().signInWithRedirect(provider)

        setLoading(false)
        setError(null)

        window.localStorage.setItem('user', JSON.stringify(user))

        dispatch({ type: 'GOT_USER', payload: user })
        navigate('/')
      } catch (err) {
        setLoading(false)
        setError(err)
      }
    }
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
            alt="Blayton logo"
            className="login__logo-image"
          />

          <h4 className="login__logo-name">
            <small>#</small>Blayton
          </h4>
        </div>

        { loading && (
          <Spinner fadeIn="none" name="circle" />
        )}


        { !loading && (
          <div className="login__options">
            <button
              className="button"
              onClick={loginWith('facebook')}
            >
              Entrar com Facebook
            </button>

            <button
              className="button"
              onClick={loginWith('github')}
            >
              Entrar com Github
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Login
