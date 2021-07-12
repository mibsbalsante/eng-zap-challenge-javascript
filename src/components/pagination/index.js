import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import classNames from 'classnames'

import { useContext } from '@context/apartments'

import PaginationLink from './link'
import styles from './styles.css'

const Pagination = ({ className }) => {
  const location = useLocation()
  const { state } = useContext()
  const { page, pageResults, filterResults } = state
  const totalPages = Math.ceil(filterResults.length / pageResults)
  const pages = [...new Array(totalPages)]

  const getPage = ind => {
    const params = new URLSearchParams(location.search)
    params.set('page', ind)

    return `?${params.toString()}`
  }

  return (
    <nav className={classNames(styles.pagination, className)}>
      <PaginationLink
        page={page - 1}
        className={styles.arrows}
        visible={page > 1}
        to={getPage(page - 1)}
      >
        <i className='fas fa-angle-left fa-lg' />
      </PaginationLink>
      {pages.map((_, ind) => {
        const linkPage = ind + 1
        return (
          <PaginationLink
            key={linkPage}
            page={linkPage}
            currentPage={page}
            to={getPage(linkPage)}
            visible={
              (page === 1 && ind <= 2) || // first 3 pages
              (totalPages - ind <= 3 && totalPages - page < 3) || // last 3 pages
              ind + 1 === page || // next page
              ind - 1 === page || // last page
              ind === page // current page
            }
          >
            {linkPage}
          </PaginationLink>
        )
      })}
      <PaginationLink
        page={page + 1}
        className={styles.arrows}
        visible={page < totalPages}
        to={getPage(page + 1)}
      >
        <i className='fas fa-angle-right fa-lg' />
      </PaginationLink>
    </nav>
  )
}

Pagination.propTypes = {
  className: PropTypes.string.isRequired,
}

export default Pagination
