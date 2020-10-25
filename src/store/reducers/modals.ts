import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PayloadType } from './types'

export interface ICreateAccountTransaction {
  tokenAddress: string
  accountAddress: string
  sending: boolean
  error: string
  open: boolean
}
export interface IModals {
  createAccount: ICreateAccountTransaction
  aaa: ICreateAccountTransaction
}

export const defaultState: IModals = {
  createAccount: { open: false, sending: false, accountAddress: '', error: '', tokenAddress: '' },
  aaa: { open: false, sending: false, accountAddress: '', error: '', tokenAddress: '' }
}
export const modalsSliceName = 'modals'
const modalsSlice = createSlice({
  name: modalsSliceName,
  initialState: defaultState,
  reducers: {
    openModal(state, action: PayloadAction<keyof IModals>) {
      state[action.payload].open = true
      return state
    },
    closeModal(state, action: PayloadAction<keyof IModals>) {
      state[action.payload].open = false
      return state
    },
    resetModal(state, action: PayloadAction<keyof IModals>) {
      state[action.payload] = defaultState[action.payload]
      return state
    },
    createAccount(state, action: PayloadAction<{ tokenAddress: string }>) {
      state.createAccount.sending = true
      state.createAccount.tokenAddress = action.payload.tokenAddress
      return state
    },
    accountCreated(state, action: PayloadAction<{ accountAddress: string }>) {
      state.createAccount.sending = false
      state.createAccount.accountAddress = action.payload.accountAddress
      return state
    },
    accountCreatedError(state, action: PayloadAction<{ error: string }>) {
      state.createAccount.sending = false
      state.createAccount.error = action.payload.error
      return state
    }

    // addTransaction(state, action: PayloadAction<IaddTransaction>) {
    //   state.transactions[action.payload.id] = {
    //     recipient: action.payload.recipient,
    //     amount: action.payload.amount,
    //     txid: '',
    //     sending: true,
    //     token: action.payload.token
    //   }
    //   return state
    // },
    // setTransactionTxid(state, action: PayloadAction<{ txid: string; id: string }>) {
    //   state.transactions[action.payload.id].txid = action.payload.txid
    //   state.transactions[action.payload.id].sending = false
    //   return state
    // },
    // setTransactionError(state, action: PayloadAction<{ error: string; id: string }>) {
    //   state.transactions[action.payload.id].error = action.payload.error
    //   state.transactions[action.payload.id].sending = false
    //   return state
    // }
  }
})
export const actions = modalsSlice.actions
export const reducer = modalsSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
