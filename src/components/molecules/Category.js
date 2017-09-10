import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { LabelContainer } from '@atoms'

const ColourSquare = styled.span`
  background: ${p => p.colour};
  border-radius: 2px;
  display: inline-block;
  margin-right: ${p => p.theme.spacing};
  height: ${p => 2 * p.theme.spacing};
  width: ${p => 2 * p.theme.spacing};
`

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

    return <LabelContainer dark={this.props.dark}>
      <ColourSquare colour={colour} />
      { name }
    </LabelContainer>
  }
}

const mapStateToProps = state => ({
  labels: state.labels.list
})

export default connect(mapStateToProps)(Category)
