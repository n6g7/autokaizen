import { AxisLeft } from '@vx/axis'
import customAxis from './customAxis'

export default customAxis(
  AxisLeft,
  {
    dx: '-0.25em',
    dy: '0.25em',
    fontFamily: 'Source Sans Pro',
    fontSize: 11,
    textAnchor: 'end'
  }
)
