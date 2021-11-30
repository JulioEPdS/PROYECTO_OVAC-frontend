import { useContext } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { AuthContext } from "../auth/AuthContext"
import PrivateRoute from "./PrivateRoute"

import AppView from '../pages/app_ovac/app/AppLayout'
import LogIn from '../pages/app_ovac/login/LoginPage'
import NotfoundPage from '../pages/NotfoundPage'
import PublicPage from "../pages/public_ovac/PublicPage"
import Inscripciones from "../pages/public_ovac/views/Inscribirse"
import Consultar from "../pages/public_ovac/views/Consultar"

export default function AppRouter() {
    const { user } = useContext(AuthContext)

    return (
        <Switch>

            <Route exact path='/'>
                <Redirect to='/home' />
            </Route>

            <Route exact path='/login' component={LogIn} />
            <PrivateRoute path='/app/' component={AppView} isAuthenticated={user.logged} />

            <Route exact path='/home' component={PublicPage} />
            <Route path='/inscripciones/' component={Inscripciones} />
            <Route path='/datos/' component={Consultar} />

            <Route path='/404' component={NotfoundPage} />


            <Route path='*'>
                <Redirect to='/404' />
            </Route>

        </Switch>
    )
}
