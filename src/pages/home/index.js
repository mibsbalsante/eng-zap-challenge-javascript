import React from 'react'
import PropTypes from 'prop-types'

import Filters from '@comp/filters'
import Pagination from '@comp/pagination'

import styles from './styles.css'

const Home = ({ location }) => (
  <div className={styles.home}>
    <p>Homepage: {location.pathname}</p>
    <Filters />
    <Pagination />
  </div>
)

Home.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
}

export default Home
