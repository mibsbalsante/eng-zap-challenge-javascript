import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import classNames from 'classnames'

import { ApartmentsConsumer } from '@context/apartments'

import PaginationLink from './link'
import styles from './styles.css'

const Pagination = ({ className }) => {
  const location = useLocation()

  const getPage = ind => {
    const params = new URLSearchParams(location.search)
    params.set('page', ind)

    return `?${params.toString()}`
  }

  return (
    <ApartmentsConsumer>
      {({ state: { page } }) => (
        <nav className={classNames(styles.pagination, className)}>
          <PaginationLink
            page={page - 1}
            className={styles.arrows}
            disabled={page <= 1}
            to={getPage(page - 1)}
          >
            <i className='fas fa-angle-left fa-lg' />
          </PaginationLink>
          <PaginationLink page={1} currentPage={page} to={getPage(1)}>
            1
          </PaginationLink>
          <PaginationLink page={2} currentPage={page} to={getPage(2)}>
            2
          </PaginationLink>
          <PaginationLink page={3} currentPage={page} to={getPage(3)}>
            3
          </PaginationLink>
          <PaginationLink
            page={page + 1}
            className={styles.arrows}
            disabled={page >= 3}
            to={getPage(page + 1)}
          >
            <i className='fas fa-angle-right fa-lg' />
          </PaginationLink>
        </nav>
      )}
    </ApartmentsConsumer>
  )
}

Pagination.propTypes = {
  className: PropTypes.string.isRequired,
}

export default Pagination
