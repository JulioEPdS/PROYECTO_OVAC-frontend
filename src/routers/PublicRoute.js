import PropTypes  from 'prop-types'
import { Redirect, Route } from 'react-router-dom'

export default function PublicRoute({ isAuthenticated,component: Component, ...rest }) {    
    return (
        <Route {...rest}
            component={(props) => (
                ( !isAuthenticated)
                    ?(<Component {...props}/>)
                    :(<Redirect to='/ovac/inicio'/>)
            )}
        />
            
        
    )
}

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
