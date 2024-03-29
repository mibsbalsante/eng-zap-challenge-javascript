import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import { useContext } from '@context/apartments'
import helperStyles from '@config/helper-classes.css'

import styles from './styles.css'

const PaginationLink = ({ page, currentPage, visible, to, children, className }) => {
  const { dispatch } = useContext()

  const setPage = newPage => {
    dispatch({ type: 'SET_PAGE', payload: newPage })
  }

  return visible ? (
    <Link
      className={classNames(helperStyles.formControl, styles.link, className, {
        [styles.current]: currentPage === page,
      })}
      onClick={() => setPage(page)}
      to={to}
    >
      {children}
    </Link>
  ) : (
    <></>
  )
}

PaginationLink.propTypes = {
  page: PropTypes.number.isRequired,
  currentPage: PropTypes.number,
  visible: PropTypes.bool,
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

PaginationLink.defaultProps = {
  currentPage: null,
  visible: false,
  className: undefined,
}

export default PaginationLink
