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
  // homepage first load (get query params from url)
  firstLoad: true,
  companies: {
    zap: 'Zap Imóveis',
    vivareal: 'Viva Real',
  },
}

export const reducer = (state, action) => {
  // show first page only
  // todo: filters/company
  switch (action.type) {
    case 'FIRST_LOAD': {
      return {
        ...state,
        firstLoad: false,
      }
    }
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
        if (key in action.payload) {
          let value = action.payload[key]

          // '' values are falsy and parse to 0, don't parse falsy values
          if (value && !Number.isNaN(Number(value))) value = Number(value)

          all = { ...all, ...{ [key]: value || '' } }
        }

        return all
      }, {})

      const oldFilters = state.knownFilters.reduce((all, key) => {
        if (state[key]) all = { ...all, ...{ [key]: state[key] } }

        return all
      }, {})

      const needsPageReset =
        Object.entries(filters).toString() !== Object.entries(oldFilters).toString()

      const page = needsPageReset && !state.firstLoad ? { page: 1 } : {}

      const newState = {
        ...state,
        ...filters,
        ...page,
        firstLoad: false,
      }

      const filterResults = applyFilters(newState)

      return {
        ...newState,
        filterResults,
        results: applyPage(filterResults, state),
      }
    }
    case 'SET_RANGE_FIELD': {
      // TODO: duplicate logic, refactor it
      const needsPageReset =
        Object.entries(state[action.payload.field]).toString() !==
        Object.entries(action.payload.value).toString()

      const page = needsPageReset && !state.firstLoad ? { page: 1 } : {}

      const newState = {
        ...state,
        [action.payload.field]: action.payload.value,
        ...page,
      }

      const filterResults = applyFilters(newState)

      return {
        ...newState,
        filterResults,
        results: applyPage(filterResults, state),
      }
    }
    case 'SET_COMPANY': {
      console.log('setcompany', action.payload)

      const newState = {
        ...state,
        company: action.payload,
        page: 1,
      }

      const filterResults = applyFilters(newState)

      return {
        ...newState,
        filterResults,
        results: applyPage(filterResults, state),
      }
    }
    case 'SET_PAGE': {
      return {
        ...state,
        page: action.payload,
        results: applyPage(state.filterResults, state),
      }
    }
  }
}
