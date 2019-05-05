import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Group } from '@vx/group'
import { Bar } from '@vx/shape'

class Item extends PureComponent {
  static propTypes = {
    children: PropTypes.string.isRequired,
    fill: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }

  render() {
    const { children, x, y, ...barProps } = this.props

    const fontSize = 18

    return (
      <Group top={y} left={x}>
        <Bar rx={2} {...barProps} />
        <text
          fill="#EDE7ED"
          fontFamily="Source Sans Pro"
          fontSize={`${fontSize}px`}
          fontWeight="600"
          textAnchor="middle"
          x={barProps.width / 2}
          y={barProps.height / 2 + fontSize / 4}
        >
          {children}
        </text>
      </Group>
    )
  }
}

export default Item
