import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { useContext } from '@context/apartments'
import Container from '@comp/container'
import Feed from '@comp/feed'
import Filters from '@comp/filters'
import Pagination from '@comp/pagination'

import styles from './styles.css'

const Home = ({ location }) => {
  const { state, dispatch } = useContext()

  // TODO: move all searchparams logic to a hoc
  useEffect(() => {
    const query = new URLSearchParams(location.search)
    const params = Object.fromEntries(query.entries())
    const parseToNumber = val => Number(val) || 0
    const rangeParams = {
      priceRange: {
        field: 'priceRange',
        value: { min: parseToNumber(params.priceMin), max: parseToNumber(params.priceMax) },
      },
      squareMetersRange: {
        field: 'squareMetersRange',
        value: { min: parseToNumber(params.areasMin), max: parseToNumber(params.areasMax) },
      },
    }

    dispatch({ type: 'SET_FILTERS', payload: params })
    dispatch({ type: 'SET_RANGE_FIELD', payload: rangeParams.priceRange })
    dispatch({
      type: 'SET_RANGE_FIELD',
      payload: rangeParams.squareMetersRange,
    })
    dispatch({ type: 'SET_FILTERED_RESULTS' })
  }, [location.search, state.apartments])

  useEffect(() => {
    if (location.pathname !== '/')
      dispatch({ type: 'SET_COMPANY', payload: location.pathname.slice(1) })
    else dispatch({ type: 'SET_COMPANY', payload: '' })
  }, [location.pathname])

  return (
    <Container>
      <div className={styles.pageHome}>
        <Filters className={styles.pageHomeFilters} />
        {state.company && (
          <p className={styles.pageHomeCompany}>
            Mostrando apenas imóveis de{' '}
            <span className={state.company}>{state.companies[state.company]}</span>
          </p>
        )}
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
