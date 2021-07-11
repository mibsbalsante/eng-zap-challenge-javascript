import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import { useContext } from '@context/apartments'
import Container from '@comp/container'
import Feed from '@comp/feed'
import Filters from '@comp/filters'
import Pagination from '@comp/pagination'

import styles from './styles.css'

const Home = ({ location }) => {
  const history = useHistory()
  const [company, setCompany] = useState(null)

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
  }, [])

  useEffect(() => {
    // prevents filter reset at first page load, changing search params only after it
    if (state.firstLoad) return

    const params = new URLSearchParams(location.search)
    state.knownFilters.map(key => {
      params.set(key, state[key])
    })

    history.push({
      pathname: location.pathname,
      search: params.toString(),
    })
    dispatch({ type: 'FIRST_LOAD' })
  }, [state.bedrooms, state.bathrooms, state.parking, state.purpose, state.page])

  useEffect(() => {
    const paramsRange = [
      {
        param: 'priceMin',
        value: state.priceRange.min,
      },
      { param: 'priceMax', value: state.priceRange.max },
      { param: 'areasMin', value: state.squareMetersRange.min },
      { param: 'areasMax', value: state.squareMetersRange.max },
    ]

    const paramsToURL = paramsRange.filter(({ value }) => !!value)

    const params = new URLSearchParams(location.search)
    paramsToURL.map(({ param, value }) => {
      params.set(param, value)
    })

    history.push({
      pathname: location.pathname,
      search: params.toString(),
    })
  }, [state.priceRange, state.squareMetersRange])

  useEffect(() => {
    if (location.pathname !== '/') setCompany(location.pathname.slice(1))
    else setCompany(null)
  }, [location.pathname])

  return (
    <Container>
      <div className={styles.pageHome}>
        <Filters className={styles.pageHomeFilters} />
        {company && <p>Mostrando apenas imóveis de {state.companies[company]}</p>}
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
