import React, { useState, useCallback, useEffect } from 'react'

import ProcessImage from 'react-imgpro'
import Spinner from 'react-spinkit'
import classNames from 'classnames'

function Filter({
  name,
  image,
  normal = false,
  filter = 'valencia',
  ...props
}) {
  const [ loading, setLoading ] = useState(!normal)
  const [ processedImage, setProcessedImage ] = useState(image)

  const handleSelect = useCallback(() => {
    props.onSelect(processedImage || image)
  }, [ processedImage ])

  useEffect(() => {
    const img = new Image()
    img.src = image

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
        className="filter-preview__image-wrapper"
        style={{ backgroundImage: `url(${processedImage})`}}
      >
      </div>
    </div>
  )
}

export default Filter
