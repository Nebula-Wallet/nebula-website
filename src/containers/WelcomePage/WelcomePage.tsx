import React from 'react'
import Grid from '@material-ui/core/Grid'
import InfoBar from '@components/InfoBar/InfoBar'
import { useSelector, useDispatch } from 'react-redux'
import providerSelectors from '@selectors/providers'
import solanaConnectionSelector from '@selectors/solanaConnection'
import { actions as providerActions } from '@reducers/provider'
import { actions as solanaConnectionActions } from '@reducers/solanaConnection'
import EventsHandlers from '@containers/EventsHandlers'
import { Status } from '@reducers/signer'
import PageSkeleton from '@components/PageSkeleton/PageSkeleton'
// import Header from '@containers/HeaderWrapper/HeaderWrapper'
import useStyles from './style'
import AccountWrapper from '@containers/Account/Account'
import Tokens from '@containers/Tokens/Tokens'

const WelcomePage: React.FC = () => {
  const classes = useStyles()
  const initialized = useSelector(providerSelectors.status)
  const message = useSelector(providerSelectors.message)
  const signerStatus = useSelector(solanaConnectionSelector.status)
  const dispatch = useDispatch()
  React.useEffect(() => {
    // dispatch(providerActions.initProvider())
    dispatch(solanaConnectionActions.initSolanaConnection())
  }, [dispatch])

  return (
    <Grid container direction='column' className={classes.background}>
      <Grid item>
        <InfoBar message={message} initialized={initialized} />
      </Grid>
      <Grid item className={classes.spacing40}>
        {/* <Header /> */}
      </Grid>
      <Grid item>
        <Grid container className={classes.contentContainer} justify='center'>
          <Grid item xs={12} className={classes.contentWrapper}>
            {signerStatus === Status.Initalized ? (
              <>
                <AccountWrapper></AccountWrapper>
                <Tokens />
              </>
            ) : (
              <PageSkeleton />
            )}
          </Grid>
        </Grid>
      </Grid>
      {signerStatus === Status.Initalized && <EventsHandlers />}
    </Grid>
  )
}

export default WelcomePage
