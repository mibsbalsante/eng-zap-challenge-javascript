import classNames from 'classnames'
import React from 'react'
import { useLocation, Link } from 'react-router-dom'

import styles from './styles.css'

const NotFound = () => {
  const location = useLocation()

  return (
    <div className={styles.notFound}>
      <i className={classNames('fas fa-building fa-3x', styles.building)} />

      <p className={styles.text}>
        Não encontramos resultados com esses filtros <i className='fas fa-sad-cry' />
      </p>

      <Link to={location.pathname} className={styles.link}>
        Voltar ao início
      </Link>
    </div>
  )
}

export default NotFound
