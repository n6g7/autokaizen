import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import _isNumber from 'lodash/isNumber'

import { Points, TicketNumber, TrelloLink } from '@atoms'
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
        { _isNumber(defect.points) && <Points>{ defect.points }</Points> }
        { defect.userStory }
      </p>

      <Sprint number={defect.sprint} dark />
      <Category labelId={defect.labelId} dark />
    </Container>
  }
}

export default Defect
