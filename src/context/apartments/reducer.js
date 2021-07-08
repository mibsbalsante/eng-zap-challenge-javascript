export const initialState = {
  company: '',
  // filters
  purpose: 'all',
  bedrooms: 1,
  parking: 1,
  bathrooms: 1,
  priceRange: [],
  squareMetersRange: [],
  // pagination
  page: 1,
  pageResults: 20,
  // .json results
  apartments: [],
  // current filter results
  results: [],
}

export const reducer = (state, action) => {
  // show first page only
  // todo: filters/company
  switch (action.type) {
    case 'SET_APARTMENTS': {
      const apartments = action.payload

      return {
        ...state,
        apartments: apartments,
        results: (apartments || []).slice(0, state.pageResults),
      }
    }
  }
}
