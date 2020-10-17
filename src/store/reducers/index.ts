import { combineReducers } from 'redux'
import { reducer as providerReducer, providerSliceName } from './provider'
import { reducer as signerReducer, signerSliceName } from './signer'
import { reducer as snackbarsReducer, snackbarsSliceName } from './snackbars'
import { reducer as solanaWalletReducer, solanaWalletSliceName } from './solanaWallet'
import { reducer as solanaConnectionReducer, solanaConnectionSliceName } from './solanaConnection'

const combinedReducers = combineReducers({
  [providerSliceName]: providerReducer,
  [signerSliceName]: signerReducer,
  [snackbarsSliceName]: snackbarsReducer,
  [solanaConnectionSliceName]: solanaConnectionReducer,
  [solanaWalletSliceName]: solanaWalletReducer
})
export default combinedReducers
