import React from 'react'

import PictureOwner from './picture-owner'
import PictureFooter from './picture-footer'

import './picture.css'

function Picture({ image = 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'}) {
  return (
    <div className="picture">
      <PictureOwner />

      <img
        src={image}
        className="picture__image"
      />

      <PictureFooter />
    </div>
  )
}

export default Picture
