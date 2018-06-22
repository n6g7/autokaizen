import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { Button, Label, List, PageHeader, Section, Title } from '@atoms'
import { Defect, ScoreFigure } from '@molecules'
import {
  currentSprintSelector,
  filteredDefectsSelector,
  trelloLabelsSelector
} from '@selectors'

import { addLabel, removeLabel } from '@actions/labels'
import { followBoard } from '@actions/notifications'

const DefectList = styled(List.ordered)`
  align-items: flex-start;
  flex-flow: row wrap;

  li {
    flex-grow: 1;
    margin-bottom: ${p => 2 * p.theme.spacing}px;
    max-width: calc(25% - ${p => 2 * p.theme.spacing}px);
    width: 20%;
  }
`

const LabelList = styled(List)`
  flex-flow: row wrap;

  li {
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    flex-grow: 1;
    margin: ${p => p.theme.spacing / 4}px 0;
    width: 20%;

    &:nth-child(4n) {
      margin-right: 0;
    }

    input {
      margin-right: ${p => p.theme.spacing}px;
    }
  }
`

class Project extends PureComponent {
  static propTypes = {
    addLabel: PropTypes.func.isRequired,
    currentSprint: PropTypes.number.isRequired,
    defects: PropTypes.array,
    followBoard: PropTypes.func.isRequired,
    labels: PropTypes.object,
    match: PropTypes.object.isRequired,
    projects: PropTypes.object.isRequired,
    removeLabel: PropTypes.func.isRequired,
    sprints: PropTypes.object,
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
      currentSprint,
      defects,
      followBoard,
      labels,
      match: { params: { projectId } },
      removeLabel,
      sprints,
      trelloLabels
    } = this.props
    const project = this.getProject()

    if (!project) return this.renderMissingProject()

    return <article>
      <PageHeader>
        <Title pre={project.client}>{project.name}</Title>
        <Button onClick={() => followBoard(projectId)} small>Follow</Button>
      </PageHeader>

      { defects && labels &&
        <Section title='Score'>
          <ScoreFigure
            currentSprint={currentSprint}
            defects={defects}
            labels={labels}
            sprints={sprints}
            style={project.perfStyle}
          />
        </Section>
      }

      { defects &&
        <Section title='Defects'>
          <DefectList>
            {[...defects].reverse().map(defect =>
              <li key={defect.id}>
                <Defect defect={defect} />
              </li>
            )}
          </DefectList>
        </Section>
      }

      { trelloLabels &&
        <Section title='Trello labels' collapsible>
          <LabelList>
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
          </LabelList>
        </Section>
      }
    </article>
  }
}

const mapStateToProps = state => ({
  currentSprint: currentSprintSelector(state),
  defects: filteredDefectsSelector(state),
  labels: state.labels.list,
  projects: state.projects.list,
  sprints: state.sprints.list,
  trelloLabels: trelloLabelsSelector(state)
})

const mapDispatchToProps = {
  addLabel,
  followBoard,
  removeLabel
}

export default connect(mapStateToProps, mapDispatchToProps)(Project)
