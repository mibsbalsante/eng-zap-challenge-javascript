import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.css'

const Pagination = ({ className }) => (
  <nav className={classNames(styles.pagination, className)}>
    <a href='#'>anterior</a>
    <a href='#'>1</a>
    <a href='#'>2</a>
    <a href='#'>3</a>
    <a href='#'>proxima</a>
  </nav>
)

Pagination.propTypes = {
  className: PropTypes.string.isRequired,
}

export default Pagination
