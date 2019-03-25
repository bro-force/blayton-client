import React, { useState, useCallback } from 'react'

import Filter from '../components/filter'

import { useStateValue } from '../state-provider'

import './image-filter-preview.css'

function ImageFilterPreview(props) {
  const [ state, dispatch ] = useStateValue()

  const onSelect = useCallback((processedImage) => {
    dispatch({ type: 'GOT_FINAL_IMAGE', payload: processedImage })
  })

  return (
    <section className="filter-preview">
      <div className="filter-preview__selected">
        <img src={state.finalImage} />
      </div>
    </section>
  )
}

export default ImageFilterPreview
