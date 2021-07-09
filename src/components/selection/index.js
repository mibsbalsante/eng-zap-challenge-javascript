import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useHistory, useLocation } from 'react-router-dom'

import helperStyles from '@config/helper-classes.css'

import styles from './styles.css'

const Selection = ({ field, options, textComplement }) => {
  let history = useHistory()
  let location = useLocation()

  const [current, setCurrent] = useState({ value: '' })

  const defaultOption = { value: '', label: 'Todos' }

  const currentOptions = [defaultOption]
  currentOptions.push(
    ...options.map(option => (option.value ? option : { value: option, label: option }))
  )

  // needs to get selected value from route query
  useEffect(() => {
    setCurrent(currentOptions[0])
  }, [])

  return (
    <div className={styles.selection}>
      {currentOptions.map(option => (
        <button
          key={option.value}
          className={classNames(helperStyles.formControl, styles.option, {
            [styles.current]: current && current.value === option.value,
          })}
          onClick={() => {
            setCurrent(option)
            history.push({
              pathname: location.pathname,
              search: `?${field}=${option.value}`,
            })
          }}
          type='button'
        >
          {option.label}
          {option.value && textComplement}
        </button>
      ))}
    </div>
  )
}

Selection.propTypes = {
  field: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.shape({ value: PropTypes.string, label: PropTypes.string }),
    ])
  ).isRequired,
  textComplement: PropTypes.string,
}

Selection.defaultProps = {
  textComplement: '',
}

export default Selection
