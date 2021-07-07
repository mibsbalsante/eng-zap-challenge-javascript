import React from 'react'

import styles from './styles.css'

const Search = () => (
  <form action='#' className={styles.search}>
    <input type='text' placeholder='Pesquisar por localização' className={styles.input} />
    <button type='submit' title='Enviar' className={styles.button}>
      <i className='fas fa-search fa-lg'></i>
    </button>
  </form>
)

export default Search
