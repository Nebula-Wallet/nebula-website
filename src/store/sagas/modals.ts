import { call, put, takeEvery, spawn, all } from 'typed-redux-saga'

import { actions, PayloadTypes } from '@reducers/modals'
import { PayloadAction } from '@reduxjs/toolkit'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { createAccount } from './solana/wallet'

export function* handleCreateAccount(
  action: PayloadAction<PayloadTypes['createAccount']>
): Generator {
  try {
    const accountAddress = yield* call(createAccount, action.payload.tokenAddress)
    yield* put(
      actions.accountCreated({
        accountAddress: accountAddress
      })
    )
  } catch (error) {
    yield put(
      snackbarsActions.add({
        message: 'Failed to send. Please try again.',
        variant: 'error',
        persist: false
      })
    )
    yield put(
      actions.accountCreatedError({
        error: error
      })
    )
  }
}

export function* createAccountAction(): Generator {
  yield takeEvery(actions.createAccount, handleCreateAccount)
}
export function* modalsSaga(): Generator {
  yield all([createAccountAction].map(spawn))
}
