//Contexto
import { AuthContext } from '../../../auth/AuthContext'
import { types } from '../../../types/types'
//Gráfico y funcional
import React, { useContext, useState} from 'react'
import { Route, Switch, NavLink, useHistory } from "react-router-dom"
import { Menu, Grid, Button, Icon, Header} from 'semantic-ui-react'

//Componentes-Vistas
import Inicio from '../main_ovac/views/InicioView'
import Datos from '../main_ovac/views/DatosView'
import Eventos from '../main_ovac/views/EventosView'
import Anexos from '../main_ovac/views/AnexosView'


export const HomeLayout = () => {
    const {user} = useContext(AuthContext)
    const history = useHistory()
    
    //state = { activeItem: null }
    const [state, setState] = useState({activeItem: null})
    
    
    //handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    
    //render() {
    const { activeItem } = state

    const {dispatch} = useContext(AuthContext)
    
    const handleItemClick = (e,{name}) => setState({activeItem: name});

    //Estilos
    const menuStyle = { border: 'none', borderRadius: 0, boxShadow: 0, marginBottom: '1em', transition: 'box-shadow 0.5s ease, padding 0.5s ease', backgroundColor: '#b09a5b'}
    const menuSeconds = {    marginTop: '1em',    marginLeft: '1em'}

    const handleLogout = () => {        
        dispatch({
            type: types.logout
        })
        history.replace('/login')
    }


        return (<>
        
            <Menu borderless inverted style={menuStyle}>
                <Menu.Item>
                    <Header as='h3' inverted>
                        <Icon name='newspaper' inverted style={{fontSize:'3rem'}}/>
                        <Header.Content style={{fontSize:'2rem'}}>OVAC
                            <Header.Subheader>Oficina Virtual de Atención a Capacitaciones</Header.Subheader>
                        </Header.Content>
                    </Header>
                </Menu.Item>
                <Menu.Item
                  name='tutorial'
                  active={activeItem === 'tutorial'}
                  onClick={handleItemClick}
                  position='right'
                />
                <Menu.Item
                  name={user.name}
                  active={activeItem === user.name}
                  onClick={handleItemClick}
                  
                />
                <Menu.Item >
                    <Button inverted animated onClick={handleLogout} >
                        <Button.Content visible>Salir</Button.Content>
                        <Button.Content hidden>
                            <Icon name='sign-out alternate' />
                        </Button.Content>          
                    </Button>
                </Menu.Item>                
            </Menu>


            <Grid>
                <Grid.Column computer={2} tablet={2} mobile={5}>
                    <Menu  fluid vertical tabular style={menuSeconds} color='brown'>
                        <Menu.Item                        
                          icon='home'
                          name='inicio'
                          active={activeItem === 'inicio'}
                          onClick={handleItemClick}
                          as={NavLink} to='/ovac/inicio'
                        />
                        <Menu.Item
                          icon='th list'
                          name='eventos'
                          active={activeItem === 'eventos'}
                          onClick={handleItemClick}
                          as={NavLink} to='/ovac/eventos'
                        />
                        <Menu.Item
                          icon='edit'
                          name='objetos'
                          active={activeItem === 'datos'}
                          onClick={handleItemClick}
                          as={NavLink} to='/ovac/datos'
                        />                        
                        <Menu.Item
                          icon='file alternate'
                          name='anexos'
                          active={activeItem === 'anexos'}
                          onClick={handleItemClick}
                          as={NavLink} to='/ovac/anexos'
                        />
                    </Menu>
                </Grid.Column>
                <Grid.Column computer={13} tablet={13} mobile={10}>
                        <Switch>
                            <Route exact path='/ovac/inicio' component={Inicio}/>
                            <Route exact path='/ovac/datos' component={Datos}/>
                            <Route exact path='/ovac/eventos' component={Eventos}/>
                            <Route exact path='/ovac/anexos' component={Anexos}/>
                        </Switch>                    
                </Grid.Column>                                
            </Grid>
        
    </>
        )
    //}
}

export default HomeLayout