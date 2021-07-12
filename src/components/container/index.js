import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.css'

const Container = ({ row, children }) => (
  <div className={classNames(styles.container, { [styles.row]: row })}>{children}</div>
)

Container.propTypes = {
  row: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

Container.defaultProps = {
  rows: false,
}

export default Container
