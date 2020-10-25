import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  info: {
    padding: 32,
    backgroundColor: colors.blue.accent,
    borderRadius: 24
  },
  root: {
    width: '100%'
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
  data: {
    borderBottom: `2px solid ${colors.green.hover}`,
    padding: 8
  },
  address: {
    whiteSpace: 'nowrap',
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'end'
  },
  addressDiv: {
    marginLeft: 25
  },
  buttonDiv: {
    marginTop: 8,
    marginBottom: -8
  }
}))

export default useStyles