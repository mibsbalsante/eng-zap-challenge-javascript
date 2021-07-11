import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Carousel from 'react-elastic-carousel'

import SliderArrow from './arrow'
import SliderThumbnails from './thumbnails'
import styles from './styles.css'

const Slider = ({ images, type, height, className }) => {
  const carouselRef = useRef()
  const [isHoverStateActive, setHoverStateActive] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const propsMinimal = {
    pagination: false,
    enableSwipe: false,
    enableMouseSwipe: false,
  }

  const propsFull = {
    autoPlaySpeed: 5000,
    enableSwipe: true,
    enableMouseSwipe: true,
    breakPoints: [
      { width: 1, enableAutoPlay: false, pagination: false },
      { width: 768, enableAutoPlay: !isHoverStateActive, pagination: true },
    ],
    // eslint-disable-next-line react/display-name
    renderPagination: props => <SliderThumbnails {...props} images={images} />,
    onChange: (_, pageIndex) => setCurrentSlide(pageIndex),
  }

  const props = {
    ...(type === 'minimal' ? propsMinimal : propsFull),
    // eslint-disable-next-line react/display-name
    renderArrow: props => <SliderArrow {...props} />,
  }

  // pause on mouseover (autoplay only active >= 768px)
  const handleMouseOver = () => setHoverStateActive(true)

  const handleMouseOut = () => setHoverStateActive(false)

  useEffect(() => {
    const { sliderContainer } = carouselRef.current

    if (sliderContainer) {
      sliderContainer.addEventListener('mouseover', handleMouseOver, true)
      sliderContainer.addEventListener('mouseout', handleMouseOut, true)
    }

    return () => {
      sliderContainer.removeEventListener('mouseover', handleMouseOver, true)
      sliderContainer.removeEventListener('mouseout', handleMouseOut, true)
    }
  }, [])

  return (
    <div className={classNames(styles.slider, className)}>
      <Carousel ref={carouselRef} itemsToShow={1} {...props}>
        {images.map((url, ind) => (
          <div key={url} className={styles.slide}>
            <img height={height} src={url} className={styles.img} />
            {type === 'full' && (
              <a
                target='_blank'
                rel='noopener noreferrer'
                href={currentSlide === ind ? url : '#'}
                className={classNames(styles.newTab, { [styles.isVisible]: currentSlide === ind })}
              >
                <i className='fas fa-camera' /> <span>Expandir</span>
              </a>
            )}
          </div>
        ))}
      </Carousel>
    </div>
  )
}

Slider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
}

Slider.defaultProps = {
  images: [],
  type: 'minimal',
  height: '100%',
  className: undefined,
}

export default Slider
