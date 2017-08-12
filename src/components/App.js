import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { login, logout } from '@actions/auth'

class App extends PureComponent {
  static propTypes = {
    login: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
  }

  render () {
    const { login, loggedIn, logout } = this.props

    return <main>
      <h1>Auto Kaizen</h1>

      { loggedIn
          ? <button onClick={logout}>Log Out</button>
          : <button onClick={login}>Log In</button>
      }
    </main>
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
