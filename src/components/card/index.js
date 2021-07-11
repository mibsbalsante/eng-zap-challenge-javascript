import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import IconInfos from '@comp/icon-infos'
import Slider from '@comp/slider'
import formatCurrency from '@util/format-currency'

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
    <Slider images={images} height={240} className={styles.slider} />

    <Link to={`/imovel/${id}`} className={styles.content}>
      <p className={styles.address}>
        {address.geoLocation.precision === 'NO_GEOCODE' || !address.city ? (
          <>Pergunte o endereço</>
        ) : (
          <>
            {address.neighborhood}, {address.city}
          </>
        )}
      </p>

      <p className={styles.price}>
        {pricingInfos.businessType === 'SALE' ? (
          <span>{formatCurrency(pricingInfos.price)}</span>
        ) : (
          <>
            <span>{formatCurrency(pricingInfos.rentalTotalPrice)}</span>
            <span className={styles.rent}>{'/mês'}</span>
          </>
        )}
      </p>

      {pricingInfos.monthlyCondoFee > 0 && (
        <p className={styles.condo}>
          Condomínio{' '}
          <span className={styles.condoFee}>{formatCurrency(pricingInfos.monthlyCondoFee)}</span>
        </p>
      )}

      <IconInfos
        bathrooms={bathrooms}
        bedrooms={bedrooms}
        parkingSpaces={parkingSpaces}
        usableAreas={usableAreas}
      />
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
    monthlyCondoFee: PropTypes.string,
    price: PropTypes.string,
    rentalTotalPrice: PropTypes.string,
  }).isRequired,
}

export default Card
