import { IModals, modalsSliceName } from '@reducers/modals'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[modalsSliceName] as IModals

export const {
  createAccount,
  createToken,
  mintToken,
  freezeAccount,
  thawAccount
} = keySelectors(store, [
  'createAccount',
  'createToken',
  'mintToken',
  'freezeAccount',
  'thawAccount'
])

export const modalsSelectors = { createAccount, createToken, mintToken, freezeAccount, thawAccount }

export default modalsSelectors
