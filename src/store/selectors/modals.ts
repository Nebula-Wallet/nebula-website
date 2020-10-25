import { IModals, modalsSliceName } from '@reducers/modals'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[modalsSliceName] as IModals

export const { createAccount, createToken } = keySelectors(store, ['createAccount', 'createToken'])

export const modalsSelectors = { createAccount, createToken }

export default modalsSelectors
