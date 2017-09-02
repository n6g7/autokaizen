import React, { PureComponent } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { history } from '@redux/enhancers/middlewares'

import {
  AddProject,
  Header,
  Project
} from '@organisms'

class App extends PureComponent {
  render () {
    return <ConnectedRouter history={history}>
      <div>
        <Switch>
          <Route path='/projects/:projectId' component={Header} />
          <Route path='/' component={Header} />
        </Switch>

        <main>
          <Switch>
            <Route path='/projects/add' component={AddProject} />
            <Route path='/projects/:projectId' component={Project} />
          </Switch>
        </main>
      </div>
    </ConnectedRouter>
  }
}

export default App
