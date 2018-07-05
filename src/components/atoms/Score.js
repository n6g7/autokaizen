import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { GenericScore } from './graph'

class Score extends PureComponent {
  static propTypes = {
    currentSprint: PropTypes.number,
    defects: PropTypes.array.isRequired,
    labels: PropTypes.object.isRequired,
    sprints: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]).isRequired,
    standard: PropTypes.number,
    style: PropTypes.oneOf(['count', 'pct']).isRequired
  }

  static defaultProps = {
    style: 'count'
  }

  crunch () {
    let {
      defects,
      labels,
      sprints,
      style
    } = this.props

    const sprintCount = {}

    const newDefects = defects.map(defect => {
      const {
        cardNumber,
        labelId,
        points,
        sprint
      } = defect

      if (!sprintCount.hasOwnProperty(sprint)) sprintCount[sprint] = 0
      const y = sprintCount[sprint]
      const value = style === 'count'
        ? 1
        : points / sprints[sprint].points
      sprintCount[sprint] += value

      return {
        key: defect.id,
        label: labels[labelId],
        number: cardNumber,
        sprint,
        value,
        y
      }
    })

    sprints = Object.keys(sprints).reduce((acc, n) => {
      acc[n] = sprints[n]
      return acc
    }, [])
    const newSprints = sprints.map((sprint, i) => ({
      ...sprint,
      score: sprintCount[i]
    }))

    return {
      data: newDefects,
      sprints: newSprints
    }
  }

  render () {
    const { className, currentSprint, standard, style } = this.props
    const { data, sprints } = this.crunch()

    const x = defect => defect.sprint
    const y = defect => defect.y + defect.value

    return <GenericScore
      className={className}
      data={data}
      lastX={currentSprint}
      x={x}
      xLabel='SPRINTS'
      y={y}
      yLabel='DEFECTS'
      datumProps={defect => ({
        children: `#${defect.number}`,
        fill: defect.label ? defect.label.colour : ''
      })}
      sprints={sprints}
      standard={standard}
      style={style}
    />
  }
}

export default Score
