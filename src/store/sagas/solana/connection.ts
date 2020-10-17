import { call, put, takeLeading } from 'typed-redux-saga'

import { actions, Status } from '@reducers/solanaConnection'
import { actions as solanaWalletActions } from '@reducers/solanaWallet'
import { getSolanaConnection, SolanaNetworks } from '@web3/solana/connection'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { Connection } from '@solana/web3.js'
export const getConnection = async (): Promise<Connection> => {
  const connection = await getSolanaConnection(SolanaNetworks.DEV)
  return connection
}
export function* initConnection(): Generator {
  try {
    yield* call(getConnection)
    yield put(actions.setStatus(Status.Initalized))
    yield put(
      snackbarsActions.add({
        message: 'Solana network connected.',
        variant: 'success',
        persist: false
      })
    )
    yield put(solanaWalletActions.initWallet())
  } catch (error) {
    yield put(actions.setStatus(Status.Error))
    snackbarsActions.add({
      message: 'Failed to connect to Solana network',
      variant: 'error',
      persist: false
    })
  }
}

export function* connectionSaga(): Generator {
  yield takeLeading(actions.initSolanaConnection, initConnection)
}
