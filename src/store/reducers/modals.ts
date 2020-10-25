import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PayloadType } from './types'

export interface ICreateAccountTransaction {
  tokenAddress: string
  accountAddress: string
  sending: boolean
  error: string
  open: boolean
}
export interface ICreateToken {
  tokenAddress: string
  freezeAuthority: string
  mintAuthority: string
  decimals: number
  sending: boolean
  error: string
  open: boolean
}
export interface IMintToken {
  tokenAddress: string
  recipient: string
  txid: string
  amount: number
  decimals: number
  sending: boolean
  error: string
  open: boolean
}
export interface IModals {
  createAccount: ICreateAccountTransaction
  createToken: ICreateToken
  mintToken: IMintToken
}

export const defaultState: IModals = {
  createAccount: { open: false, sending: false, accountAddress: '', error: '', tokenAddress: '' },
  createToken: {
    open: false,
    sending: false,
    decimals: 0,
    freezeAuthority: '',
    mintAuthority: '',
    error: '',
    tokenAddress: ''
  },
  mintToken: {
    open: false,
    sending: false,
    decimals: 0,
    amount: 0,
    recipient: '',
    txid: '',
    error: '',
    tokenAddress: ''
  }
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
      switch (action.payload) {
        case 'createAccount':
          state.createAccount = defaultState[action.payload]
          break
        case 'createToken':
          state.createToken = defaultState[action.payload]
          break
        case 'mintToken':
          state.mintToken = defaultState[action.payload]
          break
        default:
          break
      }
      return state
    },
    mintToken(state, action: PayloadAction<Pick<IMintToken, 'amount' | 'recipient'>>) {
      state.mintToken.sending = true
      state.mintToken.amount = action.payload.amount
      state.mintToken.recipient = action.payload.recipient
      return state
    },
    openMintToken(state, action: PayloadAction<Pick<IMintToken, 'tokenAddress' | 'decimals'>>) {
      state.mintToken.decimals = action.payload.decimals
      state.mintToken.tokenAddress = action.payload.tokenAddress
      state.mintToken.open = true
      return state
    },
    tokenMinted(state, action: PayloadAction<{ txid: string }>) {
      state.mintToken.sending = false
      state.mintToken.txid = action.payload.txid
      return state
    },
    tokenMintedError(state, action: PayloadAction<{ error: string }>) {
      state.mintToken.sending = false
      state.mintToken.error = action.payload.error
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
    },
    createToken(state, action: PayloadAction<{ freezeAuthority: string, decimals: number }>) {
      state.createToken.sending = true
      state.createToken.freezeAuthority = action.payload.freezeAuthority
      state.createToken.decimals = action.payload.decimals
      return state
    },
    tokenCreated(state, action: PayloadAction<{ tokenAddress: string }>) {
      state.createToken.sending = false
      state.createToken.tokenAddress = action.payload.tokenAddress
      return state
    },
    tokenCreatedError(state, action: PayloadAction<{ error: string }>) {
      state.createToken.sending = false
      state.createToken.error = action.payload.error
      return state
    }
  }
})
export const actions = modalsSlice.actions
export const reducer = modalsSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
