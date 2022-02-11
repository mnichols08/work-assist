import { all, call, takeLatest, put } from 'redux-saga/effects'

import CheckoutActionTypes from './types'

import { clearCart } from '../cart/actions'

export function* clearCartOnCheckout() {
  yield put(clearCart())
}

export function* onCheckoutSuccess() {
  yield takeLatest(CheckoutActionTypes.CHECKOUT_SUCCESS, clearCartOnCheckout)
}

export function* checkoutSagas() {
  yield all([call(onCheckoutSuccess)])
}