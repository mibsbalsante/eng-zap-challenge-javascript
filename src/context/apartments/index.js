import React, { createContext, useReducer, useContext } from 'react'
import PropTypes from 'prop-types'

import { initialState, reducer } from './reducer'

const ApartmentsContext = createContext({})

const ApartmentsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <ApartmentsContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </ApartmentsContext.Provider>
  )
}

ApartmentsProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

const useApartmentsContext = () => useContext(ApartmentsContext)

const ApartmentsConsumer = ApartmentsContext.Consumer

export { useApartmentsContext as useContext }
export { ApartmentsConsumer }

export default ApartmentsProvider
