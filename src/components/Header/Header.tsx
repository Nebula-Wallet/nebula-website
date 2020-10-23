import React from 'react'
import { BottomNavigation, BottomNavigationAction, Grid, Typography } from '@material-ui/core'
// import SynthetifyIconHorizontal from '@components/SynthetifyIconHorizontal/SynthetifyIconHorizontal'
import CommonButton from '@components/CommonButton/CommonButton'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import AppsIcon from '@material-ui/icons/Apps'

import useStyles from './style'
export enum Tabs {
  Wallet = 'Wallet',
  Govern = 'Govern'
}
export interface IHeader {
  onClickLogo: () => void
  onConnectWallet: () => void
  onNavigationChange: (tabName: Tabs) => void
  currentNavigation: Tabs
  address?: string
}
export const Header: React.FC<IHeader> = ({
  onClickLogo,
  onConnectWallet,
  address,
  onNavigationChange,
  currentNavigation
}) => {
  const classes = useStyles()

  return (
    <>
      <Grid container className={classes.root} justify='space-between' alignItems='center'>
        <Grid item>
          {/* <SynthetifyIconHorizontal onClick={onClickLogo} /> */}
          <Typography variant='h3' color='primary' onClick={onClickLogo}>
            Nebula Wallet
          </Typography>
        </Grid>
        <Grid item>
          <BottomNavigation
            value={currentNavigation}
            onChange={(_, newValue) => {
              onNavigationChange(newValue as Tabs)
            }}
            showLabels
            className={classes.navigationRoot}>
            <BottomNavigationAction
              label={Tabs.Wallet}
              icon={<AccountBalanceWalletIcon fontSize='large' />}
              color='primary'
              value={Tabs.Wallet}
              classes={{
                root: classes.navigationTab,
                selected: classes.navigationTabSelected,
                label: classes.navigationTabLabel
              }}
            />
            <BottomNavigationAction
              label={Tabs.Govern}
              value={Tabs.Govern}
              icon={<AppsIcon fontSize='large' />}
              classes={{
                root: classes.navigationTab,
                selected: classes.navigationTabSelected,
                label: classes.navigationTabLabel
              }}
            />
          </BottomNavigation>
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
