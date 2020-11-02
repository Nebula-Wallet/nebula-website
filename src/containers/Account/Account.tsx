import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import Account from '@components/Account/Account'
import { balance, address } from '@selectors/solanaWallet'
import { actions } from '@reducers/solanaWallet'
import SendMoneyModal from '@containers/Modals/SendMoneyModal'
import { network } from '@selectors/solanaConnection'
import { myName } from '@selectors/nameService'

export const AccountWrapper: React.FC = () => {
  const userAddress = useSelector(address)
  const userBalance = useSelector(balance)
  const currentNetwork = useSelector(network)
  const name = useSelector(myName)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  return (
    <>
      <SendMoneyModal
        handleClose={() => {
          setOpen(false)
        }}
        open={open}
      />
      <Account
        network={currentNetwork}
        address={userAddress}
        balance={userBalance}
        name={name}
        onSend={() => {
          setOpen(true)
        }}
        onAirdrop={() => {
          dispatch(actions.airdrop())
        }}
      />
    </>
  )
}

export default AccountWrapper
