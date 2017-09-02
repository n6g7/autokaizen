import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Label } from '@atoms'
import { Defect, ScoreFigure } from '@molecules'

class Project extends PureComponent {
  static propTypes = {
    labels: PropTypes.array.isRequired,
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

  renderMissingProject () {
    return <p>This project does not exist.</p>
  }

  render () {
    const {
      labels,
      match: { params: { projectId } }
    } = this.props
    const project = this.getProject()

    if (!project) return this.renderMissingProject()

    return <article>
      <h1>{project.name}</h1>

      <h2>Score</h2>

      { project.defects && project.labels &&
        <ScoreFigure
          defects={project.defects}
          labels={project.labels}
          projectId={projectId}
        />
      }

      <h2>Defects</h2>

      { project.defects &&
        <section className='defects'>
          <ol>
            {Object.keys(project.defects).map(defectId =>
              <li key={defectId}>
                <Defect
                  projectId={projectId}
                  defect={project.defects[defectId]}
                />
              </li>
            )}
          </ol>
        </section>
      }

      <h2>Trello labels</h2>

      { labels &&
        <section className='labels'>
          <ul>
            {labels.map(label =>
              <li key={label.id}>
                <input
                  type='checkbox'
                  id={`label-${label.id}`}
                  checked={project.labels.hasOwnProperty(label.id)}
                />
                <label htmlFor={`label-${label.id}`}>
                  <Label colour={label.color}>{label.name}</Label>
                </label>
              </li>
            )}
          </ul>
        </section>
      }
    </article>
  }
}

const mapStateToProps = state => ({
  labels: state.labels.list,
  projects: state.projects.list
})

export default connect(mapStateToProps)(Project)
