import React, { useState } from 'react'
import {
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  CircularProgress,
  TextField
} from '@material-ui/core'

import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import CloseIcon from '@material-ui/icons/Close'
import useStyles from './style'
import CommonButton from '@components/CommonButton/CommonButton'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'

export interface ISendMoneyModal {
  open: boolean
  loading: boolean
  handleClose: () => void
  onSend: (amount: number, recipient: string) => void
  txid?: string
}

export const SendMoneyModal: React.FC<ISendMoneyModal> = ({
  open,
  loading,
  handleClose,
  onSend,
  txid
}) => {
  const [amount, setAmount] = useState<number>()
  const [recipient, setRecipient] = useState('')
  const classes = useStyles()
  return (
    <Grid container>
      <Dialog open={open} onClose={handleClose} className={classes.root}>
        <DialogTitle>
          <Grid container className={classes.titleWrapper}>
            <AttachMoneyIcon />
            <Typography variant='body1'>{'Send Money'}</Typography>
            <CloseIcon onClick={handleClose} className={classes.close} />
          </Grid>
        </DialogTitle>
        {loading ? (
          <Grid
            container
            className={classes.progressWrapper}
            justify='center'
            direction='column'
            alignItems='center'>
            <CircularProgress size={100} className={classes.progress} />
            <Typography variant='body2'>Sending transactions...</Typography>
          </Grid>
        ) : txid ? (
          <Grid
            container
            className={classes.progressWrapper}
            justify='center'
            direction='column'
            alignItems='center'>
            <CheckCircleOutlineIcon className={classes.successIcon} />
            <Typography variant='body2' className={classes.txid}>
              Transaction id:
            </Typography>
            <Typography variant='body2' className={classes.txid}>
              {txid}
            </Typography>
          </Grid>
        ) : (
          <Grid
            container
            className={classes.contentWrapper}
            direction='column'
            justify='center'
            alignItems='center'>
            <Grid item className={classes.inputDiv}>
              <TextField
                className={classes.input}
                id='outlined-search'
                label='Recipient'
                type='text'
                variant='outlined'
                value={recipient}
                onChange={e => setRecipient(e.target.value)}
              />
            </Grid>
            <Grid item className={classes.inputDiv}>
              <TextField
                className={classes.input}
                id='outlined-search'
                label='Amount'
                type='number'
                variant='outlined'
                value={amount}
                onChange={e => setAmount(parseFloat(e.target.value))}
              />
            </Grid>
            <Grid item>
              <CommonButton
                name='Send Transaction'
                onClick={() => {
                  onSend(amount ?? 0, recipient)
                  setAmount(undefined)
                  setRecipient('')
                }}
              />
            </Grid>
          </Grid>
        )}
      </Dialog>
    </Grid>
  )
}
export default SendMoneyModal
