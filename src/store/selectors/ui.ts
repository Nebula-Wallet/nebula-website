import { IUIStore, uiSliceName } from '@reducers/ui'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[uiSliceName] as IUIStore

export const { navigation } = keySelectors(store, ['navigation'])

export const navigationSelectors = { navigation }

export default navigationSelectors
