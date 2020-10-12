import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import styled from 'styled-components'

import Home from './pages/Home/index'

import { HOME } from './constants/routes'

const AppContainer = styled.div`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #fafafa;
    font-family: -apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial,
      sans-serif;
    -webkit-font-smoothing: antialised !important;
  }

  a {
    text-decoration: none;
    outline: 0;
  }

  display: flex;
`

const App = () => {
  return (
    <BrowserRouter>
      <AppContainer>
        <Navbar />
        <Sidebar />
        <Switch>
          <Route component={Home} exact path={HOME} />
        </Switch>
      </AppContainer>
    </BrowserRouter>
  )
}

export default App
