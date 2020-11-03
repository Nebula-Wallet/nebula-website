import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { network, status } from '@selectors/solanaConnection'
import { PublicKey } from '@solana/web3.js'
import { getCurrentSolanaConnection } from '@web3/solana/connection'
import { Status } from '@reducers/solanaConnection'
import { actions } from '@reducers/nameService'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { parseUserRegisterData } from '@web3/solana/data'
import { AccountNameServiceMap } from '@web3/solana/static'

const NameServiceEvents = () => {
  const dispatch = useDispatch()
  const networkStatus = useSelector(status)
  const currentNetwork = useSelector(network)
  // Solana Main Wallet
  React.useEffect(() => {
    const connection = getCurrentSolanaConnection()
    if (!connection || networkStatus !== Status.Initalized) {
      return
    }
    const connectEvents = () => {
      connection.onProgramAccountChange(
        new PublicKey(AccountNameServiceMap[currentNetwork]),
        accountInfo => {
          if (accountInfo.accountInfo.data.length === 73) {
            const record = parseUserRegisterData(accountInfo.accountInfo.data)
            if (record.initialized) {
              dispatch(actions.addNewAccount(record))
              dispatch(
                snackbarsActions.add({
                  message: `${record.name} just registered account.`,
                  variant: 'info',
                  persist: false
                })
              )
            }
          }
          // console.log(accountInfo)
        }
      )
    }
    connectEvents()
  }, [dispatch, networkStatus, currentNetwork])

  return null
}

export default NameServiceEvents
