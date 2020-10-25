/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { accountsArray } from '@selectors/solanaWallet'
import { actions } from '@reducers/modals'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './style'
import Token from './Token/Token'
import CommonButton from '@components/CommonButton/CommonButton'

export const Tokens: React.FC = () => {
  const classes = useStyles()
  const userTokens = useSelector(accountsArray)
  const dispatch = useDispatch()
  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12} className={classes.titleDiv}>
          <Grid container justify='space-between' alignItems='center'>
            <Grid item>
              <Typography variant='h4' color='primary' className={classes.title}>
                Your tokens
              </Typography>
            </Grid>
            <Grid item>
              <CommonButton
                name='Add Account +'
                className={classes.addAccountButton}
                onClick={() => {
                  dispatch(actions.openModal('createAccount'))
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container className={classes.info}>
            <Grid item xs={12} className={classes.headers}>
              <Grid container style={{ flexWrap: 'nowrap' }}>
                <Grid item xs={4}>
                  <Typography variant='body1' color='textPrimary'>
                    Account
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant='body1' color='textPrimary'>
                    Token
                  </Typography>
                </Grid>
                <Grid item xs className={classes.balanceDiv}>
                  <Typography variant='body1' color='textPrimary'>
                    Balance
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {userTokens
              .sort((a, b) => b.balance - a.balance)
              .map(token => (
                <Token token={token} />
              ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
export default Tokens
