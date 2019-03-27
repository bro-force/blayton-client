import React from 'react'

import './picture-owner.css'

function PictureOwner(props) {
  return (
    <div className="picture-owner">
      <img
        src={props.photo}
        className="picture-owner__image"
        alt={props.name}
      />
      <h4 className="picture-owner__name">{ props.name }</h4>
    </div>
  )
}

export default PictureOwner
