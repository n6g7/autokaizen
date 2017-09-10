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

  h1 {
    color: ${p => p.theme.text.lighter};
    font-size: ${p => 6 * p.theme.spacing};
    font-weight: 600;
    margin: 0 0 ${p => 3 * p.theme.spacing};
  }

  h2 {
    color: ${p => p.theme.text.darker};
    font-size: 1em;
    margin: ${p => 2 * p.theme.spacing} 0;
    text-transform: uppercase;
  }

  h3 {
    color: ${p => p.theme.text.lighter};
    font-size: 1.5em;
    margin: 0 0 ${p => p.theme.spacing} 0;
  }
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
