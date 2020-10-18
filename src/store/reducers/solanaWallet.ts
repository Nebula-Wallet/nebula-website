import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Status } from './provider'
import { PayloadType } from './types'

export interface ITokenAccount {
  programId: string
  balance: number
  address: string
  decimals: number
}
export interface ISolanaWallet {
  status: Status
  address: string
  balance: number
  accounts: { [key in string]: ITokenAccount[] }
}

export const defaultState: ISolanaWallet = {
  status: Status.Uninitialized,
  address: '',
  balance: 0,
  accounts: {}
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
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload
      return state
    },
    setBalance(state, action: PayloadAction<number>) {
      state.balance = action.payload
      return state
    },
    addTokenAccount(state, action: PayloadAction<ITokenAccount>) {
      if (!state.accounts[action.payload.programId]) {
        state.accounts[action.payload.programId] = []
      }
      state.accounts[action.payload.programId].push(action.payload)
      return state
    },
    setTokenBalance(state, action: PayloadAction<IsetTokenBalance>) {
      const index = state.accounts[action.payload.programId].findIndex(
        account => account.address === action.payload.address
      )
      state.accounts[action.payload.programId][index].balance = action.payload.balance
      return state
    }
  }
})
interface IsetTokenBalance {
  address: string
  programId: string
  balance: number
}
export const actions = solanaWalletSlice.actions
export const reducer = solanaWalletSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
