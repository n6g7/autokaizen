import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { TicketNumber, TrelloLink } from '@atoms'
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

    return <Container>
      <TicketNumber>
        {defect.cardNumber}
        <Trello cardId={defect.cardId} />
      </TicketNumber>

      <p>
        { defect.points && <Points>{ defect.points }</Points> }
        { defect.userStory }
      </p>

      <Sprint number={defect.sprint} dark />
      <Category labelId={defect.labelId} dark />
    </Container>
  }
}

export default Defect
