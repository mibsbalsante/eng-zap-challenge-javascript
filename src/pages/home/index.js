import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import Feed from '@comp/feed'
import Filters from '@comp/filters'
import Pagination from '@comp/pagination'
import request from '@util/request'

import styles from './styles.css'

const Home = ({ location }) => {
  const [company, setCompany] = useState(null)

  const getApartments = useCallback(async () => {
    const apartments = await request()
    console.info('>>apartments', apartments)
  }, [])

  useEffect(getApartments, [])

  useEffect(() => {
    if (location.pathname !== '/') setCompany(location.pathname.slice(1))
    else setCompany(null)
  }, [location.pathname])

  return (
    <div className={styles.pageHome}>
      <Filters className={styles.pageHomeFilters} />
      {company && <p>Mostrando apenas imóveis de {company}</p>}
      <Feed className={styles.pageHomeFeed} />
      <Pagination className={styles.pageHomePagination} />
    </div>
  )
}

Home.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
}

export default Home
