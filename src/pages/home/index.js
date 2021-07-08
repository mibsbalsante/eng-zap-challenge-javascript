import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import Feed from '@comp/feed'
import Filters from '@comp/filters'
import Pagination from '@comp/pagination'
import request from '@util/request'

import styles from './styles.css'

const Home = ({ location }) => {
  const history = useHistory()
  const [company, setCompany] = useState(null)

  const getApartments = useCallback(async () => {
    const apartments = await request()
    console.info('>>apartments', apartments)
    const locs = apartments.map(({ address }) => ({
      city: address.city,
      neighborhood: address.neighborhood,
    }))
    console.info('>>all locs', locs)
  }, [])

  useEffect(getApartments, [])

  useEffect(() => {
    // TODO: move it to a HOC
    history.listen(location => {
      const query = new URLSearchParams(location.search)
      const queryEntries = []

      query.forEach((value, key) => {
        queryEntries.push({ value, key })
      })
    })
  }, [])

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
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
}

export default Home
