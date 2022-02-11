import { all, call } from 'redux-saga/effects'

import { shopSagas } from './shop/sagas'
import { userSagas } from './user/sagas'
import { cartSagas } from './cart/sagas'
import { checkoutSagas } from './checkout/sagas'

export default function* rootSaga() {
  yield all([call(shopSagas), call(userSagas), call(cartSagas), call(checkoutSagas)])
}
