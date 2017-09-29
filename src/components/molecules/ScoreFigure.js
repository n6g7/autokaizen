import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { List, Score } from '@atoms'
import Category from './Category'

const Figure = styled.figure`
  align-items: flex-start;
  display: flex;
  flex-flow: column nowrap;
  margin: 0 0 ${p => 2 * p.theme.spacing} 0;

  svg {
    margin: 8*spacing 0;
    width: 100%;
  }
`

const Caption = styled.figcaption`
  width: 100%;
`

const StyledScore = styled(Score)`
  margin: ${p => 8 * p.theme.spacing} 0;
  width: 100%;
`

class ScoreFigure extends PureComponent {
  static propTypes = {
    defects: PropTypes.array.isRequired,
    labels: PropTypes.object.isRequired
  }

  render () {
    const { defects, labels, ...props } = this.props

    return <Figure>
      <Caption>
        <List>
          {Object.keys(labels).map(labelId =>
            <li key={labelId}>
              <Category labelId={labelId} />
            </li>
          )}
        </List>
      </Caption>

      <StyledScore defects={defects} labels={labels} {...props} />
    </Figure>
  }
}

export default ScoreFigure
