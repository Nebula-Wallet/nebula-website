import { all, spawn } from 'redux-saga/effects'
import { providerSaga } from './loadProvider'
import { signerSaga } from './loadSigner'

export function* rootSaga(): Generator {
  yield all([providerSaga, signerSaga].map(spawn))
}
export default rootSaga
