import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.css'

const Info = ({ icon, text }) => (
  <div>
    <i className={classNames('fas fa-lg', icon, styles.icon)}></i>
    <p className={styles.text}>{text}</p>
  </div>
)

Info.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

const IconInfos = ({ className, bedrooms, bathrooms, parkingSpaces, usableAreas }) => (
  <div className={classNames(styles.infos, className)}>
    <Info icon='fa-home' text={`${usableAreas}m²`} />
    <Info icon='fa-bed' text={`${bedrooms} quarto${bedrooms !== 1 ? 's' : ''}`} />
    <Info icon='fa-bath' text={`${bathrooms} banheiro${bathrooms !== 1 ? 's' : ''}`} />
    <Info icon='fa-car' text={`${parkingSpaces} vaga${parkingSpaces !== 1 ? 's' : ''}`} />
  </div>
)

IconInfos.propTypes = {
  className: PropTypes.string,
  bathrooms: PropTypes.number.isRequired,
  bedrooms: PropTypes.number.isRequired,
  parkingSpaces: PropTypes.number.isRequired,
  usableAreas: PropTypes.number.isRequired,
}

IconInfos.defaultProps = {
  className: undefined,
}

export default IconInfos
