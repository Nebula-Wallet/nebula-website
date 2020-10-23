import React, { useState } from 'react'

import useStyles from './style'
import { FormControl, Grid, InputLabel, Select, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { currentGovernedTokens } from '@selectors/solanaWallet'

const GovernPage: React.FC = () => {
  const classes = useStyles()
  const tokens = useSelector(currentGovernedTokens)
  const [selectedToken, setSelectedToken] = useState(tokens[0].programId)
  return (
    <Grid container className={classes.contentContainer} justify='center'>
      <Grid item xs={12} className={classes.contentWrapper}>
        <Grid container className={classes.root}>
          <Grid item xs={12} className={classes.titleDiv}>
            <Typography variant='h4' color='primary' className={classes.title}>
              Manage Tokens
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant='outlined' className={classes.selectedTokenDiv}>
              <InputLabel className={classes.selectLabel}>Selected token</InputLabel>
              <Select
                native
                value={selectedToken}
                onChange={e => {
                  setSelectedToken(e.target.value as string)
                }}
                label='Selected token'
                classes={{ icon: classes.iconSelect }}>
                {tokens.map(token => (
                  <option value={token.programId}>{token.programId}</option>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default GovernPage
