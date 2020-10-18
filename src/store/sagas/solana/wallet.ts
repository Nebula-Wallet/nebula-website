import { call, takeLeading, SagaGenerator, put, select } from 'typed-redux-saga'

import { actions } from '@reducers/solanaWallet'
import { getConnection } from './connection'
import { getSolanaWallet, TokenProgramMap } from '@web3/solana/wallet'
import { Account, PublicKey } from '@solana/web3.js'
import { Token } from '@solana/spl-token'
import { network } from '@selectors/solanaConnection'
import { Status } from '@reducers/provider'

export function* getWallet(): SagaGenerator<Account> {
  const wallet = yield* call(getSolanaWallet)
  return wallet
}
export function* getBalance(pubKey: PublicKey): SagaGenerator<number> {
  const connection = yield* call(getConnection)
  const balance = yield* call([connection, connection.getBalance], pubKey)
  return balance
}
interface IparsedTokenInfo {
  mint: string
  owner: string
  tokenAmount: {
    amount: string
    decimals: number
    uiAmount: number
  }
}
export function* fetchTokensAccounts(): Generator {
  const connection = yield* call(getConnection)
  const currentNetwork = yield* select(network)
  const wallet = yield* call(getWallet)
  const tokensAccounts = yield* call(
    [connection, connection.getParsedTokenAccountsByOwner],
    wallet.publicKey,
    {
      programId: new PublicKey(TokenProgramMap[currentNetwork])
    }
  )
  for (const account of tokensAccounts.value) {
    const info: IparsedTokenInfo = account.account.data.parsed.info
    yield put(
      actions.addTokenAccount({
        programId: info.mint,
        balance: parseInt(info.tokenAmount.amount),
        address: account.pubkey.toString(),
        decimals: info.tokenAmount.decimals
      })
    )
  }
}
export function* getToken(tokenAddress: string): SagaGenerator<Token> {
  const connection = yield* call(getConnection)
  const wallet = yield* call(getWallet)
  const currentNetwork = yield* select(network)
  const token = new Token(
    connection,
    new PublicKey(tokenAddress),
    new PublicKey(TokenProgramMap[currentNetwork]),
    wallet
  )
  return token
}
// export function* getTokenProgram(pubKey: PublicKey): SagaGenerator<number> {
//   const connection = yield* call(getConnection)
//   const balance = yield* call(, pubKey)
//   return balance
// }
export function* sendToken(
  from: string,
  target: string,
  amount: number,
  tokenAddress: string
): Generator {
  const token = yield* call(getToken, tokenAddress)
  const wallet = yield* call(getWallet)
  const signature = yield* call(
    [token, token.transfer],
    new PublicKey(from),
    new PublicKey(target),
    wallet,
    [],
    amount
  )
  console.log(signature)
}
export function* createAccount(tokenAddress: string): Generator {
  const token = yield* call(getToken, tokenAddress)
  const wallet = yield* call(getWallet)

  const address = yield* call([token, token.createAccount], wallet.publicKey)
  yield put(
    actions.addTokenAccount({
      programId: tokenAddress,
      balance: 0,
      address: address.toString(),
      decimals: 9
    })
  )
}

export function* init(): Generator {
  yield put(actions.setStatus(Status.Init))
  const wallet = yield* call(getWallet)
  const balance = yield* call(getBalance, wallet.publicKey)
  yield* call(fetchTokensAccounts)

  yield put(actions.setAddress(wallet.publicKey.toString()))
  yield put(actions.setBalance(balance))
  yield put(actions.setStatus(Status.Initalized))
  // yield* call(
  //   sendToken,
  //   'CDeKid1BQ4kL2xi4Ytn8XsKpCeoYnT4XULKLTtrg2FvK',
  //   'AgGfPnfCyfa71My835QupNZ4m7sKDEwaVHT8xkDQudaa',
  //   100 * 1e9,
  //   '7sCjFDNSnhzRnB2Py8kDoNtx75DLTg1U68aGg2gZPryp'
  // )
  // yield* call(createAccount, '7sCjFDNSnhzRnB2Py8kDoNtx75DLTg1U68aGg2gZPryp')
}

export function* walletSaga(): Generator {
  yield takeLeading(actions.initWallet, init)
}
