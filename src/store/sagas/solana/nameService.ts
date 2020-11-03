/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IAddressRecord, actions } from '@reducers/nameService'
import { network } from '@selectors/solanaConnection'
import {
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
  TransactionInstruction
} from '@solana/web3.js'
import { parseUserRegisterData } from '@web3/solana/data'
import {
  AccountNameServiceMap,
  CounterPointerAddressMap,
  CounterAddressMap,
  PAYMENT_ACCOUNT_ADDRESS
} from '@web3/solana/static'
import { call, put, SagaGenerator, select } from 'typed-redux-saga'

import { getConnection } from './connection'
import { getWallet } from './wallet'

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
}
interface IRegisterAccount {
  name: string
  account: PublicKey
  storageAccount: PublicKey
}
export function* registerAccount({
  name,
  account,
  storageAccount
}: IRegisterAccount): SagaGenerator<string> {
  const connection = yield* call(getConnection)
  const wallet = yield* call(getWallet)
  const currentNetwork = yield* select(network)
  const nameToRegister = Buffer.alloc(32)
  nameToRegister.write(name)
  const instructionData = Buffer.concat([account.toBuffer(), nameToRegister])
  const instruction = new TransactionInstruction({
    keys: [
      // This account must match one in smartcontract
      { pubkey: new PublicKey(PAYMENT_ACCOUNT_ADDRESS), isSigner: false, isWritable: true },
      // This account must match one in smartcontract
      {
        pubkey: new PublicKey(CounterPointerAddressMap[currentNetwork]),
        isSigner: false,
        isWritable: true
      },
      // This account must match one in smartcontract
      {
        pubkey: new PublicKey(CounterAddressMap[currentNetwork]),
        isSigner: false,
        isWritable: true
      },
      { pubkey: storageAccount, isSigner: false, isWritable: true }
    ],
    programId: new PublicKey(AccountNameServiceMap[currentNetwork]),
    data: instructionData
  })
  const txid = yield* call(
    sendAndConfirmTransaction,
    connection,
    new Transaction().add(instruction),
    [wallet],
    { commitment: 'singleGossip' }
  )
  return txid
}
