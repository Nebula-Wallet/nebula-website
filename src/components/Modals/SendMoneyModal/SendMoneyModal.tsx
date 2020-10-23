/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-new */
import React from 'react'
import {
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  CircularProgress,
  TextField
} from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers'

import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import CloseIcon from '@material-ui/icons/Close'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import { PublicKey } from '@solana/web3.js'
import CommonButton from '@components/CommonButton/CommonButton'
import useStyles from './style'

export interface ISendMoneyModal {
  open: boolean
  loading: boolean
  handleClose: () => void
  onSend: (amount: number, recipient: string) => void
  txid?: string
  balance: number
}
export interface FormFields {
  amount: number
  recipient: string
}
export const SendMoneyModal: React.FC<ISendMoneyModal> = ({
  open,
  loading,
  handleClose,
  onSend,
  txid,
  balance
}) => {
  const classes = useStyles()
  const schema = yup.object().shape({
    recipient: yup
      .string()
      .test('is-publicKey', 'Invalid Address', data => {
        try {
          new PublicKey(data)
          return true
        } catch (error) {
          return false
        }
      })
      .required('Provide recipient.'),
    amount: yup.number().min(0).max(balance).required('Name & Surname required.')
  })
  const { control, errors, formState, reset, setValue, handleSubmit } = useForm<FormFields>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: { amount: 0, recipient: '' },
    shouldFocusError: true
  })

  const clearAndSubmit = (data: FormFields) => {
    onSend(data.amount, data.recipient)
    reset()
  }
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
          <form
            style={{ width: '100%', height: '100%' }}
            onSubmit={e => {
              e.preventDefault()
              handleSubmit(clearAndSubmit)(e)
            }}>
            <Grid
              container
              className={classes.contentWrapper}
              direction='column'
              justify='center'
              alignItems='center'>
              <Grid item className={classes.inputDiv}>
                <Controller
                  as={TextField}
                  helperText={errors.recipient?.message}
                  error={!!errors.recipient?.message}
                  className={classes.input}
                  id='outlined-search'
                  label='Recipient'
                  type='text'
                  name='recipient'
                  variant='outlined'
                  control={control}
                />
              </Grid>
              <Grid item className={classes.inputDiv}>
                <Controller
                  as={TextField}
                  helperText={errors.amount?.message && 'Invalid amount'}
                  error={!!errors.amount?.message}
                  className={classes.input}
                  id='outlined-search'
                  label='Amount'
                  name='amount'
                  type='text'
                  variant='outlined'
                  control={control}
                />
                <Typography
                  variant='body2'
                  className={classes.maxBalance}
                  onClick={() => {
                    setValue('amount', balance, { shouldValidate: true })
                  }}>
                  Set max: {balance}
                </Typography>
              </Grid>
              <Grid item>
                <CommonButton disabled={!formState.isValid} name='Send Transaction' />
              </Grid>
            </Grid>
          </form>
        )}
      </Dialog>
    </Grid>
  )
}
export default SendMoneyModal