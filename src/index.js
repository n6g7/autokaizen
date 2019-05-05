import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider, createGlobalStyle } from 'styled-components'

import '@services/print'

import store from './redux/store'

import App from './components/App'

import theme from '@theme'

const GlobalStyle = createGlobalStyle`
  body {
    background: ${theme.background.base};
    box-sizing: border-box;
    color: ${theme.text.lighter};
    font-family: 'Source Sans Pro', sans-serif;
    font-size: ${2 * theme.spacing};
    font-weight: 400;
    margin: 0;
    padding: 0;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }
`

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <App />
      </>
    </ThemeProvider>
  </Provider>,
  document.getElementById('app'),
)
