import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Defect, ScoreFigure } from '@molecules'

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

  render () {
    const { match: { params: { projectId } } } = this.props
    const project = this.getProject()

    if (!project) return <p>Meh</p>

    return <article>
      <h1>{project.name}</h1>

      <h2>Legend</h2>

      <ScoreFigure
        defects={project.defects}
        labels={project.labels}
        projectId={projectId}
      />

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
    </article>
  }
}

const mapStateToProps = state => ({
  projects: state.projects.list
})

export default connect(mapStateToProps)(Project)
