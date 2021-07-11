import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

import { useContext } from '@context/apartments'

import Input from './input'
import styles from './styles.css'

const InputRange = props => {
  const location = useLocation()
  const { dispatch } = useContext()

  const [fieldValues, setFieldValues] = useState({ min: 0, max: 0 })

  const handleReplace = ({ value, type }) => {
    let current = Number((value || '').replace(/\./g, ''))

    setFieldValues(old => ({ ...old, ...{ [type]: current } }))
    dispatch({ type: 'SET_RANGE_FIELD', payload: { field: props.field, value: fieldValues } })
  }

  useEffect(() => {
    // simplest way to get the range values is to check searchparams directly
    const query = new URLSearchParams(location.search)
    const params = Object.fromEntries(query.entries())

    const getParamValue = key => Number(params[key]) || 0

    setFieldValues({
      min: getParamValue(`${props.param}Min`),
      max: getParamValue(`${props.param}Max`),
    })
  }, [])

  return (
    <div className={styles.range}>
      <Input
        {...props}
        type='min'
        placeholder='Mínimo'
        value={fieldValues.min}
        onChange={handleReplace}
      />
      {/* TODO: set max input min value to min input value */}
      <Input
        {...props}
        type='max'
        placeholder='Máximo'
        value={fieldValues.max}
        onChange={handleReplace}
      />
    </div>
  )
}

InputRange.propTypes = {
  field: PropTypes.string.isRequired,
  param: PropTypes.string.isRequired,
}

export default InputRange
