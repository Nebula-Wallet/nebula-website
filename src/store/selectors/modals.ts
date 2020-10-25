import { IModals, modalsSliceName } from '@reducers/modals'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[modalsSliceName] as IModals

export const { createAccount, createToken, mintToken } = keySelectors(store, [
  'createAccount',
  'createToken',
  'mintToken'
])

export const modalsSelectors = { createAccount, createToken, mintToken }

export default modalsSelectors
