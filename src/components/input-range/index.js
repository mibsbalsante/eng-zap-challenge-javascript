import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import CurrencyInput from 'react-currency-input-field'

import helperStyles from '@config/helper-classes.css'

import styles from './styles.css'

const Input = ({ field, format, placeholder, type }) => (
  <div className={styles.inputContainer}>
    <CurrencyInput
      id={`${field}-${type}`}
      name={`${field}-${type}`}
      allowDecimals={format === 'money'}
      allowNegativeValue={false}
      placeholder={placeholder}
      decimalSeparator=','
      groupSeparator='.'
      decimalsLimit={2}
      onValueChange={(value, name) => console.info('>>inputrange values::', value, name)}
      className={classNames(helperStyles.formControl, styles.input, {
        [styles.money]: format === 'money',
      })}
    />

    {format === 'money' && <span className={styles.currency}>R$</span>}
  </div>
)

Input.propTypes = {
  format: PropTypes.string,
  field: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

Input.defaultProps = {
  format: 'int',
}

const InputRange = props => (
  <div className={styles.range}>
    <Input {...props} type='min' placeholder='Mínimo' />
    <Input {...props} type='max' placeholder='Máximo' />
  </div>
)

export default InputRange
