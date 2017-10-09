import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { Button, Label, List, Section } from '@atoms'
import { Defect, ScoreFigure } from '@molecules'
import {
  currentSprintSelector,
  filteredDefectsSelector,
  trelloLabelsSelector
} from '@selectors'

import { addLabel, removeLabel } from '@actions/labels'
import { followBoard } from '@actions/notifications'

const Title = styled.h1`
  align-items: center;
  color: ${p => p.theme.text.lighter};
  display: flex;
  flex-flow: row nowrap;
  font-size: ${p => 6 * p.theme.spacing}px;
  font-weight: 600;
  margin: 0 0 ${p => 3 * p.theme.spacing}px;

  ${Button} {
    margin-left: ${p => 2 * p.theme.spacing}px;
  }
`

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
    sprints: PropTypes.object.isRequired,
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
      <Title>
        {project.name}
        <Button onClick={() => followBoard(projectId)} small>Follow</Button>
      </Title>

      { defects && labels &&
        <Section title='Score'>
          <ScoreFigure
            currentSprint={currentSprint}
            defects={defects}
            labels={labels}
            sprints={sprints}
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
