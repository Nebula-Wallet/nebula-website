import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { reducer as providerReducer, providerSliceName } from './provider'
import { reducer as signerReducer, signerSliceName } from './signer'
import { reducer as snackbarsReducer, snackbarsSliceName } from './snackbars'
import { reducer as solanaWalletReducer, solanaWalletSliceName } from './solanaWallet'
import { reducer as solanaConnectionReducer, solanaConnectionSliceName } from './solanaConnection'
import { reducer as uiReducer, uiSliceName } from './ui'
import { reducer as modalsReducer, modalsSliceName } from './modals'

const authPersistConfig = {
  key: solanaWalletSliceName,
  storage: storage,
  whitelist: ['address', 'governedTokens']
}

const combinedReducers = combineReducers({
  [providerSliceName]: providerReducer,
  [signerSliceName]: signerReducer,
  [snackbarsSliceName]: snackbarsReducer,
  [uiSliceName]: uiReducer,
  [modalsSliceName]: modalsReducer,
  [solanaConnectionSliceName]: solanaConnectionReducer,
  [solanaWalletSliceName]: persistReducer(authPersistConfig, solanaWalletReducer)
})
export default combinedReducers
