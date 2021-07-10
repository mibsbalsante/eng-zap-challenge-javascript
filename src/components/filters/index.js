import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { ApartmentsConsumer } from '@context/apartments'
import InputRange from '@comp/input-range'
import Label from '@comp/label'
import Selection from '@comp/selection'

import styles from './styles.css'

const Filters = ({ className }) => (
  <ApartmentsConsumer>
    {({ state: { bedrooms, bathrooms, parking, purpose } }) => (
      <aside className={classNames(styles.filters, className)}>
        <div className={styles.mainFilters}>
          <div>
            <Label>Finalidade</Label>
            <Selection
              current={purpose}
              field='purpose'
              options={[
                { value: 'buy', label: 'Comprar' },
                { value: 'rent', label: 'Alugar' },
              ]}
            />
          </div>
          <div>
            <Label>Quartos</Label>
            <Selection
              current={bedrooms}
              field='bedrooms'
              options={[1, 2, 3, 4]}
              textComplement='+'
            />
          </div>
          <div>
            <Label htmlFor='priceRange'>Preço</Label>
            <InputRange field='priceRange' format='money' />
          </div>
        </div>
        <div className={styles.moreFilters}>
          <div>
            <Label>Vagas de garagem</Label>
            <Selection
              current={parking}
              field='parking'
              options={[1, 2, 3, 4]}
              textComplement='+'
            />
          </div>
          <div>
            <Label>Banheiros</Label>
            <Selection
              current={bathrooms}
              field='bathrooms'
              options={[1, 2, 3, 4]}
              textComplement='+'
            />
          </div>
          <div>
            <Label htmlFor='squareMetersRange'>Área(M²)</Label>
            <InputRange field='squareMetersRange' />
          </div>
        </div>
      </aside>
    )}
  </ApartmentsConsumer>
)

Filters.propTypes = {
  className: PropTypes.string.isRequired,
}

export default Filters
