import React from 'react'

import styles from './styles.css'

const Search = () => (
  <form action='#' className={styles.search}>
    <input type='text' placeholder='Pesquisar' />
    <button>
      <img src='#' alt='Enviar' />
    </button>
  </form>
)

export default Search
