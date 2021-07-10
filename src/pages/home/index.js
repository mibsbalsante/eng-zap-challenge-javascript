import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import { useContext } from '@context/apartments'
import Container from '@comp/container'
import Feed from '@comp/feed'
import Filters from '@comp/filters'
import Pagination from '@comp/pagination'
import request from '@util/request'

import styles from './styles.css'

const Home = ({ location }) => {
  const history = useHistory()
  const [company, setCompany] = useState(null)

  const { dispatch } = useContext()

  const getApartments = useCallback(async () => {
    const apartments = await request()
    dispatch({ type: 'SET_APARTMENTS', payload: apartments })
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
    <Container>
      <div className={styles.pageHome}>
        <Filters className={styles.pageHomeFilters} />
        {company && <p>Mostrando apenas imóveis de {company}</p>}
        <Pagination className={styles.pageHomePaginationTop} />
        <Feed className={styles.pageHomeFeed} />
        <Pagination className={styles.pageHomePagination} />
      </div>
    </Container>
  )
}

Home.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
}

export default Home
