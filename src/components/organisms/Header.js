import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Select } from '@atoms'

class Header extends PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    projects: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    this.onChangeProject = this.onChangeProject.bind(this)
  }

  onChangeProject (event) {
    const { value } = event.target
    const destination = value
      ? `/projects/${value}`
      : ''
    this.props.history.push(destination)
  }

  render () {
    const { match, projects } = this.props

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
          <li>
            <Link to='/projects/add'>Add a project</Link>
          </li>
        </ul>
      </nav>
    </header>
  }
}

const mapStateToProps = state => ({
  projects: state.projects.list
})

export default connect(mapStateToProps)(Header)
