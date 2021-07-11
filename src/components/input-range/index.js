import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { useContext } from '@context/apartments'

import Input from './input'
import styles from './styles.css'

const InputRange = props => {
  const { state, dispatch } = useContext()

  const [fieldValues, setFieldValues] = useState({ min: 0, max: 0 })

  const handleReplace = ({ value, type }) => {
    let current = Number((value || '').replace(/\./g, '').replace(/,/g, '.'))

    setFieldValues(old => ({ ...old, ...{ [type]: current } }))
    dispatch({ type: 'SET_RANGE_FIELD', payload: { field: props.field, value: fieldValues } })
  }

  useEffect(() => {
    setFieldValues(state[props.field])
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
}

export default InputRange
