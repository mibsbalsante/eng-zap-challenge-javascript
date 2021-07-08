import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useHistory, useLocation } from 'react-router-dom'

import styles from './styles.css'

const Selection = ({ field, options, textComplement }) => {
  let history = useHistory()
  let location = useLocation()

  const [current, setCurrent] = useState({ value: '' })

  const currentOptions = options.map(option =>
    option.value ? option : { value: option, label: option }
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
          className={classNames(styles.option, {
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
          {textComplement}
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
