import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import helperStyles from '@config/helper-classes.css'

import styles from './styles.css'

const Input = ({ format, placeholder }) => (
  <div className={styles.inputContainer}>
    <input
      type='number'
      min={0}
      placeholder={placeholder}
      className={classNames(helperStyles.formControl, styles.input, {
        [styles.money]: format === 'money',
      })}
    />
    {format === 'money' && <span className={styles.currency}>R$</span>}
  </div>
)

Input.propTypes = {
  format: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
}

Input.defaultProps = {
  format: 'int',
}

const InputRange = props => (
  <div className={styles.range}>
    <Input {...props} placeholder='Mínimo' />
    <Input {...props} placeholder='Máximo' />
  </div>
)

export default InputRange
