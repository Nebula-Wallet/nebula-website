import React from 'react'
import { storiesOf } from '@storybook/react'
import Account from './Account'
import { withKnobs } from '@storybook/addon-knobs'
storiesOf('buttons/CommonButton', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Account
      balance={12432352533}
      address='Ftp4xgTu55MDP1tLjhrSLHvCmTMkVj48dxnCzPUCL4yQ'
      onSend={() => {
        console.log('account send')
      }}
    />
  ))
