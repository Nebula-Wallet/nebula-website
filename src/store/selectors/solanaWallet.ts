import { createSelector } from '@reduxjs/toolkit'
import * as R from 'remeda'
import { ISolanaWallet, solanaWalletSliceName } from '../reducers/solanaWallet'
import { keySelectors, AnyProps } from './helpers'
import { network } from './solanaConnection'

const store = (s: AnyProps) => s[solanaWalletSliceName] as ISolanaWallet

export const {
  address,
  balance,
  accounts,
  status,
  transactions,
  governedTokens
} = keySelectors(store, [
  'address',
  'balance',
  'accounts',
  'status',
  'transactions',
  'governedTokens'
])

export const tokensAggregated = createSelector(accounts, tokensAccounts => {
  return R.mapValues(tokensAccounts, tokenAccounts => {
    return {
      balance: tokenAccounts.reduce((acc, account) => acc + account.balance, 0),
      accounts: tokenAccounts
    }
  })
})

export const currentGovernedTokens = createSelector(
  governedTokens,
  network,
  (tokens, currNetwork) => {
    return tokens[currNetwork]
  }
)
export const accountsArray = createSelector(accounts, tokensAccounts => {
  return Object.values(tokensAccounts).reduce((acc, accounts) => {
    return acc.concat(accounts)
  }, [])
})
export const solanaWalletSelectors = {
  address,
  balance,
  accounts,
  status,
  tokensAggregated,
  transactions,
  governedTokens
}
export default solanaWalletSelectors
