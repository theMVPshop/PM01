import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
// import Cookies from 'js-cookie'

import Login from './components/Login'
import Signup from './components/Signup'
import Milestones from './components/Milestones'
import Projects from './components/Projects'

const Router = () => {
    return(
        <Switch>
            <Route exact path='/' component={Projects} />
            <Route path ='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/milestones' component={Milestones} />
        </Switch>
    )
}

export default Router