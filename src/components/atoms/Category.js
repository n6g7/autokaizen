import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProjectLabels } from '@selectors/projects'

class Category extends PureComponent {
  static propTypes = {
    dark: PropTypes.bool.isRequired,
    labelId: PropTypes.string.isRequired,
    labels: PropTypes.object.isRequired,
    projectId: PropTypes.string.isRequired
  }

  static defaultProps = {
    dark: false
  }

  getLabel () {
    const { labelId, labels, projectId } = this.props

    return labels[projectId][labelId]
  }

  render () {
    const {
      colour,
      name
    } = this.getLabel()

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
