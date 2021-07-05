import 'sanitize.css'

import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from '@page/home'
import Navbar from '@comp/navbar'

const App = () => (
  <Router>
    <Navbar />
    <Switch>
      <Route path='/' component={Home} />
    </Switch>
  </Router>
)

export default App
