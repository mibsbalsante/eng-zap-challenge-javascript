import React, { useCallback, useEffect } from 'react'

import { useContext } from '@context/apartments'
import request from '@util/request'

// eslint-disable-next-line react/display-name
const withApartments = Component => props => {
  const { dispatch } = useContext()

  const getApartments = useCallback(async () => {
    const apartments = await request()
    dispatch({ type: 'SET_APARTMENTS', payload: apartments })
  }, [])

  useEffect(getApartments, [])

  return <Component {...props} />
}

export default withApartments
