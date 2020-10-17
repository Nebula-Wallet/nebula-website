import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PayloadType } from './types'

export interface ISolanaWallet {
  address: string
  balance: number
}

export const defaultState: ISolanaWallet = {
  address: '',
  balance: 0
}
export const solanaWalletSliceName = 'solanaWallet'
const solanaWalletSlice = createSlice({
  name: solanaWalletSliceName,
  initialState: defaultState,
  reducers: {
    initWallet(state) {
      return state
    },
    setAddress(state, action: PayloadAction<string>) {
      state.address = action.payload
      return state
    },
    setBalance(state, action: PayloadAction<number>) {
      state.balance = action.payload
      return state
    }
  }
})

export const actions = solanaWalletSlice.actions
export const reducer = solanaWalletSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
