import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { push } from 'connected-react-router'

import { Button, List, Select } from '@atoms'
import { LinkButton } from '@atoms/Button'

import { login, logout } from '@actions/auth'
import { selectProject } from '@actions/projects'

import { projectSelector, projectsSelector } from '@selectors'

const Container = styled.header`
  align-items: center;
  background: ${p => p.theme.background.light};
  display: flex;
  flex-flow: row nowrap;
  height: ${p => 7 * p.theme.spacing};
  padding: 0 ${p => 3 * p.theme.spacing};

  @media print {
    display: none;
  }
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
    currentProject: PropTypes.object,
    login: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    projects: PropTypes.array.isRequired,
    push: PropTypes.func.isRequired,
    selectProject: PropTypes.func.isRequired,
  }

  onChangeProject = event => {
    const { value } = event.target

    if (value) {
      this.props.selectProject(value)
      this.props.push(`/projects/${value}`)
    } else this.props.push('/')
  }

  render() {
    const { currentProject, login, loggedIn, logout, projects } = this.props

    const options = projects
      .map(project => ({
        label: project.client ? `${project.client} / ${project.name}` : project.name,
        value: project.id,
      }))
      .sort((a, b) => (a.label > b.label ? 1 : a.label < b.label ? -1 : 0))

    return (
      <Container>
        <Title>Auto Kaizen</Title>

        <Nav>
          <List>
            <li>
              <Select
                onChange={this.onChangeProject}
                options={options}
                value={currentProject ? currentProject.id : ''}
              />
            </li>
          </List>

          <List>
            <li>
              <LinkButton to="/projects/add">Add a project</LinkButton>
            </li>
            <li>
              {loggedIn ? (
                <Button onClick={logout}>Log Out</Button>
              ) : (
                <Button onClick={login}>Log In</Button>
              )}
            </li>
          </List>
        </Nav>
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentProject: projectSelector(state, ownProps),
  loggedIn: state.auth.loggedIn,
  projects: projectsSelector(state),
})

const mapDispatchToProps = {
  login,
  logout,
  push,
  selectProject,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header)
