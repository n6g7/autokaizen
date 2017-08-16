import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

class Score extends PureComponent {
  static propTypes = {
    defects: PropTypes.object.isRequired,
    height: PropTypes.number.isRequired,
    labels: PropTypes.object.isRequired,
    margin: PropTypes.shape({
      bottom: PropTypes.number,
      left: PropTypes.number,
      right: PropTypes.number,
      top: PropTypes.number
    }).isRequired,
    width: PropTypes.number.isRequired
  }

  static defaultProps = {
    height: 300,
    margin: {
      bottom: 35,
      left: 50,
      right: 10,
      top: 10
    },
    width: 900
  }

  getDefects () {
    const {
      defects,
      labels
    } = this.props

    return Object.keys(defects).map(defectId => ({
      label: labels[defects[defectId].labelId],
      number: defects[defectId].cardNumber,
      sprint: defects[defectId].sprint
    }))
  }

  componentDidMount () {
    const {
      height,
      margin,
      width
    } = this.props

    const defects = this.getDefects()

    const x = d3.scaleBand()
      .domain(d3.range(1, d3.max(defects, d => d.sprint) + 2))
      .rangeRound([margin.left, width - margin.right])
      .padding(0.05)

    const y = d3.scaleLinear()
      .domain([0, 5])
      .rangeRound([height - margin.bottom, margin.top])

    const svg = d3.select('svg')

    svg.append('g')
      .attr('transform', 'translate(0,' + y(0) + ')')
      .call(d3.axisBottom(x))
    svg.append('text')
      .text('Sprints')
      .attr('x', margin.left + (width - margin.left - margin.right) / 2)
      .attr('y', height - 5)
      .attr('text-anchor', 'middle')

    svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',0)')
      .call(d3.axisLeft(y))
    svg.append('text')
        .text('Defects')
        .attr('x', -margin.top - (height - margin.top - margin.bottom) / 2)
        .attr('y', 15)
        .attr('text-anchor', 'middle')
        .attr('transform', 'rotate(-90)')

    const groupEnter = svg.append('g')
      .attr('font-family', 'sans-serif')
      .selectAll('g')
      .data(defects)
      .enter().append('g')

    const getYIndex = defect => {
      const index = defects
        .filter(d => defect.sprint === d.sprint)
        .findIndex(d => defect === d)

      return index + 1
    }

    groupEnter.append('rect')
      .attr('width', x.bandwidth)
      .attr('height', y(0) - y(1))
      .attr('x', d => x(d.sprint))
      .attr('y', d => y(getYIndex(d)))
      .attr('fill', d => d.label.colour)
    groupEnter.append('text')
      .text(d => `#${d.number}`)
      .attr('text-anchor', 'middle')
      .attr('x', d => x(d.sprint) + x.bandwidth() / 2)
      .attr('y', d => {
        const index = getYIndex(d)
        const start = y(index)
        const end = y(index - 1)

        return start + (end - start) / 2 + 5
      })
  }

  render () {
    const { height, width } = this.props

    return <svg height={height} width={width} />
  }
}

export default Score
