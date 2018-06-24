import React, { PureComponent } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { history } from '@redux/enhancers/middlewares'
import styled from 'styled-components'

import {
  Footer,
  Header
} from '@organisms'
import { Projects } from '@pages'

const Main = styled.main`
  padding: ${p => 6 * p.theme.spacing};

  @media print {
    margin: 0;
    padding: 0;
  }
`

class App extends PureComponent {
  render () {
    return <ConnectedRouter history={history}>
      <div>
        <Route component={Header} />

        <Main>
          <Switch>
            <Route path='/projects' component={Projects} />
          </Switch>

          <Footer />
        </Main>
      </div>
    </ConnectedRouter>
  }
}

export default App
