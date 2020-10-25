import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import CreateTokenModalComponent from '@components/Modals/CreateTokenModal/CreateTokenModal'
import modalsSelectors from '@selectors/modals'
import { actions } from '@reducers/modals'

export const CreateTokenModal: React.FC = () => {
  const dispatch = useDispatch()
  const createToken = useSelector(modalsSelectors.createToken)
  return (
    <CreateTokenModalComponent
      onSend={(freezeAuthority, decimals) => {
        dispatch(actions.createToken({ freezeAuthority, decimals }))
      }}
      open={createToken.open}
      loading={createToken.sending}
      address={createToken.tokenAddress}
      handleClose={() => {
        dispatch(actions.closeModal('createToken'))
        setTimeout(() => {
          dispatch(actions.resetModal('createToken'))
        }, 300)
      }}
    />
  )
}

export default CreateTokenModal
