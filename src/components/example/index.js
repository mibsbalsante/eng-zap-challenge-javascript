import React from 'react'

import styles from './styles.css'

const Example = () => (
  <p className={`${styles.example} ${styles['example--bold']}`}>Example component</p>
)

export default Example
