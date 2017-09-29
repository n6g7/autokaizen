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
    font-weight: 200;
    margin: ${p => p.theme.spacing} 0 ${p => 2 * p.theme.spacing};
  }
`

const Title = styled.h3`
  color: ${p => p.theme.text.lighter};
  font-size: 1.5em;
  margin: 0 0 ${p => p.theme.spacing}px 0;
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
      <Title>
        #{defect.cardNumber}
        <Trello cardId={defect.cardId} />
      </Title>

      <p>{defect.userStory}</p>

      <Sprint number={defect.sprint} dark />
      <Category labelId={defect.labelId} dark />
    </Container>
  }
}

export default Defect
