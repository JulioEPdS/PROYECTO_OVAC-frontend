//Contexto
import { AuthContext } from '../../../auth/AuthContext'
import { types } from '../../../types/types'
//Gráfico y funcional
import React, { Component} from 'react'
import { Route, Switch, NavLink} from "react-router-dom"
import { Menu, Grid, Button, Icon, Header, Transition} from 'semantic-ui-react'
import iwt from './img/iwt.svg'

//Componentes-Vistas
import Inicio from './views/InicioView'
import Datos from './views/DatosView'
import Eventos from './views/EventosView'
import Anexos from './views/AnexosView'


export default class HomeLayout extends Component{

    static contextType = AuthContext

    constructor(props){
        super(props)
        this.state={
            activeItem: null,
            visible: false       
        }
        this.handleItemClick = this.handleItemClick.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleItemClick(e) {
        const { name } = e.target
        this.setState({ activeItem: name })
    }

    handleLogout(){        
        const {dispatch} = this.context
        dispatch({
            type: types.logout
        })
        this.props.history.replace('/login')
    }

    /*
    const {user} = useContext(AuthContext)
    const history = useHistory()
        
    const [state, setState] = useState({activeItem: null})
    
    
    //render() {
    const { activeItem } = state

    
    
    const handleItemClick = (e,{name}) => setState({activeItem: name});            

    */
render(){
    const{activeItem} = this.state
    const{user} = this.context

        return (<>
        
            <Menu borderless inverted
                style={{
                    border: 'none', 
                    borderRadius: 0, 
                    boxShadow: 0,                     
                    backgroundColor: '#b09a5b'
                }}>
                <Menu.Item>
                    <img src={iwt} alt='Icon' style={{fontSize:'2rem'}}/>
                </Menu.Item>
                <Menu.Item>
                    <Header as='h3' inverted>                        
                        <Header.Content style={{fontSize:'2.2rem'}}>OVAC
                            <Header.Subheader>Oficina Virtual de Atención a Capacitaciones</Header.Subheader>
                        </Header.Content>
                    </Header>
                </Menu.Item>
                <Menu.Item
                  name='tutorial'
                  active={activeItem === 'tutorial'}
                  onClick={this.handleItemClick}
                  position='right'
                />
                <Menu.Item
                  name={user.name}         
                  active={activeItem === user.name}
                  onClick={this.handleItemClick}                                        
                />
                <Menu.Item >
                    <Button animated onClick={this.handleLogout} style={{color:'#FFFFFF', backgroundColor:'#3F3D56'}}>
                        <Button.Content visible>Salir</Button.Content>
                        <Button.Content hidden>
                            <Icon name='sign-out alternate' />
                        </Button.Content>          
                    </Button>
                </Menu.Item>                
            </Menu>


            <Grid>
                <Grid.Column style={{width:'160px',marginLeft:'1rem'}}>
                    <Menu  fluid vertical tabular color='brown'>
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
                          name='registros'
                          active={activeItem === 'registros'}
                          onClick={this.handleItemClick}
                          as={NavLink} to='/ovac/datos'
                        />                        
                        <Menu.Item                        
                          icon='file alternate'
                          name='informes'
                          active={activeItem === 'informes'}
                          onClick={this.handleItemClick}
                          as={NavLink} to='/ovac/anexos'
                        />
                    </Menu>
                </Grid.Column>
                <Grid.Column style={{marginTop:'0.5rem', width:'86%'}}>
                <Transition.Group>
                
                        <Switch>
                            <Route exact path='/ovac/inicio' component={Inicio}/>
                            <Route exact path='/ovac/datos' component={Datos}/>
                            <Route exact path='/ovac/eventos' component={Eventos}/>
                            <Route exact path='/ovac/anexos' component={Anexos}/>
                        </Switch>                    
                
                </Transition.Group>
                </Grid.Column>                                
            </Grid>
        
    </>
        )
    }
}
