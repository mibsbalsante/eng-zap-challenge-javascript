import { formatValue } from 'react-currency-input-field'

const formatCurrency = value =>
  formatValue({
    value: value,
    groupSeparator: '.',
    decimalSeparator: ',',
    prefix: 'R$ ',
  })

export default formatCurrency
