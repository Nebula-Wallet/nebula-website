import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  info: {
    backgroundColor: colors.blue.accent,
    borderRadius: 24,
    overflow: 'hidden'
  },
  root: {
    width: '100%',
    marginTop: 32
  },
  title: {
    fontWeight: 'bold',
    marginLeft: 20
  },
  titleDiv: {
    marginBottom: 16,
    paddingBottom: 8,
    borderBottom: `2px solid ${colors.green.hover}`
  },
  headers: {
    borderBottom: `2px solid ${colors.green.hover}`,
    paddingTop: 16,
    paddingLeft: 32,
    paddingRight: 32
  },
  balanceDiv: {
    minWidth: 350
  }
}))

export default useStyles
