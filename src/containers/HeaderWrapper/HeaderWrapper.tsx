import React from 'react'

import Header from '@components/Header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@reducers/signer'
import { actions as uiActions } from '@reducers/ui'
import { address } from '@selectors/signer'
import { navigation } from '@selectors/ui'

export const HeaderWrapper: React.FC = () => {
  const dispatch = useDispatch()
  const userAddress = useSelector(address)
  const currentNavigation = useSelector(navigation)

  return (
    <Header
      onClickLogo={() => window.open('https://synthetify.io')}
      onConnectWallet={() => dispatch(actions.initSigner())}
      address={userAddress}
      currentNavigation={currentNavigation}
      onNavigationChange={tab => {
        dispatch(uiActions.setNavigation(tab))
      }}
    />
  )
}

export default HeaderWrapper
