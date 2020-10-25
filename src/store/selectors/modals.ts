import { IModals, modalsSliceName } from '@reducers/modals'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[modalsSliceName] as IModals

export const { createAccount } = keySelectors(store, ['createAccount'])

export const modalsSelectors = { createAccount }

export default modalsSelectors
