import 'sanitize.css'
import '@font/fontawesome-5.15.3/css/fontawesome.css'
import '@font/fontawesome-5.15.3/css/solid.css'
import '@config/global.css'

import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import withApartments from '@hoc/apartments'
import ApartmentsProvider from '@context/apartments'
import Home from '@page/home'
import Details from '@page/details'
import Navbar from '@comp/navbar'

const App = () => (
  <ApartmentsProvider>
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/imovel/:id' component={withApartments(Details)} />
        <Route exact path={['/', '/vivareal', '/zap']} component={withApartments(Home)} />
        <Redirect to='/' />
      </Switch>
    </Router>
  </ApartmentsProvider>
)

export default App
