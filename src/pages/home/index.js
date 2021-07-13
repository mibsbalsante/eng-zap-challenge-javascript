import React from 'react'
import PropTypes from 'prop-types'

import { useContext } from '@context/apartments'
import Container from '@comp/container'
import Feed from '@comp/feed'
import Filters from '@comp/filters'
import Loading from '@comp/loading'
import NotFound from '@comp/not-found'
import Pagination from '@comp/pagination'
import withFilters from '@hoc/filters'

import styles from './styles.css'

const Home = () => {
  const { state } = useContext()

  return (
    <Container>
      <div className={styles.pageHome}>
        <Filters className={styles.pageHomeFilters} />
        {state.company && (
          <p className={styles.pageHomeCompany}>
            Mostrando apenas imóveis de{' '}
            <span className={state.company}>{state.companies[state.company]}</span>
          </p>
        )}
        {state.isLoading}
        {state.isLoading ? (
          <Loading />
        ) : state.results.length > 0 ? (
          <>
            <Pagination className={styles.pageHomePaginationTop} />
            <Feed className={styles.pageHomeFeed} />
            <Pagination className={styles.pageHomePagination} />
          </>
        ) : (
          <NotFound />
        )}
      </div>
    </Container>
  )
}

Home.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
}

export default withFilters(Home)
