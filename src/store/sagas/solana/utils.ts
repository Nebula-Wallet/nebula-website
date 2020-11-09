/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/return-await */
import {
  Account,
  ConfirmOptions,
  Connection,
  PublicKey,
  SystemProgram,
  Transaction
} from '@solana/web3.js'

import { call, SagaGenerator } from 'typed-redux-saga'
import { getConnection } from './connection'
import { getWallet } from './wallet'

export async function confirmTransaction(
  connection: Connection,
  transaction: Transaction,
  signers: Account[],
  options?: ConfirmOptions | undefined
): Promise<string> {
  const signature = await connection.sendTransaction(transaction, signers, {
    skipPreflight: true
  })
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef-init
    let timeout: number | undefined = undefined
    const id = connection.onSignature(
      signature,
      result => {
        console.log('confirm')
        if (timeout) clearTimeout(timeout)
        if (result.err) {
          reject(new Error('failed'))
        } else {
          resolve(signature)
        }
      },
      'singleGossip'
    )
    console.log(id)
    timeout = setTimeout(() => {
      connection.removeSignatureListener(id)
      reject(new Error('timeout'))
    }, 50000)
  })
}

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
  yield* call(confirmTransaction, connection, transaction, [wallet, dataAccount], {
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
  const txid = yield* call(confirmTransaction, connection, transaction, [wallet], {
    commitment: 'max'
  })
  return txid
}
