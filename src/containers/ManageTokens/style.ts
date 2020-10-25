import { makeStyles, createStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() =>
  createStyles({
    contentContainer: {
      width: '100%'
    },
    contentWrapper: {
      maxWidth: 1160,
      padding: 16
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
    selectedTokenDiv: {
      width: '100%',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: `${colors.green.main}`
      },
      '&.MuiSelect-iconOutlined': {
        color: colors.green.main
      }
    },
    selectLabel: {
      color: colors.green.main
    },
    iconSelect: {
      color: colors.green.main
    },
    tokenInfo: {
      marginTop: 32
    },
    createTokenButton: {
      color: colors.red.neon,
      borderColor: colors.red.neon,
      '&:hover': {
        borderWidth: 2,
        backgroundColor: `${colors.red.neon}`,
        borderColor: colors.red.neon
      }
    }
  })
)
export default useStyles
