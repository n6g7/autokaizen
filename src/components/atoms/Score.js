import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { GenericScore } from './graph'

class Score extends PureComponent {
  static propTypes = {
    currentSprint: PropTypes.number,
    defects: PropTypes.array.isRequired,
    labels: PropTypes.object.isRequired,
    sprints: PropTypes.object.isRequired
  }

  getDefects () {
    const {
      defects,
      labels
    } = this.props

    const sprintCount = {}

    return defects.reverse().map(defect => {
      const {
        cardNumber,
        labelId,
        sprint
      } = defect

      if (!sprintCount.hasOwnProperty(sprint)) sprintCount[sprint] = 0

      return {
        key: defect.id,
        label: labels[labelId],
        number: cardNumber,
        sprint,
        y: ++sprintCount[sprint]
      }
    })
  }

  render () {
    const { className, currentSprint, sprints } = this.props
    const data = this.getDefects()

    const x = defect => defect.sprint
    const y = defect => defect.y

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
    />
  }
}

export default Score
