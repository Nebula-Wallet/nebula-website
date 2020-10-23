import { call, put, SagaGenerator, select } from 'typed-redux-saga'

import { getConnection } from './connection'
import { TokenProgramMap } from '@web3/solana/wallet'
import { PublicKey } from '@solana/web3.js'
import { Token } from '@solana/spl-token'
import { network } from '@selectors/solanaConnection'
import { getWallet } from './wallet'
import { actions } from '@reducers/solanaWallet'

export function* createToken(
  decimals: number,
  freezeAuthority?: string,
  mintAuthority?: string
): SagaGenerator<string> {
  const wallet = yield* call(getWallet)
  const connection = yield* call(getConnection)
  const currentNetwork = yield* select(network)

  const token = yield* call(
    [Token, Token.createMint],
    connection,
    wallet,
    mintAuthority ? new PublicKey(mintAuthority) : wallet.publicKey,
    freezeAuthority ? new PublicKey(freezeAuthority) : null,
    decimals,
    new PublicKey(TokenProgramMap[currentNetwork])
  )

  // @ts-expect-error
  const tokenPubKey = token.publicKey.toString() as string
  yield* put(actions.addGovernedToken({ network: currentNetwork, tokenAddress: tokenPubKey }))
  return tokenPubKey
  // return token.publicKey.toString()
  // yield* call(
  //   sendToken,
  //   'CDeKid1BQ4kL2xi4Ytn8XsKpCeoYnT4XULKLTtrg2FvK',
  //   'AgGfPnfCyfa71My835QupNZ4m7sKDEwaVHT8xkDQudaa',
  //   100 * 1e9,
  //   '7sCjFDNSnhzRnB2Py8kDoNtx75DLTg1U68aGg2gZPryp'
  // )
  // yield* call(createAccount, '7sCjFDNSnhzRnB2Py8kDoNtx75DLTg1U68aGg2gZPryp')
}

// export function* createToken(): Generator {
//   yield takeEvery(actions.addTransaction, init)
// }
