import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Carousel from 'react-elastic-carousel'

import SliderArrow from './arrow'
import styles from './styles.css'

const Slider = ({ images, type, height, className }) => {
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
    <div className={classNames(styles.slider, className)} style={{ height }}>
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
