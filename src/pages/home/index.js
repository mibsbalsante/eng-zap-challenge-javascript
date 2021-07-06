import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'

import Feed from '@comp/feed'
import Filters from '@comp/filters'
import Pagination from '@comp/pagination'
import request from '@util/request'

import styles from './styles.css'

const Home = ({ location }) => {
  const getUsers = useCallback(async () => {
    const users = await request()
    console.info('>>users', users)
  }, [])

  useEffect(getUsers, [])

  return (
    <div className={styles.pageHome}>
      <Filters className={styles.pageHomeFilters} />
      <Feed className={styles.pageHomeFeed} />
      <Pagination className={styles.pageHomePagination} />
    </div>
  )
}

Home.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
}

export default Home
