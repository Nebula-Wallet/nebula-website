import { call, put, takeEvery, spawn, all, select } from 'typed-redux-saga'

import { actions, PayloadTypes } from '@reducers/modals'
import { PayloadAction } from '@reduxjs/toolkit'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { actions as walletActions } from '@reducers/solanaWallet'
import modalsSelectors from '@selectors/modals'
import { createAccount, getWallet } from './solana/wallet'
import { createToken, freezeAccount, mintToken, thawAccount } from './solana/token'
import { network } from '@selectors/solanaConnection'
import { createCleanAccount, sendSol } from './solana/utils'
import { AccountNameServiceMap, ACCOUNT_NAME_STORAGE_SIZE } from '@web3/solana/static'
import { PublicKey } from '@solana/web3.js'
import { registerAccount } from './solana/nameService'

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
export function* handleCreateToken(action: PayloadAction<PayloadTypes['createToken']>): Generator {
  try {
    const tokenAddress = yield* call(
      createToken,
      action.payload.decimals,
      action.payload.freezeAuthority
    )
    yield* put(
      actions.tokenCreated({
        tokenAddress: tokenAddress
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
      actions.tokenCreatedError({
        error: error
      })
    )
  }
}
export function* handleMintToken(action: PayloadAction<PayloadTypes['mintToken']>): Generator {
  try {
    const mintTokenData = yield* select(modalsSelectors.mintToken)
    const currNetwork = yield* select(network)
    yield* call(
      mintToken,
      mintTokenData.tokenAddress,
      action.payload.recipient,
      action.payload.amount * 10 ** mintTokenData.decimals
    )
    yield* put(
      actions.tokenMinted({
        txid: 'Tokens minted'
      })
    )
    yield* put(
      walletActions.increaseGovernedTokenSupply({
        network: currNetwork,
        tokenData: {
          programId: mintTokenData.tokenAddress,
          supply: action.payload.amount * 10 ** mintTokenData.decimals
        }
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
      actions.tokenMintedError({
        error: error
      })
    )
  }
}
export function* handleFreezeAccount(
  action: PayloadAction<PayloadTypes['freezeAccount']>
): Generator {
  try {
    const mintTokenData = yield* select(modalsSelectors.freezeAccount)
    yield* call(freezeAccount, mintTokenData.tokenAddress, action.payload.accountToFreeze)
    yield* put(
      actions.accountFrozen({
        txid: 'Account has been frozen.'
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
      actions.accountFrozenError({
        error: error
      })
    )
  }
}

export function* handleThawAccount(action: PayloadAction<PayloadTypes['thawAccount']>): Generator {
  try {
    const thawAccountData = yield* select(modalsSelectors.thawAccount)
    yield* call(thawAccount, thawAccountData.tokenAddress, action.payload.accountToThaw)
    yield* put(
      actions.accountThawed({
        txid: 'Account has been unfrozen.'
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
      actions.accountThawedError({
        error: error
      })
    )
  }
}
export function* handleRegisterAccount(
  action: PayloadAction<PayloadTypes['registerAccount']>
): Generator {
  try {
    const currentNetwork = yield* select(network)
    yield* put(
      actions.updateRegisterAccount({
        sending: true,
        message: 'Creating storage account.'
      })
    )
    const storageAccount = yield* call(
      createCleanAccount,
      ACCOUNT_NAME_STORAGE_SIZE,
      new PublicKey(AccountNameServiceMap[currentNetwork])
    )
    yield* put(
      actions.updateRegisterAccount({
        sending: true,
        message: 'Transfering fee.'
      })
    )
    yield* call(sendSol, 1, storageAccount)
    yield* put(
      actions.updateRegisterAccount({
        sending: true,
        message: 'Registering name.'
      })
    )
    const wallet = yield* call(getWallet)
    const txid = yield* call(registerAccount, {
      name: action.payload.name,
      account: wallet.publicKey,
      storageAccount
    })
    yield* put(
      actions.updateRegisterAccount({
        sending: false,
        message: `Success Txid: ${txid}`
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
      actions.registerAccountError({
        error: error
      })
    )
  }
}

export function* thawAccountAction(): Generator {
  yield takeEvery(actions.thawAccount, handleThawAccount)
}
export function* registerAccountAction(): Generator {
  yield takeEvery(actions.registerAccount, handleRegisterAccount)
}
export function* createAccountAction(): Generator {
  yield takeEvery(actions.createAccount, handleCreateAccount)
}
export function* freezeAccountAction(): Generator {
  yield takeEvery(actions.freezeAccount, handleFreezeAccount)
}
export function* mintTokenAction(): Generator {
  yield takeEvery(actions.mintToken, handleMintToken)
}
export function* createTokenAction(): Generator {
  yield takeEvery(actions.createToken, handleCreateToken)
}
export function* modalsSaga(): Generator {
  yield all(
    [
      createAccountAction,
      createTokenAction,
      mintTokenAction,
      freezeAccountAction,
      thawAccountAction,
      registerAccountAction
    ].map(spawn)
  )
}
