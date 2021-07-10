import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useContext } from '@context/apartments'
import helperStyles from '@config/helper-classes.css'

import styles from './styles.css'

const Selection = ({ current, field, options, textComplement }) => {
  const { dispatch } = useContext()

  const defaultOption = { value: '', label: 'Todos' }

  const currentOptions = [defaultOption]
  currentOptions.push(
    ...options.map(option => (option.value ? option : { value: option, label: option }))
  )

  return (
    <div className={styles.selection}>
      {currentOptions.map(option => (
        <button
          key={option.value}
          className={classNames(helperStyles.formControl, styles.option, {
            [styles.current]: current === option.value,
          })}
          onClick={() => {
            if (current !== option.value)
              dispatch({ type: 'SET_FILTERS', payload: { [field]: option.value } })
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
  current: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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
