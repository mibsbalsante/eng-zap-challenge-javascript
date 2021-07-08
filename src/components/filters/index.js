import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import InputRange from '@comp/input-range'
import Selection from '@comp/selection'

import styles from './styles.css'

const Filters = ({ className }) => (
  <aside className={classNames(styles.filters, className)}>
    <div className={styles.mainFilters}>
      <div>
        <label>Finalidade</label>
        <Selection
          field='purpose'
          options={[
            { value: 'all', label: 'Todos' },
            { value: 'buy', label: 'Comprar' },
            { value: 'rent', label: 'Alugar' },
          ]}
        />
      </div>
      <div>
        <label>Quartos</label>
        <Selection field='bedrooms' options={[1, 2, 3, 4]} textComplement='+' />
      </div>
      <div>
        <label htmlFor='price'>Preço</label>
        <InputRange format='decimal' />
      </div>
    </div>
    <div className={styles.moreFilters}>
      <div>
        <label>Vagas de garagem</label>
        <Selection field='parking' options={[1, 2, 3, 4]} textComplement='+' />
      </div>
      <div>
        <label>Banheiros</label>
        <Selection field='bathrooms' options={[1, 2, 3, 4]} textComplement='+' />
      </div>
      <div>
        <label htmlFor='price'>Área(M²)</label>
        <InputRange format='int' />
      </div>
    </div>
  </aside>
)

Filters.propTypes = {
  className: PropTypes.string.isRequired,
}

export default Filters
