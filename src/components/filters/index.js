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
    {({ state: { bedrooms, bathrooms, parkingSpaces, purpose } }) => (
      <aside className={classNames(styles.filters, className)}>
        <div className={styles.mainFilters}>
          <div>
            <Label>Finalidade</Label>
            <Selection
              current={purpose}
              field='purpose'
              options={[
                { value: 'SALE', label: 'Venda' },
                { value: 'RENTAL', label: 'Aluguel' },
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
            <InputRange field='priceRange' param='price' format='money' />
          </div>
        </div>
        <div className={styles.moreFilters}>
          <div>
            <Label>Vagas de garagem</Label>
            <Selection
              current={parkingSpaces}
              field='parkingSpaces'
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
            <InputRange field='squareMetersRange' param='areas' />
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
