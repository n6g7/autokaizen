import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { history } from '@redux/enhancers/middlewares'

import { login, logout } from '@actions/auth'

import {
  AddProject,
  Header,
  Project
} from '@organisms'

class App extends PureComponent {
  static propTypes = {
    login: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
  }

  render () {
    const { login, loggedIn, logout } = this.props

    return <ConnectedRouter history={history}>
      <div>
        <Switch>
          <Route path='/projects/:projectId' component={Header} />
          <Route path='/' component={Header} />
        </Switch>

        { loggedIn
            ? <button onClick={logout}>Log Out</button>
            : <button onClick={login}>Log In</button>
        }

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

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn
})

const mapDispatchToProps = {
  login,
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
