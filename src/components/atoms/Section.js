import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import caret from '@assets/caret.svg'

const Title = styled.h2`
  align-items: center;
  color: ${p => p.theme.text.darker};
  display: flex;
  flex-flow: row nowrap;
  font-size: 1em;
  justify-content: flex-start;
  margin: ${p => 2 * p.theme.spacing} 0;
  text-transform: uppercase;

  img {
    cursor: pointer;
    height: ${p => 2 * p.theme.spacing}px;
    margin: 0 ${p => p.theme.spacing}px;
    opacity: 0.3;
    width: ${p => 2 * p.theme.spacing}px;

    &:hover {
      opacity: 0.5;
    }
  }
`

const Caret = styled.img.attrs({
  alt: 'caret',
  src: caret
})`
  transition: .5s;
  transform: rotate(${p => p.up ? 0 : 180}deg);
`

const Content = styled.div`
  transition: 0.5s ease;
  max-height: ${p => p.collapsed ? 0 : 4000}px;
  overflow: hidden;
`

class Section extends PureComponent {
  static propTypes = {
    collapsible: PropTypes.bool.isRequired,
    children: PropTypes.node,
    title: PropTypes.string.isRequired
  }

  static defaultProps = {
    collapsible: false
  }

  state = {
    collapsed: false
  }

  toggle = () => this.setState(state => ({ collapsed: !state.collapsed }))

  render () {
    const {
      collapsible,
      children,
      title,
      ...props
    } = this.props
    const { collapsed } = this.state

    return <section {...props}>
      <Title>
        {title}
        { collapsible &&
          <Caret
            onClick={this.toggle}
            title={collapsed ? 'Expand' : 'Collapse'}
            up={collapsed}
          />
        }
      </Title>

      <Content collapsible={collapsible} collapsed={collapsed}>
        { children }
      </Content>
    </section>
  }
}

export default Section
