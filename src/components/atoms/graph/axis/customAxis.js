import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const customAxis = (AxisComponent, baseTickLabelProps) =>
  class CustomAxis extends PureComponent {
    static propTypes = {
      color: PropTypes.string.isRequired
    }

    render () {
      const { color, ...props } = this.props

      const labelProps = {
        dy: '0.5em',
        fill: 'rgba(255, 255, 255, 0.8)',
        fontFamily: 'Source Sans Pro',
        fontSize: 16,
        textAnchor: 'middle'
      }
      const tickLabelProps = () => ({
        ...baseTickLabelProps,
        fill: color
      })

      return <AxisComponent
        labelProps={labelProps}
        stroke={color}
        tickLabelProps={tickLabelProps}
        tickStroke={color}
        {...props}
      />
    }
}

export default customAxis
