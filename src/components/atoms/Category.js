import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProjectLabels } from '@selectors/projects'

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
  labels: getProjectLabels(state)
})

export default connect(mapStateToProps)(Category)
