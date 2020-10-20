import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './style'
import SolanaIcon from '@static/svg/solana.svg'
import CommonButton from '@components/CommonButton/CommonButton'

export interface IProps {
  address: string
  balance: number
  onSend: () => void
}
export const Account: React.FC<IProps> = ({ address, balance, onSend }) => {
  const classes = useStyles()
  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12} className={classes.titleDiv}>
          <Typography variant='h4' color='primary' className={classes.title}>
            Account
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container className={classes.info}>
            <Grid item xs={12}>
              <Grid container direction='row'>
                <Grid item>
                  <div className={classes.solanaLogoDiv}>
                    <img src={SolanaIcon} alt='' className={classes.solanaLogo} />
                  </div>
                </Grid>
                <Grid item xs>
                  <Grid container>
                    <Grid item xs={12}>
                      <Grid
                        container
                        direction='row'
                        justify='space-between'
                        className={classes.data}>
                        <Grid item>
                          <Typography variant='body1' color='textPrimary'>
                            Balance
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant='body1' color='textPrimary'>
                            {balance / 1e9} SOL
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container direction='row' justify='space-between'>
                        <Grid item>
                          <Typography variant='body1' color='textPrimary'>
                            Address
                          </Typography>
                        </Grid>
                        <Grid item xs className={classes.addressDiv}>
                          <Typography
                            variant='body1'
                            color='textPrimary'
                            className={classes.address}>
                            {address}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} className={classes.buttonDiv}>
                      <Grid container justify='flex-end'>
                        <Grid item>
                          <CommonButton name='send' onClick={onSend} />
                        </Grid>
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
export default Account
