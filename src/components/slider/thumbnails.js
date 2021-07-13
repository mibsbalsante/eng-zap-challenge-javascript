import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.css'

const SliderThumbnails = ({ images, pages, activePage, onClick }) => (
  <div className={styles.thumbnails}>
    {pages.map(page => (
      <button
        key={page}
        className={classNames(styles.button, { [styles.isActive]: activePage === page })}
        onClick={() => onClick(page)}
      >
        <img src={images[page].replace(/(^\w+:|^)\/\//, '//')} className={styles.image} />
      </button>
    ))}
  </div>
)

SliderThumbnails.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  pages: PropTypes.arrayOf(PropTypes.number),
  activePage: PropTypes.number,
  onClick: PropTypes.func.isRequired,
}

SliderThumbnails.defaultProps = {
  images: [],
  pages: [],
  activePage: 0,
  className: undefined,
}

export default SliderThumbnails
