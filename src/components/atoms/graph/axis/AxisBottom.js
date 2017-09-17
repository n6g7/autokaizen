import { AxisBottom } from '@vx/axis'
import customAxis from './customAxis'

export default customAxis(
  AxisBottom,
  {
    dy: '0.25em',
    fontFamily: 'Source Sans Pro',
    fontSize: 11,
    textAnchor: 'middle'
  }
)
