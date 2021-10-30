//Contexto
import { AuthContext } from '../../../auth/AuthContext'
import { types } from '../../../types/types'
//Gráfico y funcional
import React, { Component } from 'react'
import { Route, Switch, NavLink } from "react-router-dom"
import { Menu, Grid, Button, Icon, Header} from 'semantic-ui-react'

//Componentes-Vistas
import Inicio from './views/InicioView'
import Datos from './views/DatosView'
import Eventos from './views/EventosView'
import Anexos from './views/AnexosView'



export default class HomeLayout extends Component {

    static contextType = AuthContext

    constructor(props) {
        super(props)
        this.state = {
            activeItem: null
        }

        this.handleItemClick = this.handleItemClick.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }


    handleItemClick(e) {
        const { name } = e.target;
        this.setState({ activeItem: name });
    }

    handleLogout(e) {
        e.preventDefault()

        const { dispatch } = this.context
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
        const {activeItem} = this.state
        return (
            <>
                

                    
                        {/*<Menu pointing style={{border:'none', borderRadius:0,boxShadow:0}}>
                            <Menu.Item
                                name='home'
                                active={activeItem === 'home'}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='messages'
                                active={activeItem === 'messages'}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='friends'
                                active={activeItem === 'friends'}
                                onClick={this.handleItemClick}
                            />
                            </Menu>*/}
                    
                    <Grid style={{ width: '100vw', height: '100vh' }}>

                                    

                    {/* MENU IZQUIERDA */}
                    <Grid.Column style={{ width: '12%'}} only='computer tablet'>
                        <Menu fluid vertical tabular style={{borderColor:'#3F3D56', marginLeft:'1rem', marginTop:'2rem'}}>
                            <Menu.Item
                                icon='home'
                                name='inicio'
                                active={activeItem === 'inicio'}
                                onClick={this.handleItemClick}
                                as={NavLink} to='/ovac/inicio'
                            />
                            <Menu.Item
                                icon='th list'
                                name='eventos'
                                active={activeItem === 'eventos'}
                                onClick={this.handleItemClick}
                                as={NavLink} to='/ovac/eventos'
                            />
                            <Menu.Item
                                icon='edit'
                                name='objetos'
                                active={activeItem === 'datos'}
                                onClick={this.handleItemClick}
                                as={NavLink} to='/ovac/datos'
                            />
                            <Menu.Item
                                icon='file alternate'
                                name='anexos'
                                active={activeItem === 'anexos'}
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

                    {/* SEGMENTO PRINCIPAL DE CONTENIDO */}
                    <Grid.Column style={{ width: '88%', marginTop:'2rem'}} only='computer tablet'>
                        <Switch>
                            <Route exact path='/ovac/inicio' component={Inicio} />
                            <Route exact path='/ovac/datos' component={Datos} />
                            <Route exact path='/ovac/eventos' component={Eventos} />
                            <Route exact path='/ovac/anexos' component={Anexos} />
                        </Switch>
                    </Grid.Column>

                    <Grid.Column style={{ width: '100%' }} only='mobile'>
                        <Header
                            size='huge'
                            content='Oficina Virtual de Atención a Capacitaciones'
                            subheader='Secretaría de Economía y del Trabajo del estado de Chiapas'
                            style={{
                                color: '#3F3D56',
                                position: 'absolute',
                                top: '4rem',
                                left: '3rem',
                                zIndex: '-4'

                            }}
                        />
                        <Header
                            size='huge'
                            content='Si deseas continuar aquí, cambia la orientación de tu pantalla '
                            style={{
                                color: '#b09a5b',
                                position: 'absolute',
                                top: '13rem',
                                left: '3rem',
                                zIndex: '-4'

                            }}
                        />

                    </Grid.Column>
                    
                </Grid>

            </>
        )
    }

}
