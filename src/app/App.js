import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Credito from './pages/Credito'
import NotFound from './pages/NotFound'

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/solicitar-credito' exact component={Credito} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    )
}

export default App;