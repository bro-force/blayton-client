import React from 'react'

import './picture-owner.css'

function PictureOwner(props) {
  return (
    <div className="picture-owner">
      <img
        src="https://avatars3.githubusercontent.com/u/9627967?s=460&v=4"
        className="picture-owner__image"
      />
      <h4 className="picture-owner__name">Clayton</h4>
    </div>
  )
}

export default PictureOwner
