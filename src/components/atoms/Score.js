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

  getDefects () {
    const {
      defects,
      labels,
      sprints,
      style
    } = this.props

    const sprintCount = {}

    return defects.map(defect => {
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
  }

  render () {
    const { className, currentSprint, sprints, standard, style } = this.props
    const data = this.getDefects()

    const x = defect => defect.sprint
    const y = defect => defect.y + defect.value

    return <GenericScore
      className={className}
      currentX={currentSprint}
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
