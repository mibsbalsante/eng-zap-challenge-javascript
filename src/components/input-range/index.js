import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory, useLocation } from 'react-router-dom'

import Input from './input'
import styles from './styles.css'

const InputRange = props => {
  const history = useHistory()
  const location = useLocation()

  const [fieldValues, setFieldValues] = useState({ min: 0, max: 0 })

  const handleFilter = ({ value, type }) => {
    let current = Number((value || '').replace(/\D/g, ''))
    const values = { ...fieldValues, ...{ [type]: current } }

    const params = new URLSearchParams(location.search)
    params.set(`${props.param}Min`, values.min)
    params.set(`${props.param}Max`, values.max)

    history.push({
      pathname: location.pathname,
      search: params.toString(),
    })
  }

  const handleReplace = ({ value, type }) => {
    let current = Number((value || '').replace(/\D/g, ''))
    setFieldValues(old => ({ ...old, ...{ [type]: current } }))
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
        onBlur={handleFilter}
        onChange={handleReplace}
      />
      {/* TODO: set max input min value to min input value */}
      <Input
        {...props}
        type='max'
        placeholder='Máximo'
        value={fieldValues.max}
        onBlur={handleFilter}
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
