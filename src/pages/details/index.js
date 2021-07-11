import React from 'react'
import PropTypes from 'prop-types'

import { useContext } from '@context/apartments'
import IconInfos from '@comp/icon-infos'
import Slider from '@comp/slider'
import formatCurrency from '@util/format-currency'

import styles from './styles.css'

const Details = ({ match }) => {
  const pageID = match.params.id

  const { state } = useContext()

  const item = state.apartments.find(({ id }) => id === pageID) || null
  const { address, images, bathrooms, bedrooms, parkingSpaces, usableAreas, pricingInfos } =
    item || {}
  const { geoLocation, city, neighborhood } = address || {}

  return item ? (
    <div className={styles.pageDetails}>
      <Slider images={images} height={600} />

      <p className={styles.address}>
        {geoLocation.precision === 'NO_GEOCODE' || !city ? (
          <>Pergunte o endereço</>
        ) : (
          <>
            {neighborhood}, {city}
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

      <div>
        {pricingInfos.monthlyCondoFee > 0 && (
          <>
            <p className={styles.condo}>
              Condomínio{' '}
              <span className={styles.condoFee}>
                {formatCurrency(pricingInfos.monthlyCondoFee)}
              </span>
            </p>

            <i className='fas fa-circle'></i>
          </>
        )}

        {pricingInfos.yearlyIptu > 0 && (
          <p className={styles.condo}>
            IPTU <span className={styles.condoFee}>{formatCurrency(pricingInfos.yearlyIptu)}</span>
          </p>
        )}
      </div>

      {geoLocation && (
        <div>
          map coords: lat ({geoLocation.location.lat}) lon ({geoLocation.location.lon})
        </div>
      )}

      <IconInfos
        bathrooms={bathrooms}
        bedrooms={bedrooms}
        parkingSpaces={parkingSpaces}
        usableAreas={usableAreas}
      />
    </div>
  ) : (
    <></>
  )
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
}

export default Details
