import React, { PureComponent } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { history } from '@redux/enhancers/middlewares'
import styled from 'styled-components'

import {
  AddProject,
  Footer,
  Header,
  Project
} from '@organisms'

const Main = styled.main`
  padding: ${p => 6 * p.theme.spacing};
`

class App extends PureComponent {
  render () {
    return <ConnectedRouter history={history}>
      <div>
        <Switch>
          <Route path='/projects/:projectId' component={Header} />
          <Route path='/' component={Header} />
        </Switch>

        <Main>
          <Switch>
            <Route path='/projects/add' component={AddProject} />
            <Route path='/projects/:projectId' component={Project} />
          </Switch>

          <Footer />
        </Main>
      </div>
    </ConnectedRouter>
  }
}

export default App
