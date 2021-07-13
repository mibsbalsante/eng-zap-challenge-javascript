import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { useContext } from '@context/apartments'

// eslint-disable-next-line react/display-name
const withFilters = Component => props => {
  const location = useLocation()
  const { state, dispatch } = useContext()

  useEffect(() => {
    if (state.results.length > 0) {
      setTimeout(() => dispatch({ type: 'SET_LOADING', payload: false }), 600)
    }
  }, [state.results])

  useEffect(() => {
    // fix stuck on loading
    setTimeout(() => {
      dispatch({ type: 'SET_LOADING', payload: false })
    }, 5000)
  }, [state.isLoading])

  // TODO: move all searchparams logic to a hoc

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true })

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

    dispatch({ type: 'SET_FILTERED_RESULTS' })
  }, [location.pathname])

  return <Component {...props} />
}

export default withFilters
