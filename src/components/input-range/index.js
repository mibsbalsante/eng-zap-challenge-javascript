import React from 'react'

import styles from './styles.css'

const InputRange = () => (
  <div className={styles.inputRange}>
    <input type='number' placeholder='Mínimo' />
    <input type='number' placeholder='Máximo' />
  </div>
)

export default InputRange
