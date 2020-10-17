import { call, takeLeading, SagaGenerator, put } from 'typed-redux-saga'

import { actions } from '@reducers/solanaWallet'
import { getConnection } from './connection'
import { getSolanaWallet } from '@web3/solana/wallet'
import { Account, PublicKey } from '@solana/web3.js'

export function* getWallet(): SagaGenerator<Account> {
  const wallet = yield* call(getSolanaWallet, privKey)
  return wallet
}
export const getBalance = async (pubKey: PublicKey): Promise<number> => {
  const connection = await getConnection()
  const balance = await connection.getBalance(pubKey)
  return balance
}

export function* init(): Generator {
  const wallet = yield* call(getWallet)
  const balance = yield* call(getBalance, wallet.publicKey)
  yield put(actions.setAddress(wallet.publicKey.toString()))
  yield put(actions.setBalance(balance))
}

export function* walletSaga(): Generator {
  yield takeLeading(actions.initWallet, init)
}
// JUST FOR TESTS
const privKey = [
  133,
  91,
  203,
  107,
  86,
  82,
  38,
  25,
  168,
  33,
  171,
  34,
  21,
  21,
  135,
  216,
  129,
  204,
  106,
  37,
  112,
  214,
  81,
  200,
  132,
  122,
  125,
  61,
  148,
  19,
  127,
  137,
  212,
  119,
  14,
  73,
  138,
  61,
  251,
  78,
  95,
  28,
  49,
  41,
  165,
  207,
  185,
  217,
  114,
  67,
  72,
  132,
  201,
  176,
  33,
  26,
  51,
  178,
  162,
  83,
  74,
  14,
  194,
  0
]
