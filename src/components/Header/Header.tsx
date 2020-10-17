import React from 'react'
import { Grid } from '@material-ui/core'
import SynthetifyIconHorizontal from '@components/SynthetifyIconHorizontal/SynthetifyIconHorizontal'

import useStyles from './style'
import CommonButton from '@components/CommonButton/CommonButton'
export interface IHeader {
  onClickLogo: () => void
  onConnectWallet: () => void
  address?: string
}
export const Header: React.FC<IHeader> = ({ onClickLogo, onConnectWallet, address }) => {
  const classes = useStyles()

  return (
    <>
      <Grid container className={classes.root} justify='space-between' alignItems='center'>
        <Grid item>
          <SynthetifyIconHorizontal onClick={onClickLogo} />
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item className={classes.divButton}>
              <CommonButton
                className={classes.button}
                name={address ? 'Refresh' : 'Connect Wallet'}
                onClick={onConnectWallet}></CommonButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
export default Header
