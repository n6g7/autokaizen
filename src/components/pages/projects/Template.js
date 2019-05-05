import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { followBoard } from '@actions/notifications'
import { Button, PageHeader, Title } from '@atoms'

class ProjectTemplate extends PureComponent {
  static propTypes = {
    children: PropTypes.any.isRequired,
    followBoard: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
  }

  renderMissingProject() {
    return <p>This project does not exist.</p>
  }

  follow = () => {
    const { followBoard, project } = this.props
    followBoard(project.id)
  }

  render() {
    const { children, project } = this.props

    if (!project) return this.renderMissingProject()

    return (
      <article>
        <PageHeader>
          <Title pre={project.client} to={`/projects/${project.id}`}>
            {project.name}
          </Title>
          <Link to={`/projects/${project.id}/defects`}>
            <Button small>Defects</Button>
          </Link>
          <Button onClick={this.follow} small>
            Follow
          </Button>
        </PageHeader>

        {children}
      </article>
    )
  }
}

const mapDispatchToProps = { followBoard }

export default connect(
  null,
  mapDispatchToProps,
)(ProjectTemplate)
