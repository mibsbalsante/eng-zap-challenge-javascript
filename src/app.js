import 'sanitize.css'

import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from '@page/home'
import Details from '@page/details'
import Navbar from '@comp/navbar'

const App = () => (
  <Router>
    <Navbar />
    <Switch>
      <Route path='/imovel' component={Details} />
      <Route path='/' component={Home} />
    </Switch>
  </Router>
)

export default App
