import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import styles from './styles.css'

const Card = ({
  id,
  address,
  images,
  bathrooms,
  bedrooms,
  parkingSpaces,
  usableAreas,
  pricingInfos,
}) => (
  <article className={styles.card}>
    <Link to={`/imovel/${id}`}>
      <img src={images[0]} alt='' />
      <div>
        {address.geoLocation.precision !== 'NO_GEOCODE' ? (
          <p>
            {address.neighborhood}, {address.city}
          </p>
        ) : (
          <p>Pergunte o endereço</p>
        )}
        <p>
          {pricingInfos.businessType === 'SALE' ? (
            <span>Preço: R$ {pricingInfos.price}</span>
          ) : (
            <span>Aluguel: R$ {pricingInfos.rentalTotalPrice}</span>
          )}
        </p>
        <div>
          <p>
            <span>{usableAreas}m²</span>
          </p>
          <p>
            <span>{bedrooms}q</span>
          </p>
          <p>
            <span>{bathrooms}b</span>
          </p>
          <p>
            <span>{parkingSpaces}v</span>
          </p>
        </div>
      </div>
    </Link>
  </article>
)

Card.propTypes = {
  id: PropTypes.string.isRequired,
  address: PropTypes.shape({
    geoLocation: PropTypes.shape({
      precision: PropTypes.string,
    }),
    neighborhood: PropTypes.string,
    city: PropTypes.string,
  }).isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  bathrooms: PropTypes.number.isRequired,
  bedrooms: PropTypes.number.isRequired,
  parkingSpaces: PropTypes.number.isRequired,
  usableAreas: PropTypes.number.isRequired,
  pricingInfos: PropTypes.shape({
    businessType: PropTypes.string,
    price: PropTypes.string,
    rentalTotalPrice: PropTypes.string,
  }).isRequired,
}

export default Card
