import { IAddressRecord, INameService, nameServiceSliceName } from '@reducers/nameService'
import { createSelector } from '@reduxjs/toolkit'
import { keySelectors, AnyProps } from './helpers'
import { address } from './solanaWallet'

const store = (s: AnyProps) => s[nameServiceSliceName] as INameService

export const { accounts, tokens } = keySelectors(store, ['accounts', 'tokens'])

export const myName = createSelector(accounts, address, (registeredAccounts, myAddress) => {
  const myRecord = Object.values(registeredAccounts).find(record => record.pubKey === myAddress) as
    | IAddressRecord
    | undefined
  return myRecord?.name ?? undefined
})
export const nameServiceSelectors = { accounts, tokens }

export default nameServiceSelectors
