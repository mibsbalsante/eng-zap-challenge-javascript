import React from 'react'

import Search from '@comp/search'

import styles from './styles.css'

const Navbar = () => (
  <header className={styles.navbar}>
    <a href='/'>Home</a>
    <nav>
      <a href='/'>Zap</a>
      <a href='/'>VivaReal</a>
    </nav>
    <Search />
  </header>
)

export default Navbar
