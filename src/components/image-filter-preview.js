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
      <div className="filter-preview__filters">
        <Filter
          image={props.image}
          name="Normal"
          normal
          onSelect={onSelect}
        />

        <Filter
          image={props.image}
          colors={{
            mix: {
              color: 'mistyrose',
              amount: 10
            }
          }}
          name="Mistyrose"
          onSelect={onSelect}
        />

        <Filter
          name="Sépia"
          image={props.image}
          sepia={true}
          onSelect={onSelect}
        />
      </div>
    </section>
  )
}

export default ImageFilterPreview
