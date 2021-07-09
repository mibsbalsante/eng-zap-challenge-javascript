import React from 'react'
import PropTypes from 'prop-types'
import Carousel from 'react-elastic-carousel'

import SliderArrow from './arrow'
import styles from './styles.css'

const Slider = ({ images, type, height }) => {
  const propsMinimal = {
    pagination: false,
    enableSwipe: false,
    enableMouseSwipe: false,
  }

  const propsFull = {}

  const props = {
    ...(type === 'minimal' ? propsMinimal : propsFull),
    // eslint-disable-next-line react/display-name
    renderArrow: props => <SliderArrow {...props} />,
  }

  return (
    <div className={styles.slider}>
      <Carousel itemsToShow={1} {...props}>
        {images.map(url => (
          <img
            key={url}
            height={height}
            onClick={({ target }) => console.info('>>click', target)}
            src={url}
            className={styles.img}
          />
        ))}
      </Carousel>
    </div>
  )
}

Slider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
}

Slider.defaultProps = {
  images: [],
  type: 'minimal',
  height: 400,
}

export default Slider
