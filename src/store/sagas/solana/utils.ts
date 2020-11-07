import {
  Account,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction
} from '@solana/web3.js'

import { call, SagaGenerator } from 'typed-redux-saga'
import { getConnection } from './connection'
import { getWallet } from './wallet'

export function* createCleanAccount(
  numBytes: number,
  programId: PublicKey
): SagaGenerator<PublicKey> {
  const connection = yield* call(getConnection)
  const wallet = yield* call(getWallet)
  const dataAccount = new Account()
  const rentExemption = yield* call(
    [connection, connection.getMinimumBalanceForRentExemption],
    numBytes
  )
  const transaction = new Transaction().add(
    SystemProgram.createAccount({
      fromPubkey: wallet.publicKey,
      newAccountPubkey: dataAccount.publicKey,
      lamports: rentExemption,
      space: numBytes,
      programId: programId
    })
  )
  yield* call(sendAndConfirmTransaction, connection, transaction, [wallet, dataAccount], {
    commitment: 'max'
  })
  return dataAccount.publicKey
}
export function* sendSol(amount: number, recipient: PublicKey): SagaGenerator<string> {
  const connection = yield* call(getConnection)
  const wallet = yield* call(getWallet)
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: recipient,
      lamports: amount * 1e9
    })
  )
  const txid = yield* call(sendAndConfirmTransaction, connection, transaction, [wallet], {
    commitment: 'max'
  })
  return txid
}
