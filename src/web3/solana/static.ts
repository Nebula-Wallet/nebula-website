import { PublicKey } from '@solana/web3.js'
import { SolanaNetworks } from './connection'

export const PAYMENT_ACCOUNT_ADDRESS = 'Gsun7cGFrSUm3N8TEBq7Uu9xz4c9cE4pKdbtETQiSgZX'
export const DEFAULT_PUBLIC_KEY = new PublicKey(Buffer.alloc(32))
// Programs
export const ACCOUNT_NAME_STORAGE_SIZE = 73
export const TOKEN_NAME_STORAGE_SIZE = 64
export const AccountNameServiceMap: { [key in SolanaNetworks]: string } = {
  [SolanaNetworks.DEV]: '3pheqxp6nsXKEZKaBvH6Gd7gVimkE9KBVT8naYY1KMJn',
  [SolanaNetworks.TEST]: '3pheqxp6nsXKEZKaBvH6Gd7gVimkE9KBVT8naYY1KMJn',
  [SolanaNetworks.MAIN]: '3pheqxp6nsXKEZKaBvH6Gd7gVimkE9KBVT8naYY1KMJn'
}
export const CounterPointerAddressMap: { [key in SolanaNetworks]: string } = {
  [SolanaNetworks.DEV]: '8mV2uvKEwRaChCFeutCSsEJisq3SvuyKPvehRYG4cJj1',
  [SolanaNetworks.TEST]: '8mV2uvKEwRaChCFeutCSsEJisq3SvuyKPvehRYG4cJj1',
  [SolanaNetworks.MAIN]: '8mV2uvKEwRaChCFeutCSsEJisq3SvuyKPvehRYG4cJj1'
}
export const CounterAddressMap: { [key in SolanaNetworks]: string } = {
  [SolanaNetworks.DEV]: 'GboDAfZRQS3a7TaXzneSfPNYoKJuB3dHxp8EDQ5EZNpN',
  [SolanaNetworks.TEST]: 'GboDAfZRQS3a7TaXzneSfPNYoKJuB3dHxp8EDQ5EZNpN',
  [SolanaNetworks.MAIN]: 'GboDAfZRQS3a7TaXzneSfPNYoKJuB3dHxp8EDQ5EZNpN'
}
// Tokens
export const TokenNameServiceMap: { [key in SolanaNetworks]: string } = {
  [SolanaNetworks.DEV]: '7qYiprri3wMDKHKpnTakzDjHbKtkzePUDsnjCRvhkCx9',
  [SolanaNetworks.TEST]: '7qYiprri3wMDKHKpnTakzDjHbKtkzePUDsnjCRvhkCx9',
  [SolanaNetworks.MAIN]: '7qYiprri3wMDKHKpnTakzDjHbKtkzePUDsnjCRvhkCx9'
}
