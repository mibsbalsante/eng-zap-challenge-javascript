import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

const Home = ({ location }) => (
  <div className={styles.home}>
    <p>Homepage: {location.pathname}</p>
  </div>
)

Home.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
}

export default Home
