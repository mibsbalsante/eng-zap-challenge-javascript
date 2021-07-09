import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.css'

const SliderArrow = ({ isEdge, type, onClick }) => (
  <button
    className={classNames(styles.arrow, styles[type.toLowerCase()])}
    disabled={isEdge}
    onClick={onClick}
  >
    <div className={styles.indicator}>
      {type === 'PREV' ? (
        <i className='fas fa-angle-left fa-2x' />
      ) : (
        <i className='fas fa-angle-right fa-2x' />
      )}
    </div>
  </button>
)

SliderArrow.propTypes = {
  isEdge: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default SliderArrow
