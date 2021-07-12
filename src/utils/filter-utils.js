const isInRange = (_, { min, max }) => {
  const value = Number(_)

  const isBelow = !min || value >= min
  const isAbove = !max || value <= max

  return isBelow && isAbove
}

export const applyFilters = ({
  apartments,
  apartmentsVivaReal,
  apartmentsZap,
  company,
  purpose,
  priceRange,
  squareMetersRange,
  ...filters
}) => {
  let data = apartments

  if (company === 'vivareal') data = apartmentsVivaReal
  if (company === 'zap') data = apartmentsZap

  const filterResults = data.filter(apartment => {
    const isSameBusinessType = apartment.pricingInfos.businessType === purpose

    if (!isSameBusinessType && purpose) return false

    const isBelowFilters = ['bedrooms', 'bathrooms', 'parkingSpaces'].find(
      filter => apartment[filter] < (filters[filter] || 0)
    )

    const isCurrencyBetweenFilters =
      isInRange(apartment.pricingInfos.price, priceRange) ||
      isInRange(apartment.pricingInfos.rentalTotalPrice, priceRange)

    const isBetweenFilters =
      isInRange(apartment.usableAreas, squareMetersRange) && isCurrencyBetweenFilters

    return !isBelowFilters && isBetweenFilters
  })

  return filterResults
}

export const applyPage = (filterResults, page, state) => {
  const firstInd = state.pageResults * page - state.pageResults
  return filterResults.slice(firstInd, firstInd + state.pageResults)
}
