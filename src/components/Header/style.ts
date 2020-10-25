import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'
const useStyles = makeStyles(() => ({
  root: {
    height: 80,
    paddingLeft: 25,
    paddingRight: 25,
    // backgroundColor: colors.black.greyish,
    borderBottom: `2px solid ${colors.green.hover}`
  },
  title: {
    fontWeight: 'bold'
  },
  logo: {
    height: 36,
    marginTop: 6,
    cursor: 'pointer'
  },
  divButton: {
    marginLeft: 70
  },
  actionItem: {
    color: colors.white.main,
    fontSize: '16px',
    paddingLeft: 28,
    '&:hover': {
      color: colors.green.main
    }
  },
  button: {
    width: 'auto'
  },
  navigationRoot: {
    background: 'none'
  },
  navigationTab: {
    color: colors.gray.skeletonBackground,
    width: 150
  },
  navigationTabSelected: {
    color: colors.green.main,
    fontSize: '22px !important'
  },
  navigationTabLabel: {
    fontSize: 20
  }
}))

export default useStyles
