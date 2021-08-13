import * as actionTypes from './shopping-types'

const INITIAL_STATE = {
  cart: [],
  currentItem: {
    attributes: []
  },
  currency: 'USD',
  overlayIsOpen: false
}

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:

      const inCart = state.cart.find(item =>
        item.id === action.payload.product.id &&
          areEqual(item.attributes, action.payload.product.attributes) ?
          true : false
      )

      return {
        ...state,
        cart: inCart ?
          state.cart.map(item => item.id === action.payload.product.id && areEqual(item.attributes, action.payload.product.attributes) ?
            { ...item, qty: item.qty + 1 } : item) :
            [...state.cart, { ...action.payload.product, qty: 1, cartId: state.cart.length }]
      }
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.cartId !== action.payload.id)
      }
    case actionTypes.ADJUST_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(item => item.cartId === action.payload.id ?
          { ...item, qty: action.payload.qty > 0 ? action.payload.qty : item.qty } :
          item
        )
      }
    case actionTypes.SET_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload.item
      }

    case actionTypes.SET_CURRENCY:
      return {
        ...state,
        currency: action.payload.currency
      }
    case actionTypes.OPEN_CLOSE_OVERLAY:
      return {
        ...state,
        overlayIsOpen: action.payload.bool
      }
    default:
      return state
  }
}

const areEqual = (attribute1, attribute2) => {
  return JSON.stringify(attribute1) === JSON.stringify(attribute2)
}

export default shopReducer
