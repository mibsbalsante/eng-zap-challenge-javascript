import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import GoogleMapReact from 'google-map-react'

import { useContext } from '@context/apartments'
import Container from '@comp/container'
import IconInfos from '@comp/icon-infos'
import Slider from '@comp/slider'
import formatCurrency from '@util/format-currency'
import getAddressFromCoords from '@util/get-address-from-coords'

import styles from './styles.css'

const business = {
  RENTAL: 'para Alugar',
  SALE: 'à Venda',
}

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

      <Container>
        <h2 className={styles.heading}>
          Apartamento {business[pricingInfos.businessType]} com {bedrooms} quartos, {usableAreas}m²
        </h2>

        <p className={styles.address}>
          {geoLocation.precision === 'NO_GEOCODE' || !city ? (
            <>São Paulo</>
          ) : (
            <>
              {neighborhood}, {city}
            </>
          )}
        </p>

        <div className={styles.details}>
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

          <div className={styles.taxes}>
            {pricingInfos.monthlyCondoFee > 0 && (
              <>
                <p className={styles.tax}>
                  Condomínio{' '}
                  <span className={styles.taxValue}>
                    {formatCurrency(pricingInfos.monthlyCondoFee)}
                  </span>
                </p>
              </>
            )}

            {pricingInfos.monthlyCondoFee > 0 && pricingInfos.yearlyIptu > 0 && (
              <i className={classNames('fas fa-circle', styles.taxesDot)}></i>
            )}

            {pricingInfos.yearlyIptu > 0 && (
              <p className={styles.tax}>
                IPTU{' '}
                <span className={styles.taxValue}>{formatCurrency(pricingInfos.yearlyIptu)}</span>
              </p>
            )}
          </div>

          <IconInfos
            big
            bathrooms={bathrooms}
            bedrooms={bedrooms}
            parkingSpaces={parkingSpaces}
            usableAreas={usableAreas}
            className={styles.infos}
          />

          <a
            target='_blank'
            rel='noopener noreferrer'
            href={`https://api.whatsapp.com/send?phone=55`}
            className={styles.phone}
          >
            Contatar o anunciante
          </a>
        </div>
      </Container>

      {geoLocation && (
        <section>
          {street && (
            <Container>
              <h3 className={styles.headingH3}>Localização</h3>

              <p className={styles.street}>{street}</p>
            </Container>
          )}

          <div className={styles.map}>
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
