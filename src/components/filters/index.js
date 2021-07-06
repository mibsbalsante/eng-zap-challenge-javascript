import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import InputRange from '@comp/input-range'
import Selection from '@comp/selection'

import styles from './styles.css'

const Filters = ({ className }) => (
  <form action='#' className={classNames(styles.filters, className)}>
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

Filters.propTypes = {
  className: PropTypes.string.isRequired,
}

export default Filters
