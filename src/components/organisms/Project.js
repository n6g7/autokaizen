import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Label } from '@atoms'
import { Defect, ScoreFigure } from '@molecules'

import { addLabel, removeLabel } from '@actions/labels'

class Project extends PureComponent {
  static propTypes = {
    addLabel: PropTypes.func.isRequired,
    defects: PropTypes.object,
    labels: PropTypes.object,
    match: PropTypes.object.isRequired,
    projects: PropTypes.object.isRequired,
    removeLabel: PropTypes.func.isRequired,
    trelloLabels: PropTypes.array.isRequired
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
      addLabel,
      defects,
      labels,
      match: { params: { projectId } },
      removeLabel,
      trelloLabels
    } = this.props
    const project = this.getProject()

    if (!project) return this.renderMissingProject()

    return <article>
      <h1>{project.name}</h1>

      <h2>Score</h2>

      { defects && labels &&
        <ScoreFigure
          currentSprint={project.currentSprint}
          defects={defects}
          labels={labels}
        />
      }

      <h2>Defects</h2>

      { defects &&
        <section className='defects'>
          <ol>
            {Object.keys(defects).map(defectId =>
              <li key={defectId}>
                <Defect
                  defect={defects[defectId]}
                />
              </li>
            )}
          </ol>
        </section>
      }

      <h2>Trello labels</h2>

      { trelloLabels &&
        <section className='labels'>
          <ul>
            {trelloLabels.map(label => {
              const id = `label-${label.id}`
              const checked = labels && labels.hasOwnProperty(label.id)

              return <li key={label.id}>
                <input
                  type='checkbox'
                  id={id}
                  checked={checked}
                  onChange={checked
                    ? () => removeLabel(projectId, label.id)
                    : () => addLabel(projectId, label)
                  }
                  />
                <label htmlFor={id}>
                  <Label colour={label.color}>{label.name}</Label>
                </label>
              </li>
            })}
          </ul>
        </section>
      }
    </article>
  }
}

const mapStateToProps = state => ({
  defects: state.defects.list,
  labels: state.labels.list,
  projects: state.projects.list,
  trelloLabels: state.labels.trello
})

const mapDispatchToProps = {
  addLabel,
  removeLabel
}

export default connect(mapStateToProps, mapDispatchToProps)(Project)
