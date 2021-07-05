import React from 'react'

import styles from './styles.css'

const Navbar = () => (
  <header className={styles.navbar}>
    <a href='/'>Home</a>
    <nav>
      <a href='/'>Alugar</a>
      <a href='/'>Comprar</a>
    </nav>
    <form action='#'>
      <input type='text' placeholder='Pesquisar' />
      <button>
        <img src='#' alt='Enviar' />
      </button>
    </form>
  </header>
)

export default Navbar
