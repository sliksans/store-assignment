export const currencySymbol = (currency) => {
  switch (currency) {
    case 'USD': case 'AUD': default:
      return '$'
    case 'GBP':
      return '£'
    case 'JPY':
      return '¥'
    case 'RUB':
      return '₽'
  }
}