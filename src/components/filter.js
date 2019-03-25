import React, { useState, useCallback, useEffect } from 'react'

import ProcessImage from 'react-imgpro'
import Spinner from 'react-spinkit'
import classNames from 'classnames'

function Filter({
  name,
  normal = false,
  filter = 'valencia',
  ...props
}) {
  const [ loading, setLoading ] = useState(!normal)
  const [ processedImage, setProcessedImage ] = useState()

  const handleSelect = useCallback(() => {
    props.onSelect(processedImage || props.image)
  }, [ processedImage ])

  useEffect(() => {
    const img = new Image()
    img.src = props.image

    const imageWithFilter = window.filterous.importImage(img)
      .applyInstaFilter(filter)

    const dataUrl = imageWithFilter.canvas.toDataURL(img.type)

    setProcessedImage(dataUrl)
  }, [])

  return (
    <div
      className="filter-preview__filter"
      onClick={handleSelect}
    >
      <span className="filter-preview__name">
        { name }
      </span>

      <div
        className={classNames({
          "filter-preview__image-wrapper": true,
        })}
      >
        <img src={processedImage} />
      </div>
    </div>
  )
}

export default Filter
