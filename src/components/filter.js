import React, { useState, useCallback } from 'react'

import ProcessImage from 'react-imgpro'
import Spinner from 'react-spinkit'
import classNames from 'classnames'

function Filter({
  name,
  normal = false,
  ...props
}) {
  const [ loading, setLoading ] = useState(!normal)
  const [ processedImage, setProcessedImage ] = useState()

  const handleSelect = useCallback(() => {
    props.onSelect(processedImage || props.image)
  }, [ processedImage ])

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
          "filter-preview__image-wrapper--loading": loading
        })}
      >
        { loading && (
          <Spinner
            name="circle"
            color="white"
            fadeIn={0}
          />
        )}

        { normal
            ? <img src={props.image} />
            : (
              <ProcessImage
                processedImage={(src, err) => {
                  setLoading(false)
                  setProcessedImage(src)
                  alert(err)
                }}
                {...props}
              />
            )
        }
      </div>
    </div>
  )
}

export default Filter
