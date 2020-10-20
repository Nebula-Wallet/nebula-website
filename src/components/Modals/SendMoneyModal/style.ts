import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiDialogTitle-root': {
      padding: '0 8px 10px'
    },
    '& .MuiDialog-paper': {
      padding: 10,
      height: 450,
      width: 450,
      background: colors.green.main
    }
  },
  titleWrapper: {
    color: colors.black.background,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  close: {
    cursor: 'pointer'
  },

  progressWrapper: {
    background: colors.black.background,
    width: '100%',
    height: '100%',
    padding: 32
  },
  contentWrapper: {
    background: colors.black.background,
    padding: 32,
    width: '100%',
    height: '100%'
  },
  progress: {
    marginBottom: 16,
    color: colors.green.main
  },
  input: {
    '& .MuiFormLabel-root': {
      color: theme.palette.primary.main
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(0,249,187,0.25)'
    }
  },
  inputDiv: {
    minHeight: 100
  },
  txid: {
    wordBreak: 'break-all',
    textAlign: 'center'
  },
  successIcon: {
    color: theme.palette.primary.main,
    fontSize: 120
  }
}))

export default useStyles
