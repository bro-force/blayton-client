import React from 'react'

import './picture-footer.css'
import like from '../assets/like.svg'
import comment from '../assets/comment.svg'

function PictureFooter(props) {
  return (
    <div className="picture-footer">
      <img src={like} alt="Like" className="picture-footer__like" />
      <img src={comment} alt="Like" className="picture-footer__comment" />
    </div>
  )
}

export default PictureFooter
