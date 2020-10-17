import { all, spawn } from 'redux-saga/effects'
import { providerSaga } from './loadProvider'
import { signerSaga } from './loadSigner'
import solanaRootSaga from './solana'

export function* rootSaga(): Generator {
  yield all([providerSaga, signerSaga, solanaRootSaga].map(spawn))
}
export default rootSaga
