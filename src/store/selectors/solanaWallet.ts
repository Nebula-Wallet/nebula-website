import { ISolanaWallet, solanaWalletSliceName } from '../reducers/solanaWallet'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[solanaWalletSliceName] as ISolanaWallet

export const { address, balance, accounts, status } = keySelectors(store, [
  'address',
  'balance',
  'accounts',
  'status'
])

export const solanaWalletSelectors = { address, balance, accounts, status }

export default solanaWalletSelectors
