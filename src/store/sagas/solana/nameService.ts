/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IAddressRecord, actions } from '@reducers/nameService'
import { network } from '@selectors/solanaConnection'
import { PublicKey } from '@solana/web3.js'
import { SolanaNetworks } from '@web3/solana/connection'
import { parseUserRegisterData } from '@web3/solana/data'
import { call, put, select } from 'typed-redux-saga'

import { getConnection } from './connection'

export const AccountNameServiceMap: { [key in SolanaNetworks]: string } = {
  [SolanaNetworks.DEV]: '3pheqxp6nsXKEZKaBvH6Gd7gVimkE9KBVT8naYY1KMJn',
  [SolanaNetworks.TEST]: '3pheqxp6nsXKEZKaBvH6Gd7gVimkE9KBVT8naYY1KMJn',
  [SolanaNetworks.MAIN]: '3pheqxp6nsXKEZKaBvH6Gd7gVimkE9KBVT8naYY1KMJn'
}

export function* fetchRegisteredAddresses(): Generator {
  const connection = yield* call(getConnection)
  const currentNetwork = yield* select(network)
  const info = yield* call(
    [connection, connection.getProgramAccounts],
    new PublicKey(AccountNameServiceMap[currentNetwork])
  )
  const accountsMaping: Map<string, IAddressRecord> = new Map()
  for (const record of info) {
    if (record.account.data.length === 73) {
      const parsedRecord = parseUserRegisterData(record.account.data)
      if (accountsMaping.has(parsedRecord.name)) {
        if (accountsMaping.get(parsedRecord.name)!.index > parsedRecord.index) {
          accountsMaping.set(parsedRecord.name, parsedRecord)
        }
      } else {
        accountsMaping.set(parsedRecord.name, parsedRecord)
      }
    }
  }
  yield* put(actions.addAccounts(accountsMaping))
  // yield* put(uiActions.setNavigation(Tabs.Wallet))
  // yield* put(solanaWalletActions.resetState())
  // yield* call(init)
  // yield* put(
  //   uiActions.setLoader({
  //     open: false,
  //     message: ''
  //   })
  // )
  // yield* put(
  //   snackbarsActions.add({
  //     message: `You are on ${networkToName(action.payload)} network.`,
  //     variant: 'info',
  //     persist: false
  //   })
  // )
}
