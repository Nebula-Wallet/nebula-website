import { combineReducers } from 'redux'
import { reducer as providerReducer, providerSliceName } from './provider'
import { reducer as signerReducer, signerSliceName } from './signer'
import { reducer as snackbarsReducer, snackbarsSliceName } from './snackbars'

const combinedReducers = combineReducers({
  [providerSliceName]: providerReducer,
  [signerSliceName]: signerReducer,
  [snackbarsSliceName]: snackbarsReducer
})
export default combinedReducers
