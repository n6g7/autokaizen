import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Project extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    projects: PropTypes.object.isRequired
  }

  getProject () {
    const {
      match: { params: { projectId } },
      projects
    } = this.props

    return projects[projectId]
  }

  renderCategories (project) {
    return <div>
      <h2>Categories</h2>

      { project.labels &&
        <ul>
          {Object.keys(project.labels).map(labelId => {
            const label = project.labels[labelId]

            return <li key={labelId} style={{color: label.colour}}>{label.name}</li>
          })}
        </ul>
      }
    </div>
  }

  renderDefects (project) {
    return <div>
      <h2>Defects</h2>

      { project.defects &&
        <ul>
          {Object.keys(project.defects).map(defectId => {
            const defect = project.defects[defectId]

            return <li key={defectId}>
              (#{defect.cardNumber}) {defect.userStory}
            </li>
          })}
        </ul>
      }
    </div>
  }

  render () {
    const project = this.getProject()

    if (!project) return <p>Meh</p>

    return <article>
      <h1>{project.name}</h1>

      { this.renderCategories(project) }
      { this.renderDefects(project) }
    </article>
  }
}

const mapStateToProps = state => ({
  projects: state.projects.list
})

export default connect(mapStateToProps)(Project)
