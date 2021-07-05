import React from 'react'
import { Link } from 'react-router-dom'

import styles from './styles.css'

const Card = () => (
  <article className={styles.card}>
    <Link to='/imovel'>
      <img src='#' alt='' />
      <div>
        <p>endr</p>
        <p>
          <span>R$ 2000,00</span>
          <span>R$ 200,00</span>
        </p>
        <h2>descr</h2>
        <div>
          <p>
            <span>25m²</span>
          </p>
          <p>
            <span>2q</span>
          </p>
          <p>
            <span>2b</span>
          </p>
          <p>
            <span>2v</span>
          </p>
        </div>
      </div>
    </Link>
  </article>
)

export default Card
