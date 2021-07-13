import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { ApartmentsConsumer } from '@context/apartments'
import Card from '@comp/card'

import styles from './styles.css'

const Feed = ({ className }) => (
  <div className={classNames(styles.feed, className)}>
    <ApartmentsConsumer>
      {({ state }) => state.results.map(result => <Card key={result.id} {...result} />)}
    </ApartmentsConsumer>
  </div>
)

Feed.propTypes = {
  className: PropTypes.string.isRequired,
}

export default Feed
