import React, { PureComponent } from 'react'

import config from '../../../package.json'

class Footer extends PureComponent {
  render () {
    return <footer>
      <a href='https://github.com/n6g7/autokaizen'>
        { config.name } v{ config.version }
      </a>
    </footer>
  }
}

export default Footer
