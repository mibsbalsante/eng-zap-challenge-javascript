import filterByCompany from '@util/filter-by-company'
import { applyFilters, applyPage } from '@util/filter-utils'

export const initialState = {
  company: '',
  // filters
  bedrooms: '',
  bathrooms: '',
  parkingSpaces: '',
  purpose: '',
  priceRange: { min: 0, max: 0 },
  squareMetersRange: { min: 0, max: 0 },
  // pagination
  page: 1,
  pageResults: 20,
  // .json results
  apartments: [],
  apartmentsVivaReal: [],
  apartmentsZap: [],
  // current filter results
  filterResults: [],
  results: [],
  knownFilters: ['bedrooms', 'bathrooms', 'parkingSpaces', 'purpose', 'page'],
  // homepage list title
  companies: {
    zap: 'Zap Imóveis',
    vivareal: 'Viva Real',
  },
  isLoading: true,
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_APARTMENTS': {
      const apartments = action.payload
      // remove apartments with invalid geolocation
      const validApartments = apartments.filter(({ address }) => {
        const {
          geoLocation: { location },
        } = address

        return location.lon && location.lat
      })

      const listByCompany = filterByCompany(validApartments)

      return {
        ...state,
        apartments: validApartments,
        apartmentsVivaReal: listByCompany.vivaReal,
        apartmentsZap: listByCompany.zap,
        filterResults: validApartments || [],
        results: (validApartments || []).slice(0, state.pageResults),
      }
    }
    case 'SET_FILTERS': {
      // replace the filter even if the value doesnt exist ("all" selection)
      const filters = state.knownFilters.reduce((all, key) => {
        let value = action.payload[key] || ''

        // '' values are falsy and parse to 0, don't parse falsy values
        if (value && !Number.isNaN(Number(value))) value = Number(value)

        all = { ...all, ...{ [key]: value } }

        return all
      }, {})

      // objects to compare to see if page needs to go back to 1
      const filtersWithoutPage = state.knownFilters.reduce((all, key) => {
        if (key !== 'page') all = { ...all, ...{ [key]: filters[key] || '' } }

        return all
      }, {})

      const oldFilters = state.knownFilters.reduce((all, key) => {
        if (key !== 'page') all = { ...all, ...{ [key]: state[key] || '' } }

        return all
      }, {})

      const needsPageReset =
        Object.entries(filtersWithoutPage).toString() !== Object.entries(oldFilters).toString()

      // reset if lateral filters are different or page field is empty
      const page = needsPageReset || !filters.page ? { page: 1 } : {}

      const newState = {
        ...state,
        ...filters,
        ...page,
      }

      return {
        ...newState,
        results: applyPage(state.filterResults, newState.page, newState),
      }
    }
    case 'SET_RANGE_FIELD': {
      const needsPageReset =
        Object.entries(state[action.payload.field]).toString() !==
        Object.entries(action.payload.value).toString()

      const page = needsPageReset ? { page: 1 } : {}

      const newState = {
        ...state,
        [action.payload.field]: action.payload.value,
        ...page,
      }

      return {
        ...newState,
        results: applyPage(state.filterResults, newState.page, newState),
      }
    }
    case 'SET_COMPANY': {
      return {
        ...state,
        company: action.payload,
        page: 1,
        results: applyPage(state.filterResults, 1, state),
      }
    }
    case 'SET_FILTERED_RESULTS': {
      const filterResults = applyFilters(state)

      return {
        ...state,
        filterResults,
        results: applyPage(filterResults, state.page, state),
      }
    }
    case 'SET_PAGE': {
      return {
        ...state,
        page: action.payload,
        results: applyPage(state.filterResults, action.payload, state),
      }
    }
    case 'SET_LOADING': {
      return {
        ...state,
        isLoading: action.payload,
      }
    }
  }
}
