import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import SendMoneyModalComponent from '@components/Modals/SendMoneyModal/SendMoneyModal'
import { transactions } from '@selectors/solanaWallet'
import { actions } from '@reducers/solanaWallet'

export interface ISendMoneyModal {
  open: boolean
  handleClose: () => void
}

export const SendMoneyModal: React.FC<ISendMoneyModal> = ({ open, handleClose }) => {
  const dispatch = useDispatch()
  const pendingTransactions = useSelector(transactions)
  const [random, setRandom] = useState(Math.random().toString())
  return (
    <SendMoneyModalComponent
      onSend={(amount: number, recipient: string) => {
        dispatch(actions.addTransaction({ amount, recipient, id: random }))
        setRandom(random)
      }}
      open={open}
      loading={pendingTransactions[random]?.sending || false}
      txid={pendingTransactions[random]?.txid}
      handleClose={() => {
        handleClose()
        setTimeout(() => {
          setRandom(Math.random().toString())
        }, 300)
      }}
    />
  )
}

export default SendMoneyModal
