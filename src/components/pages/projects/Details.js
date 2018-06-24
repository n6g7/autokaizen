import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { addLabel, removeLabel } from '@actions/labels'
import { DefectList, Label, List, Section, TransparentLink } from '@atoms'
import { Defect, ScoreFigure } from '@molecules'
import {
  currentSprintSelector,
  filteredDefectsSelector,
  trelloLabelsSelector,
  projectSelector
} from '@selectors'

import Template from './Template'

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

class ProjectDetails extends PureComponent {
  static propTypes = {
    addLabel: PropTypes.func.isRequired,
    currentSprint: PropTypes.number.isRequired,
    defects: PropTypes.array,
    labels: PropTypes.object,
    match: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    removeLabel: PropTypes.func.isRequired,
    sprints: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]).isRequired,
    trelloLabels: PropTypes.array.isRequired
  }

  state = {
    loading: false
  }

  componentDidCatch () {
    return {
      loading: true
    }
  }

  render () {
    const {
      addLabel,
      currentSprint,
      defects,
      labels,
      match,
      project,
      removeLabel,
      sprints,
      trelloLabels
    } = this.props
    const { loading } = this.state

    if (!project || loading) return null

    return <Template project={project}>
      { defects && labels &&
        <Section title='Score' print>
          <ScoreFigure
            currentSprint={currentSprint}
            defects={defects}
            labels={labels}
            sprints={sprints}
            standard={project.standard}
            style={project.perfStyle}
          />
        </Section>
      }

      { defects &&
        <Section title='Latest defects'>
          <DefectList>
            {[...defects].slice(-8).reverse().map(defect =>
              <li key={defect.id}>
                <TransparentLink to={`${match.url}/defects/${defect.id}`}>
                  <Defect defect={defect} />
                </TransparentLink>
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
                    ? () => removeLabel(project.id, label.id)
                    : () => addLabel(project.id, label)
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
    </Template>
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentSprint: currentSprintSelector(state),
  defects: filteredDefectsSelector(state),
  labels: state.labels.list,
  project: projectSelector(state, ownProps),
  sprints: state.sprints.list,
  trelloLabels: trelloLabelsSelector(state)
})

const mapDispatchToProps = {
  addLabel,
  removeLabel
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails)
