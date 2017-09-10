import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Category extends PureComponent {
  static propTypes = {
    dark: PropTypes.bool.isRequired,
    labelId: PropTypes.string.isRequired,
    labels: PropTypes.object.isRequired
  }

  static defaultProps = {
    dark: false
  }

  getLabel () {
    const { labelId, labels } = this.props

    return labels[labelId]
  }

  render () {
    const {
      colour,
      name
    } = this.getLabel() || {
      colour: 'black',
      name: 'Unknown label'
    }

    const classes = `category ${this.props.dark ? 'dark' : ''}`

    return <span className={classes}>
      <span style={{ background: colour }} />
      { name }
    </span>
  }
}

const mapStateToProps = state => ({
  labels: state.labels.list
})

export default connect(mapStateToProps)(Category)
