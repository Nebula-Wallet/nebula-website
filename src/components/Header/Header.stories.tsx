import React from 'react'
import { storiesOf } from '@storybook/react'
import Header, { Tabs } from './Header'
import { withKnobs } from '@storybook/addon-knobs'

storiesOf('Containers/Header', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const [tab, setTab] = React.useState(Tabs.Wallet)
    return (
      <Header
        onClickLogo={() => {}}
        onConnectWallet={() => {}}
        currentNavigation={tab}
        onNavigationChange={setTab}
      />
    )
  })
  .add('connected', () => {
    const [tab, setTab] = React.useState(Tabs.Wallet)
    return (
      <Header
        onClickLogo={() => {}}
        onConnectWallet={() => {}}
        currentNavigation={tab}
        onNavigationChange={setTab}
        address='123'
      />
    )
  })
