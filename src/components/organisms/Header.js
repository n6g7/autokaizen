import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Select } from '@atoms'

import { login, logout } from '@actions/auth'
import { selectProject } from '@actions/projects'

class Header extends PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    projects: PropTypes.object.isRequired,
    selectProject: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    this.onChangeProject = this.onChangeProject.bind(this)
  }

  onChangeProject (event) {
    const { value } = event.target

    if (value) this.props.selectProject(value)
    else this.props.history.push('/')
  }

  render () {
    const {
      login,
      loggedIn,
      logout,
      match,
      projects
    } = this.props

    const options = Object.keys(projects).map(projectId => ({
      label: projects[projectId].name,
      value: projectId
    }))

    return <header>
      <p>Auto Kaizen</p>
      <nav>
        <ul>
          <li>
            <Select
              onChange={this.onChangeProject}
              options={options}
              value={match.params.projectId || ''}
            />
          </li>
        </ul>
        <ul>
          <li>
            <Link to='/projects/add' className='btn'>Add a project</Link>
          </li>
          <li>
            { loggedIn
              ? <button onClick={logout}>Log Out</button>
              : <button onClick={login}>Log In</button>
            }
          </li>
        </ul>
      </nav>
    </header>
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
  projects: state.projects.list
})

const mapDispatchToProps = {
  login,
  logout,
  selectProject
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
