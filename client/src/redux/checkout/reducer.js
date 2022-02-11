import CheckoutActionTypes from './types'

const INITIAL_STATE = {
  validatedCheckout: null
}

const checkoutReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CheckoutActionTypes.CHECKOUT_SUCCESS:
      return {
        ...state,
        validatedCheckout: true
      }
    default:
      return state
  }
}

export default checkoutReducer