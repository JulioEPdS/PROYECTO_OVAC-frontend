import { useContext, Suspense, lazy } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { AuthContext } from "../auth/AuthContext"
import PrivateRoute from "./PrivateRoute"

const AppView = lazy(() => import('../pages/app_ovac/app/AppLayout'))
const LogIn = lazy(() => import('../pages/app_ovac/login/LoginPage'))
const NotfoundPage = lazy(() => import('../pages/NotfoundPage'))
const PublicPage = lazy(() => import("../pages/public_ovac/PublicPage"))
const Inscripciones = lazy(() => import("../pages/public_ovac/views/Inscribirse"))
const Consultar = lazy(() => import('../pages/public_ovac/views/Consultar'))

export default function AppRouter() {
    const { user } = useContext(AuthContext)

    return (
        <Suspense fallback={
            <div
                style={{
                    marginTop: '50vh',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: '50vw',
                    color: '#2f2e41',
                    fontSize: '4rem'
                }}
            >
                Cargando...
            </div>}>

            <Switch>

                <Route exact path='/'>
                    <Redirect to='/login' />
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
        </Suspense>
    )
}
