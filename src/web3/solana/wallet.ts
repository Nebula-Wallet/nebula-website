import { Account } from '@solana/web3.js'

let _wallet: Account

const getSolanaWallet = async (privKey: number[]): Promise<Account> => {
  if (_wallet) {
    return _wallet
  }

  _wallet = new Account(privKey)
  return _wallet
}

export { getSolanaWallet }
