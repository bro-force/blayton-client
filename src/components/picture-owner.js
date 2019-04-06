import React from 'react'

import Spinner from 'react-spinkit'

import './picture-owner.css'
import deleteIcon from '../assets/delete.svg'

function PictureOwner(props) {
  return (
    <div className="picture-owner">
      <img
        src={props.photo}
        className="picture-owner__image"
        alt={props.name}
      />
      <h4 className="picture-owner__name">{ props.name }</h4>

      { props.canDelete && !props.deleting && (
        <img
          src={deleteIcon}
          className="picture-owner__delete"
          alt="Delete"
          onClick={props.onDelete}
        />
      )}

      { props.canDelete && props.deleting && (
        <Spinner className="picture-owner__spinner" name="circle" fadeIn="none" />
      )}
    </div>
  )
}

export default PictureOwner
