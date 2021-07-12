import rules from '@config/companies-rules.json'

const calcBoundingBox = location =>
  location.lat >= rules.all.boundingBox.minlat &&
  location.lat <= rules.all.boundingBox.maxlat &&
  location.lon >= rules.all.boundingBox.minlon &&
  location.lon <= rules.all.boundingBox.maxlon

const filterByCompany = values => {
  const vivaReal = []
  const zap = []

  values.forEach(apartment => {
    const { address, pricingInfos, usableAreas } = apartment
    const {
      geoLocation: { location },
    } = address
    const { price, rentalTotalPrice, businessType, monthlyCondoFee: condoFee } = pricingInfos
    const salePrice = Number(price)
    const rentalPrice = Number(rentalTotalPrice)
    const monthlyCondoFee = Number(condoFee)

    const isInsideBoundingBox = calcBoundingBox(location)

    if (businessType === 'SALE') {
      if (salePrice <= rules.vivaReal.price.max) {
        vivaReal.push(apartment)
      }

      // zap sale logic
      if (usableAreas > 0) {
        const validPricePerMeter = salePrice / usableAreas >= rules.zap.usableAreasSalePriceMinMeter
        let minSalePrice = rules.zap.price.min

        if (isInsideBoundingBox) {
          minSalePrice = minSalePrice * rules.zap.boundingBoxSalePriceMin
        }

        if (validPricePerMeter && salePrice >= minSalePrice) {
          zap.push(apartment)
        }
      }
    } else {
      if (rentalPrice >= rules.zap.rental.min) {
        zap.push(apartment)
      }

      // vivareal rental logic
      if (monthlyCondoFee && monthlyCondoFee > 0) {
        const validCondoFee =
          monthlyCondoFee < rentalPrice * rules.vivaReal.condoFeeRentalPricePercentageMax
        let maxRentalPrice = rules.vivaReal.rental.max

        if (isInsideBoundingBox) {
          maxRentalPrice = maxRentalPrice * rules.vivaReal.boundingBoxRentalPriceMax
        }

        if (validCondoFee && rentalPrice <= maxRentalPrice) {
          vivaReal.push(apartment)
        }
      }
    }
  })

  return { vivaReal, zap }
}

export default filterByCompany
