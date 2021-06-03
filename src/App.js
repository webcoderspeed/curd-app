import React from 'react'
import Navbar from './Navbar'
import Home from './Home'
import CreateUser from './CreateUser'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom' 
import UserDetails from './UserDetails'

const App = () => {  
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/create' component={CreateUser} />
          <Route path='/user/:id'  component={UserDetails} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
