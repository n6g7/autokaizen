import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import { Group } from '@vx/group'
import { scaleBand, scaleLinear } from '@vx/scale'

import Item from './Item'
import { AxisBottom, AxisLeft } from './axis'

class GenericScore extends PureComponent {
  static propTypes = {
    axisColour: PropTypes.string.isRequired,
    cellPadding: PropTypes.number.isRequired,
    currentX: PropTypes.number,
    data: PropTypes.array.isRequired,
    datumProps: PropTypes.func.isRequired,
    height: PropTypes.number.isRequired,
    lastX: PropTypes.number,
    margin: PropTypes.shape({
      bottom: PropTypes.number,
      left: PropTypes.number,
      right: PropTypes.number,
      top: PropTypes.number
    }).isRequired,
    x: PropTypes.func.isRequired,
    xLabel: PropTypes.string.isRequired,
    y: PropTypes.func.isRequired,
    yLabel: PropTypes.string.isRequired
  }

  static defaultProps = {
    axisColour: 'rgba(255, 255, 255, 0.5)',
    cellPadding: 2,
    height: 416,
    margin: {
      bottom: 55,
      left: 55,
      right: 10,
      top: 10
    }
  }

  state = {
    width: 800
  }

  updateDimensions () {
    this.setState({
      width: this.refs.svg.clientWidth
    })
  }

  preparePrint () {
    this.setState({
      height: 650,
      width: 1050,
      prevState: this.state
    })
  }

  clearPrint () {
    this.setState(this.state.prevState)
  }

  componentWillMount () {
    this.setState({
      height: this.props.height
    })
  }

  componentDidMount () {
    window.addEventListener('resize', this.updateDimensions.bind(this))
    window.onbeforeprint = this.preparePrint.bind(this)
    window.onafterprint = this.clearPrint.bind(this)
    this.updateDimensions()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateDimensions.bind(this))
  }

  render () {
    const {
      axisColour,
      cellPadding,
      currentX,
      data,
      datumProps,
      lastX,
      margin,
      x,
      xLabel,
      y,
      yLabel,
      ...props
    } = this.props
    const { height, width } = this.state

    const xMax = width - margin.left - margin.right
    const yMax = height - margin.top - margin.bottom

    const xScale = scaleBand({
      rangeRound: [0, xMax],
      domain: d3.range(
        1,
        (lastX || d3.max(data, x)) + 1
      )
    })

    const maxYDomain = d3.max(data, y) + 1
    const yScale = scaleLinear({
      range: [yMax, 0],
      domain: [0, maxYDomain]
    })

    return <svg
      height={height}
      ref='svg'
      {...props}
    >
      <AxisBottom
        color={axisColour}
        scale={xScale}
        top={height - margin.bottom}
        left={margin.left}
        label={xLabel}
      />

      <AxisLeft
        color={axisColour}
        scale={yScale}
        top={margin.top}
        left={margin.left}
        label={yLabel}
        numTicks={maxYDomain}
        tickFormat={d3.format('d')}
      />

      { currentX &&
        <rect
          height={yScale(0) - 1}
          width={xScale.bandwidth()}
          x={margin.left + xScale(currentX)}
          y={margin.top}
          fill='#252c48'
        />
      }

      <Group>
        {data.map(datum =>
          <Item
            key={datum.key}
            x={margin.left + xScale(x(datum)) + cellPadding || 0}
            y={margin.top + yScale(y(datum))}
            width={xScale.bandwidth() - 2 * cellPadding}
            height={yScale(1) - yScale(2) - cellPadding}
            {...datumProps(datum)}
          />
        )}
      </Group>
    </svg>
  }
}

export default GenericScore
