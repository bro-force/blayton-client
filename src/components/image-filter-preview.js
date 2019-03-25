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
          image={state.croppedImage}
          name="Normal"
          filter="normal"
          onSelect={onSelect}
        />

        <Filter
          image={state.croppedImage}
          name="Clarendon"
          filter="clarendon"
          onSelect={onSelect}
        />

        <Filter
          image={state.croppedImage}
          name="Juno"
          filter="juno"
          onSelect={onSelect}
        />

        <Filter
          image={state.croppedImage}
          name="Lark"
          filter="lark"
          onSelect={onSelect}
        />

        <Filter
          image={state.croppedImage}
          name="Valência"
          filter="valencia"
          onSelect={onSelect}
        />

        <Filter
          image={state.croppedImage}
          name="Brooklyn"
          filter="brooklyn"
          onSelect={onSelect}
        />
      </div>
    </section>
  )
}

export default ImageFilterPreview
