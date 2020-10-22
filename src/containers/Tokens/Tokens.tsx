/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { accountsArray } from '@selectors/solanaWallet'
import { useSelector } from 'react-redux'
import useStyles from './style'
import Token from './Token/Token'

export const Tokens: React.FC = () => {
  const classes = useStyles()
  const userTokens = useSelector(accountsArray)
  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12} className={classes.titleDiv}>
          <Typography variant='h4' color='primary' className={classes.title}>
            Your tokens
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container className={classes.info}>
            <Grid item xs={12} className={classes.headers}>
              <Grid container>
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
                <Grid item xs={4}>
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
