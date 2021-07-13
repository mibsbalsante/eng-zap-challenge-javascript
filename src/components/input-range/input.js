import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import CurrencyInput from 'react-currency-input-field'

import helperStyles from '@config/helper-classes.css'

import styles from './styles.css'

const Input = ({ field, format, placeholder, type, value, onBlur, onChange }) => (
  <div className={styles.inputContainer}>
    <CurrencyInput
      id={`${field}-${type}`}
      name={`${field}-${type}`}
      allowNegativeValue={false}
      allowDecimals={false}
      disableAbbreviations={true}
      maxLength={8}
      placeholder={placeholder}
      decimalSeparator=','
      groupSeparator='.'
      value={value ? value : ''}
      onBlur={({ target }) => onBlur({ value: target.value, type })}
      onValueChange={val => onChange({ value: val, type })}
      className={classNames(helperStyles.formControl, styles.input, {
        [styles.money]: format === 'money',
      })}
    />

    {format === 'money' && <span className={styles.currency}>R$</span>}
  </div>
)

Input.propTypes = {
  format: PropTypes.string,
  value: PropTypes.number,
  field: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
}

Input.defaultProps = {
  format: 'int',
  value: 0,
}

export default Input
