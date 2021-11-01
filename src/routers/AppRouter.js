import { useContext } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { AuthContext } from "../auth/AuthContext"
import PrivateRoute from "./PrivateRoute"
import PublicRoute from "./PublicRoute"

import AppView from '../pages/app_ovac/app/AppLayout'
import LogIn from '../pages/app_ovac/login/LoginPage'
import NotfoundPage from '../pages/NotfoundPage'

export default function AppRouter() {
    const {user} = useContext(AuthContext)

    return (        
            <Switch>
                <Route exact path='/'>
                    <Redirect to='/login'/>
                </Route>
                <PublicRoute exact path='/login' component={LogIn} isAuthenticated={user.logged}/>
                <PrivateRoute path='/ovac/' component={AppView} isAuthenticated={user.logged}/>                

                <Route path='/404' component={NotfoundPage} />
                
                <Route path='*'>
                    <Redirect to='/404'/>
                </Route>
                
            </Switch>        
    )
}
