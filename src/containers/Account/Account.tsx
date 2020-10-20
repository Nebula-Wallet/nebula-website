import React, { useState } from 'react'

import { useSelector } from 'react-redux'
import Account from '@components/Account/Account'
import { balance, address } from '@selectors/solanaWallet'
import SendMoneyModal from '@containers/Modals/SendMoneyModal'

export const AccountWrapper: React.FC = () => {
  const userAddress = useSelector(address)
  const userBalance = useSelector(balance)
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
        address={userAddress}
        balance={userBalance}
        onSend={() => {
          setOpen(true)
        }}
      />
    </>
  )
}

export default AccountWrapper
