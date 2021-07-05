import React from 'react'
import { Link } from 'react-router-dom'

import Search from '@comp/search'

import styles from './styles.css'

const Navbar = () => (
  <header className={styles.navbar}>
    <Link to='/'>Home</Link>
    <nav>
      <Link to='/zap'>Zap</Link>
      <Link to='/vivareal'>VivaReal</Link>
    </nav>
    <Search />
  </header>
)

export default Navbar
