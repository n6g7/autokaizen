import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import { Group } from '@vx/group'
import { Point } from '@vx/point'
import { Line } from '@vx/shape'
import { scaleBand, scaleLinear } from '@vx/scale'
import moment from 'moment'
import styled from 'styled-components'

import theme from '@theme'
import Item from './Item'
import axis from './axis'

const { AxisBottom, AxisLeft } = axis

const Svg = styled.svg`
  @page {
    size: A4 landscape;
  }

  @media print {
    -webkit-print-color-adjust: exact;
    height: 95%;
    margin: 0 !important;
    padding: 0 !important;

    text:not(.standard),
    .vx-line {
      fill: black;
    }

    #currentSprint {
      display: none;
    }
  }
`

class GenericScore extends PureComponent {
  static propTypes = {
    axisColour: PropTypes.string.isRequired,
    cellPadding: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
    datumProps: PropTypes.func.isRequired,
    height: PropTypes.number.isRequired,
    lastX: PropTypes.number,
    margin: PropTypes.shape({
      bottom: PropTypes.number,
      left: PropTypes.number,
      right: PropTypes.number,
      top: PropTypes.number,
    }).isRequired,
    maxColumns: PropTypes.number.isRequired,
    sprints: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    standard: PropTypes.number,
    style: PropTypes.oneOf(['count', 'pct']).isRequired,
    x: PropTypes.func.isRequired,
    xLabel: PropTypes.string.isRequired,
    y: PropTypes.func.isRequired,
    yLabel: PropTypes.string.isRequired,
  }

  static defaultProps = {
    axisColour: 'rgba(255, 255, 255, 0.5)',
    cellPadding: 2,
    height: 480,
    margin: {
      bottom: 60,
      left: 55,
      right: 10,
      top: 10,
    },
    maxColumns: 20,
  }

  state = {
    maxX: null,
    printing: false,
    width: 800,
  }

  updateDimensions() {
    this.setState({
      width: this.svg.clientWidth,
    })
  }

  preparePrint() {
    this.setState(state =>
      state.printing
        ? state
        : {
            height: 650,
            maxX: this.getMaxX() + 3,
            printing: true,
            width: 1050,
            prevState: state,
          },
    )
  }

  clearPrint() {
    this.setState(state => state.prevState)
  }

  componentWillMount() {
    this.setState({
      height: this.props.height,
    })
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions.bind(this))
    window.onbeforeprint = this.preparePrint.bind(this)
    window.onafterprint = this.clearPrint.bind(this)
    this.updateDimensions()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this))
  }

  getMaxX() {
    const { data, lastX, x } = this.props
    const { maxX } = this.state
    return maxX || (lastX || d3.max(data, x)) + 1
  }

  render() {
    const {
      axisColour,
      cellPadding,
      data,
      datumProps,
      lastX,
      margin,
      maxColumns,
      sprints,
      standard,
      style,
      x,
      xLabel,
      y,
      yLabel,
      ...props
    } = this.props
    const { height, width } = this.state

    const xMax = width - margin.left - margin.right
    const yMax = height - margin.top - margin.bottom

    const xDomainMax = this.getMaxX()
    const xDomainMin = Math.max(xDomainMax - maxColumns, 1)
    const xScale = scaleBand({
      rangeRound: [0, xMax],
      domain: d3.range(xDomainMin, xDomainMax),
    })

    const maxYDomain = d3.max(data, y) + (style === 'count' ? 1 : 0.1)
    const yScale = scaleLinear({
      range: [yMax, 0],
      domain: [0, maxYDomain],
    })

    const tickFormat = d3.format(style === 'count' ? 'd' : '.0%')

    return (
      <Svg
        height={height}
        ref={ref => {
          this.svg = ref
        }}
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
          numTicks={style === 'count' ? maxYDomain : Math.floor(maxYDomain / 0.1)}
          tickFormat={tickFormat}
        />

        <Group top={margin.top} left={margin.left}>
          <Group>
            {data
              .filter(datum => datum.sprint >= xDomainMin)
              .map(datum => (
                <Item
                  key={datum.key}
                  x={xScale(x(datum)) + cellPadding || 0}
                  y={yScale(y(datum))}
                  width={xScale.bandwidth() - 2 * cellPadding}
                  height={yScale(0) - yScale(datum.value) - cellPadding}
                  {...datumProps(datum)}
                />
              ))}
          </Group>

          <Group>
            {d3.range(xDomainMin, xDomainMax).map(n => (
              <text
                key={n}
                fill="rgba(255, 255, 255, 0.5)"
                fontFamily="Source Sans Pro"
                fontSize="11"
                textAnchor="middle"
                x={xScale(n) + xScale.bandwidth() / 2}
                y={yScale(0) + 32}
              >
                {sprints[n] ? moment(sprints[n].start).format('DD/MM') : ''}
              </text>
            ))}
          </Group>

          <Group>
            {sprints.map((sprint, i) => (
              <text
                key={i}
                fill="rgba(255, 255, 255, 0.7)"
                fontFamily="Source Sans Pro"
                fontSize="20"
                textAnchor="middle"
                x={xScale(i) + xScale.bandwidth() / 2}
                y={yScale(sprint.score) - 24}
              >
                {tickFormat(sprint.score)}
              </text>
            ))}
          </Group>

          {standard && (
            <Group>
              <Line
                from={
                  new Point({
                    x: xScale(xDomainMin),
                    y: yScale(standard),
                  })
                }
                to={
                  new Point({
                    x: xScale(xDomainMax - 1) + xScale.bandwidth(),
                    y: yScale(standard),
                  })
                }
                stroke={theme.colours.standard}
                strokeWidth={2}
              />
              <text
                fill={theme.colours.standard}
                fontFamily="Source Sans Pro"
                fontSize="14"
                textAnchor="end"
                className="standard"
                x={xScale(xDomainMin) - 8}
                y={yScale(standard) + 4}
              >
                {tickFormat(standard)}
              </text>
            </Group>
          )}
        </Group>
      </Svg>
    )
  }
}

export default GenericScore
