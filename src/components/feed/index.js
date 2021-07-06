import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Card from '@comp/card'

import styles from './styles.css'

const Feed = ({ className }) => (
  <div className={classNames(styles.feed, className)}>
    <Card />
    <Card />
  </div>
)

Feed.propTypes = {
  className: PropTypes.string.isRequired,
}

export default Feed
