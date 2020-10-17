import React from 'react'

import Header from '@components/Header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@reducers/signer'
import { address } from '@selectors/signer'

export const HeaderWrapper: React.FC = () => {
  const dispatch = useDispatch()
  const userAddress = useSelector(address)
  return (
    <Header
      onClickLogo={() => window.open('https://synthetify.io')}
      onConnectWallet={() => dispatch(actions.initSigner())}
      address={userAddress}
    />
  )
}

export default HeaderWrapper
