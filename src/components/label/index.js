import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.css'

const Label = ({ className, htmlFor, children }) => (
  <label className={classNames(styles.label, className)} htmlFor={htmlFor}>
    {children}
  </label>
)

Label.propTypes = {
  className: PropTypes.string,
  htmlFor: PropTypes.string,
  children: PropTypes.node.isRequired,
}

Label.defaultProps = {
  className: undefined,
  htmlFor: '',
}

export default Label
