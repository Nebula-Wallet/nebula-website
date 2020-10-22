import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  tokenDiv: {
    borderBottom: `2px solid ${colors.green.hover}`,
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 8,
    paddingBottom: 8,
    '&:hover': {
      backgroundColor: colors.green.hover
    }
  },
  field: {
    whiteSpace: 'nowrap',
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingRight: 16
  },
  balance: {
    whiteSpace: 'nowrap',
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  swapButton: {
    marginLeft: 8,
    color: colors.purple.orchid,
    borderColor: colors.purple.orchid,
    '&:hover': {
      borderWidth: 2,
      color: colors.black.background,
      backgroundColor: `${colors.purple.orchid}`,
      borderColor: colors.purple.orchid
    }
  }
}))

export default useStyles
