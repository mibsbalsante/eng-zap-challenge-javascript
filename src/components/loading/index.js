import React from 'react'

import styles from './styles.css'

const Skeleton = () => (
  <div className={styles.skeleton}>
    <div className={styles.image}></div>
    <div className={styles.content}>
      <div className={styles.top}></div>
      <div className={styles.title}></div>
      <div className={styles.bottom}></div>
    </div>
  </div>
)

const Loading = () => (
  <>
    {Array.from(new Array(3)).map((_, ind) => (
      <Skeleton key={ind} />
    ))}
  </>
)

export default Loading
