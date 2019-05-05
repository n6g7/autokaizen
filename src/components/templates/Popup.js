import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { goBack } from 'connected-react-router'

const Backdrop = styled.aside`
  align-items: center;
  background: rgba(0, 0, 0, 0.64);
  bottom: 0;
  display: flex;
  flex-flow: column nowrap;
  left: 0;
  overflow-y: scroll;
  padding: ${p => 14 * p.theme.spacing}px 0;
  position: fixed;
  right: 0;
  top: 0;

  @page {
    size: A5 portrait;
  }

  @media print {
    font-size: 0.9em;
    padding: 0;
  }
`

const Container = styled.section`
  background: ${p => p.theme.background.light};
  border-radius: 2px;
  width: ${p => 73 * p.theme.spacing}px;

  @media print {
    color: black;
    width: 100%;
  }
`

const Main = styled.main`
  padding: ${p => 6 * p.theme.spacing}px ${p => 6 * p.theme.spacing}px
    ${p => 5 * p.theme.spacing}px;

  @media print {
    padding: 0;
  }
`

const Footer = styled.footer`
  background: ${p => p.theme.background.base};
  padding: ${p => 5 * p.theme.spacing}px ${p => 6 * p.theme.spacing}px
    ${p => 6 * p.theme.spacing}px;

  @media print {
    border-top: 1px dashed black;
    padding: 0;
  }
`

class Popup extends PureComponent {
  static propTypes = {
    footer: PropTypes.any.isRequired,
    goBack: PropTypes.func.isRequired,
    main: PropTypes.any.isRequired,
  }

  stop = event => event.stopPropagation()

  render() {
    const { footer, goBack, main } = this.props

    return (
      <Backdrop onClick={goBack}>
        <Container onClick={this.stop}>
          <Main>{main}</Main>
          <Footer>{footer}</Footer>
        </Container>
      </Backdrop>
    )
  }
}

const mapDispatchToProps = {
  goBack,
}

export default connect(
  null,
  mapDispatchToProps,
)(Popup)
