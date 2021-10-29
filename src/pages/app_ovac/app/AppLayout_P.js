//Contexto
import { AuthContext } from '../../../auth/AuthContext'
import { types } from '../../../types/types'
//Gráfico y funcional
import React, { Component } from 'react'
import { Route, Switch, NavLink } from "react-router-dom"
import { Menu, Grid, Button, Icon} from 'semantic-ui-react'
import './AppLayout.css'

//Componentes-Vistas
import Inicio from './views/InicioView'
import Datos from './views/DatosView'
import Eventos from './views/EventosView'
import Anexos from './views/AnexosView'



export default class HomeLayout extends Component {

    static contextType = AuthContext

    constructor(props){
        super(props)
        this.state={
            activeItem:null
        }
        
        this.handleItemClick = this.handleItemClick.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }


    handleItemClick(e) { 
        const {name} = e.target; 
        this.setState({ activeItem: name });    
    }

    handleLogout(e){
        e.preventDefault()

        const {dispatch} = this.context
        dispatch({
            type: types.logout
        })
        this.props.history.replace('/login')
    }

    /*const {user} = useContext(AuthContext)
    const history = useHistory()    
    //state = { activeItem: null }
    const [state, setState] = useState({activeItem: null})        
    
    //render() {
    const { activeItem } = state
    const {dispatch} = useContext(AuthContext)    
    const handleItemClick = (e,{name}) => setState({activeItem: name});
    //Estilos
    const menuStyle = { border: 'none', borderRadius: 0, boxShadow: 0, marginBottom: '1em', backgroundColor: '#b09a5b'}
    const menuSeconds = {    marginTop: '1em',    marginLeft: '1em'}
    const handleLogout = () => {        
        dispatch({
            type: types.logout
        })
        history.replace('/login')
    }*/



    render() {
        return (
            <>
                <Grid style={{width: '100vw', height: '100vh'}}>
                    <Grid.Column computer={2} tablet={2} mobile={5}>
                        <Menu fluid vertical tabular style={{marginTop: '1em',marginLeft: '1em'}} color='brown'>
                            <Menu.Item
                                icon='home'
                                name='inicio'
                                active={this.activeItem === 'inicio'}
                                onClick={this.handleItemClick}
                                as={NavLink} to='/ovac/inicio'
                            />
                            <Menu.Item
                                icon='th list'
                                name='eventos'
                                active={this.activeItem === 'eventos'}
                                onClick={this.handleItemClick}
                                as={NavLink} to='/ovac/eventos'
                            />
                            <Menu.Item
                                icon='edit'
                                name='objetos'
                                active={this.activeItem === 'datos'}
                                onClick={this.handleItemClick}
                                as={NavLink} to='/ovac/datos'
                            />
                            <Menu.Item
                                icon='file alternate'
                                name='anexos'
                                active={this.activeItem === 'anexos'}
                                onClick={this.handleItemClick}
                                as={NavLink} to='/ovac/anexos'
                            />
                            <Menu.Item >
                                <Button inverted animated onClick={this.handleLogout} >
                                    <Button.Content visible>Salir</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='sign-out alternate' />
                                    </Button.Content>
                                </Button>
                            </Menu.Item>
                        </Menu>
                    </Grid.Column>
                    <Grid.Column computer={13} tablet={13} mobile={10}>
                        <Switch>
                            <Route exact path='/ovac/inicio' component={Inicio} />
                            <Route exact path='/ovac/datos' component={Datos} />
                            <Route exact path='/ovac/eventos' component={Eventos} />
                            <Route exact path='/ovac/anexos' component={Anexos} />
                        </Switch>
                    </Grid.Column>
                </Grid>

            </>
        )
    }

}
