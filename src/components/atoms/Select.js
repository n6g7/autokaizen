import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Select extends PureComponent {
  static propTypes = {
    emptyValue: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired
  }

  static defaultProps = {
    emptyValue: '-----'
  }

  render () {
    const {
      emptyValue,
      onChange,
      options,
      value,
      ...props
    } = this.props

    return <select
      onChange={onChange}
      value={value}
      {...props}
    >
      { emptyValue && <option value=''>{ emptyValue }</option> }
      { options.map(option =>
        <option
          key={option.value}
          value={option.value}
        >
          { option.label }
        </option>
      )}
    </select>
  }
}

export default Select
