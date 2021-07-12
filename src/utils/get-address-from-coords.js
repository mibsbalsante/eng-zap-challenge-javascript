const getAddressFromCoords = ({ Geocoder, location, callback }) => {
  Geocoder.geocode({ location })
    .then(response => {
      if (response.results[0]) {
        callback(response.results[0].formatted_address)
      }
    })
    .catch(e => console.error('Geocoder failed due to: ' + e))
}

export default getAddressFromCoords
