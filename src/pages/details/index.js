import React, { useState } from 'react'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'

import { useContext } from '@context/apartments'
import IconInfos from '@comp/icon-infos'
import Slider from '@comp/slider'
import formatCurrency from '@util/format-currency'
import getAddressFromCoords from '@util/get-address-from-coords'

import styles from './styles.css'

const Details = ({ match }) => {
  const pageID = match.params.id

  const { state } = useContext()

  const item = state.apartments.find(({ id }) => id === pageID) || null
  const { address, images, bathrooms, bedrooms, parkingSpaces, usableAreas, pricingInfos } =
    item || {}
  const { geoLocation, city, neighborhood } = address || {}

  const [street, setStreet] = useState(null)

  return item ? (
    <div className={styles.pageDetails}>
      <Slider images={images} height={600} type='full' />

      <p className={styles.address}>
        {geoLocation.precision === 'NO_GEOCODE' || !city ? (
          <>São Paulo</>
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

      <IconInfos
        bathrooms={bathrooms}
        bedrooms={bedrooms}
        parkingSpaces={parkingSpaces}
        usableAreas={usableAreas}
      />

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
        <section>
          {street && <p>{street}</p>}

          <div style={{ height: '480px', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: process.env.MAPS_API_KEY,
                language: 'pt-BR',
                region: 'br',
                libraries: ['geocoder'],
              }}
              defaultCenter={{ lat: geoLocation.location.lat, lng: geoLocation.location.lon }}
              defaultZoom={12}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ maps }) => {
                getAddressFromCoords({
                  Geocoder: new maps.Geocoder(),
                  location: { lat: geoLocation.location.lat, lng: geoLocation.location.lon },
                  callback: setStreet,
                })
              }}
            >
              <div
                lat={geoLocation.location.lat}
                lng={geoLocation.location.lon}
                className={styles.marker}
              ></div>
            </GoogleMapReact>
          </div>
        </section>
      )}
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
