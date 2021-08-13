import * as actionTypes from './shopping-types'

export const addToCart = (item) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: {
      product: item
    }
  }
}

export const removeFromCart = (itemID) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: {
      id: itemID
    }
  }
}

export const adjustQuantity = (itemID, value) => {
  return {
    type: actionTypes.ADJUST_QUANTITY,
    payload: {
      id: itemID,
      qty: value
    }
  }
}

export const setCurrentItem = (item) => {
  return {
    type: actionTypes.SET_CURRENT_ITEM,
    payload: {
      item: item
    }
  }
}

export const setCurrency = (currency) => {
  return {
    type: actionTypes.SET_CURRENCY,
    payload: {
      currency: currency
    }
  }
}

export const openCloseOverlay = (value) => {
  return {
    type: actionTypes.OPEN_CLOSE_OVERLAY,
    payload: {
      bool: value
    }
  }
}
