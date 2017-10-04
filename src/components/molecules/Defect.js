import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { TrelloLink } from '@atoms'
import Category from './Category'
import Sprint from './Sprint'

const Container = styled.article`
  background: ${p => p.theme.background.light};
  border-radius: ${p => p.theme.spacing / 4}px;
  padding: ${p => 2 * p.theme.spacing};
  position: relative;

  p {
    margin: ${p => p.theme.spacing} 0 ${p => 2 * p.theme.spacing};
  }
`

const Title = styled.h3`
  color: ${p => p.theme.text.lighter};
  font-size: 1.5em;
  margin: 0 0 ${p => p.theme.spacing}px 0;

  &::before {
    content: '#';
    font-size: 0.9em;
    margin-right: 1px;
    opacity: 0.7;
  }
`

const Trello = styled(TrelloLink)`
  margin-left: ${p => p.theme.spacing};
`

const Points = styled.span`
  background: white;
  border-radius: ${p => p.theme.spacing / 4}px;
  color: ${p => p.theme.background.base};
  font-weight: bolder;
  margin-right: ${p => p.theme.spacing / 2}px;
  opacity: 0.3;
  padding: 0 ${p => p.theme.spacing / 2}px;
`

class Defect extends PureComponent {
  static propTypes = {
    defect: PropTypes.object.isRequired
  }

  render () {
    const { defect } = this.props

    const match = /^\s*\((\d+)\)\s*(.+)$/.exec(defect.userStory)
    const userStory = match ? match[2] : defect.userStory
    const points = match ? match[1] : null

    return <Container>
      <Title>
        {defect.cardNumber}
        <Trello cardId={defect.cardId} />
      </Title>

      <p>
        { points && <Points>{ points }</Points> }
        {userStory}
      </p>

      <Sprint number={defect.sprint} dark />
      <Category labelId={defect.labelId} dark />
    </Container>
  }
}

export default Defect
