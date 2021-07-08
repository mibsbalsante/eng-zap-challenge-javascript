import 'sanitize.css'
import '@config/global.css'

import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import ApartmentsProvider from '@context/apartments'
import Home from '@page/home'
import Details from '@page/details'
import Navbar from '@comp/navbar'

const App = () => (
  <ApartmentsProvider>
    <Router>
      <Navbar />
      <Switch>
        <Route path='/imovel' component={Details} />
        <Route path='/' component={Home} />
      </Switch>
    </Router>
  </ApartmentsProvider>
)

export default App
