import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class List extends PureComponent {
  static propTypes = {
    projects: PropTypes.object.isRequired
  }

  render () {
    const { projects } = this.props

    return <nav>
      <h2>Projects</h2>
      <ul>
        { Object.keys(projects).map(projectId =>
          <li key={projectId}>
            <Link to={`/projects/${projectId}`}>{projects[projectId].name}</Link>
          </li>
        )}
      </ul>
    </nav>
  }
}

const mapStateToProps = state => ({
  projects: state.projects.list
})

export default connect(mapStateToProps)(List)
