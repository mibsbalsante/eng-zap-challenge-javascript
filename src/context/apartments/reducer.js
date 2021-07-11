export const initialState = {
  company: '',
  // filters
  bedrooms: '',
  bathrooms: '',
  parking: '',
  purpose: '',
  priceRange: { min: 0, max: null },
  squareMetersRange: { min: 0, max: null },
  // pagination
  page: 1,
  pageResults: 20,
  // .json results
  apartments: [],
  // current filter results
  results: [],
  knownFilters: ['bedrooms', 'bathrooms', 'parking', 'purpose', 'page'],
  // homepage first load (get query params from url)
  firstLoad: true,
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

      return {
        ...state,
        apartments: apartments,
        results: (apartments || []).slice(0, state.pageResults),
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

      return {
        ...state,
        ...filters,
        firstLoad: false,
        ...page,
      }
    }
    case 'SET_RANGE_FIELD': {
      return {
        ...state,
        [action.payload.field]: action.payload.value,
        page: 1,
      }
    }
    case 'SET_PAGE': {
      return {
        ...state,
        page: action.payload,
      }
    }
  }
}
