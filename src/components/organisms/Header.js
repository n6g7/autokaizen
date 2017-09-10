import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { Button, List, Select } from '@atoms'
import { LinkButton } from '@atoms/Button'

import { login, logout } from '@actions/auth'
import { selectProject } from '@actions/projects'

const Container = styled.header`
  align-items: center;
  background: ${p => p.theme.background.light};
  display: flex;
  flex-flow: row nowrap;
  height: ${p => 7 * p.theme.spacing};
  padding: 0 ${p => 3 * p.theme.spacing};
`

const Title = styled.p`
  font-weight: 600;
  font-size: 1.25em;
  margin: 0 ${p => 2 * p.theme.spacing} 0 0;
  text-transform: uppercase;
`

const Nav = styled.nav`
  display: flex;
  flex-flow: row nowrap;
  flex-grow: 1;
  justify-content: space-between;
`

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

    return <Container>
      <Title>Auto Kaizen</Title>

      <Nav>
        <List>
          <li>
            <Select
              onChange={this.onChangeProject}
              options={options}
              value={match.params.projectId || ''}
            />
          </li>
        </List>

        <List>
          <li>
            <LinkButton to='/projects/add'>Add a project</LinkButton>
          </li>
          <li>
            { loggedIn
              ? <Button onClick={logout}>Log Out</Button>
              : <Button onClick={login}>Log In</Button>
            }
          </li>
        </List>
      </Nav>
    </Container>
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
