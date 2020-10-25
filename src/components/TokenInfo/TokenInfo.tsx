import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './style'
import CommonButton from '@components/CommonButton/CommonButton'

export interface IProps {
  address: string
  supply: number
  mintAuthority: string | null
  freezeAuthority: string | null
  decimals: number
  onMint: () => void
}
export const TokenInfo: React.FC<IProps> = ({
  address,
  supply,
  mintAuthority,
  freezeAuthority,
  decimals,
  onMint
}) => {
  const classes = useStyles()
  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12} className={classes.titleDiv}>
          <Typography variant='h4' color='primary' className={classes.title}>
            Token Info
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container className={classes.info}>
            <Grid item xs={12}>
              <Grid item xs>
                <Grid container>
                  <Grid item xs={12} className={classes.data}>
                    <Grid container direction='row' justify='space-between'>
                      <Grid item>
                        <Typography variant='body1' color='textPrimary'>
                          Address
                        </Typography>
                      </Grid>
                      <Grid item xs className={classes.addressDiv}>
                        <Typography variant='body1' color='textPrimary' className={classes.address}>
                          {address}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className={classes.data}>
                    <Grid container direction='row' justify='space-between'>
                      <Grid item>
                        <Typography variant='body1' color='textPrimary'>
                          Mint Authority
                        </Typography>
                      </Grid>
                      <Grid item xs className={classes.addressDiv}>
                        <Typography variant='body1' color='textPrimary' className={classes.address}>
                          {mintAuthority || '---'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className={classes.data}>
                    <Grid container direction='row' justify='space-between'>
                      <Grid item>
                        <Typography variant='body1' color='textPrimary'>
                          Freeze Authority
                        </Typography>
                      </Grid>
                      <Grid item xs className={classes.addressDiv}>
                        <Typography variant='body1' color='textPrimary' className={classes.address}>
                          {freezeAuthority || '---'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className={classes.data}>
                    <Grid container direction='row' justify='space-between'>
                      <Grid item>
                        <Typography variant='body1' color='textPrimary'>
                          Decimals
                        </Typography>
                      </Grid>
                      <Grid item xs className={classes.addressDiv}>
                        <Typography variant='body1' color='textPrimary' className={classes.address}>
                          {decimals}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className={classes.data}>
                    <Grid container direction='row' justify='space-between'>
                      <Grid item>
                        <Typography variant='body1' color='textPrimary'>
                          Supply
                        </Typography>
                      </Grid>
                      <Grid item xs className={classes.addressDiv}>
                        <Typography variant='body1' color='textPrimary' className={classes.address}>
                          {supply / 10 ** decimals}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className={classes.buttonDiv}>
                    <Grid container justify='flex-end'>
                      <Grid item>
                        <CommonButton name='send' onClick={onMint} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
export default TokenInfo
