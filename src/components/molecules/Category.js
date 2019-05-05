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

  @media print {
    -webkit-print-color-adjust: exact;
  }
`

class Category extends PureComponent {
  static propTypes = {
    dark: PropTypes.bool.isRequired,
    filters: PropTypes.array.isRequired,
    labelId: PropTypes.string.isRequired,
    labels: PropTypes.object.isRequired,
  }

  static defaultProps = {
    dark: false,
  }

  render() {
    const { filters, labelId, labels, ...props } = this.props
    const { colour, name } = labels[labelId] || {
      colour: 'black',
      name: 'Unknown label',
    }

    const faded = filters.length !== 0 && !filters.includes(labelId)

    return (
      <LabelContainer faded={faded} {...props}>
        <ColourSquare colour={colour} />
        {name}
      </LabelContainer>
    )
  }
}

const mapStateToProps = state => ({
  filters: state.tracker.filters.labels,
  labels: state.labels.list,
})

export default connect(mapStateToProps)(Category)
