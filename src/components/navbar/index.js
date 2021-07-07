import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

import Search from '@comp/search'
import logoGrupo from '@img/grupozap.png'
import logoVivaReal from '@img/vivareal.png'
import logoZap from '@img/zap.png'

import styles from './styles.css'

const Navbar = () => (
  <header className={styles.navbar}>
    <div className={styles.container}>
      <Link
        to='/'
        alt='Mostrar todos os resultados'
        className={classNames(styles.link, styles.linkHome)}
      >
        <img src={logoGrupo} alt='' />
      </Link>
      <nav className={styles.navigation}>
        <Link
          to='/vivareal'
          alt='Mostrar apenas resultados de Viva Real'
          className={classNames(styles.link, styles.linkVivareal)}
        >
          <img src={logoVivaReal} alt='' />
        </Link>
        <Link
          to='/zap'
          alt='Mostrar apenas resultados de Zap Imóveis'
          className={classNames(styles.link, styles.linkZap)}
        >
          <img src={logoZap} alt='' />
        </Link>
      </nav>
      <Search />
    </div>
  </header>
)

export default Navbar
