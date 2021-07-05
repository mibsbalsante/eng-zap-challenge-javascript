import React from 'react'

import InputRange from '@comp/input-range'
import Selection from '@comp/selection'

import styles from './styles.css'

const Filters = () => (
  <form action='#' className={styles.filters}>
    <div>
      <div>
        <label htmlFor='purpose'>Finalidade</label>
        <Selection options={[]} needsSelection={true} />
      </div>
      <div>
        <label htmlFor='bedrooms'>Quartos</label>
        <Selection options={[]} />
      </div>
      <div>
        <label htmlFor='price'>Preço</label>
        <InputRange format='decimal' />
      </div>
    </div>
    <div>
      <label htmlFor='parking'>Vagas de garagem</label>
      <Selection options={[]} />
    </div>
    <div>
      <label htmlFor='bathroom'>Banheiros</label>
      <Selection options={[]} />
    </div>
    <div>
      <label htmlFor='price'>Área(M²)</label>
      <InputRange format='int' />
    </div>
  </form>
)

export default Filters
