import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { ApartmentsConsumer } from '@context/apartments'
import NotFound from '@comp/not-found'
import Card from '@comp/card'

import styles from './styles.css'

const Feed = ({ className }) => (
  <div className={classNames(styles.feed, className)}>
    <ApartmentsConsumer>
      {({ state }) =>
        state.results && state.results.length > 0 ? (
          state.results.map(result => <Card key={result.id} {...result} />)
        ) : (
          <NotFound />
        )
      }
    </ApartmentsConsumer>
  </div>
)

Feed.propTypes = {
  className: PropTypes.string.isRequired,
}

export default Feed
