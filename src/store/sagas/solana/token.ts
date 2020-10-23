import { call, put, SagaGenerator, select } from 'typed-redux-saga'

import { getConnection } from './connection'
import { TokenProgramMap } from '@web3/solana/wallet'
import { PublicKey } from '@solana/web3.js'
import { MintInfo, Token } from '@solana/spl-token'
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
  yield* put(
    actions.addGovernedToken({
      network: currentNetwork,
      tokenData: {
        decimals: decimals,
        freezeAuthority: freezeAuthority ?? null,
        mintAuthority: mintAuthority ?? wallet.publicKey.toString(),
        programId: tokenPubKey,
        supply: 0
      }
    })
  )
  return tokenPubKey
}
export function* getTokenDetails(address: string): SagaGenerator<MintInfo> {
  const wallet = yield* call(getWallet)
  const connection = yield* call(getConnection)
  const currentNetwork = yield* select(network)
  const token = new Token(
    connection,
    new PublicKey(address),
    new PublicKey(TokenProgramMap[currentNetwork]),
    wallet
  )
  const info = yield* call([token, token.getMintInfo])
  return info
}

// export function* createToken(): Generator {
//   yield takeEvery(actions.addTransaction, init)
// }
