//Contexto
import { AuthContext } from '../../../auth/AuthContext'
import { types } from '../../../types/types'
//Gráfico y funcional
import React, { useContext, useState} from 'react'
import { Route, Switch, NavLink, useHistory } from "react-router-dom"
import { Menu, Grid, Button, Icon, Header} from 'semantic-ui-react'
import iwt from './img/iwt.svg'

//Componentes-Vistas
import Inicio from './views/InicioView'
import Datos from './views/DatosView'
import Eventos from './views/EventosView'
import Anexos from './views/AnexosView'


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

    const handleLogout = () => {        
        dispatch({
            type: types.logout
        })
        history.replace('/login')
    }


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
                  onClick={handleItemClick}
                  position='right'
                />
                <Menu.Item
                  name={user.name}         
                  active={activeItem === user.name}
                  onClick={handleItemClick}
                  color='brown'          
                  
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
                <Grid.Column style={{width:'11%', marginTop:'1rem', marginLeft:'1rem'}}>
                    <Menu  fluid vertical tabular color='brown'>
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
                <Grid.Column style={{marginTop:'0.5rem', width:'86%'}}>
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