import React, { Component} from 'react'
import Axios from 'axios'
import config from '../../../config'

import buildings from './img/buildings.svg'
import avatar from './img/avatar.svg'

import { AuthContext } from '../../../auth/AuthContext'
import { Button, Form, Header, Icon, Segment, Message, Image, Transition, Grid } from 'semantic-ui-react'
import { types } from '../../../types/types'



export default class LoginPage extends Component {

  static contextType = AuthContext

  constructor(props) {
    super(props)
    this.state = {
      loginfailed: false,
      user: '',
      password: '',
      tryingtolog: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.validateForm = this.validateForm.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  /*
  
  const history = useHistory()
  */
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.setState({ loginfailed: false })
  }

  validateForm({ user, password }) {
    return (user.length > 8 && password.length > 8)

  }

  handleSubmit(e) {
    this.setState({tryingtolog: true})
    e.preventDefault()        
    const {dispatch} = this.context
    const { user, password } = this.state
    Axios.post(config.REACT_APP_apiURL+'/usuarios/login', {
      user: user,
      password: password
    }).then((res) => {
      if (res.status === 200) {
        dispatch({
          type: types.login,
          payload: {
            id: res.data.info[0].id,
            name: res.data.info[0].nombre,
            role: res.data.info[0].role,
            token: res.data.token
          }
        })
      }
      this.props.history.replace('/app/inicio')
    }).catch((err) => {
      this.setState({ loginfailed: true, tryingtolog: false })
    })
    //setErrorM(reject)    
    //window.location.href='./ovac/inicio'
  }

  render() {
    const { user, password, loginfailed, tryingtolog } = this.state


    return (
      <>
      <Grid style={{padding:'1%'}}>
        <Grid.Row only='computer tablet'>        
          <Header
            size='huge'
            content='Oficina Virtual de Atención a Capacitaciones'
            subheader='Secretaría de Economía y del Trabajo del estado de Chiapas'
            style={{ 
              color: '#3F3D56',
              position: 'absolute',
              top:'4rem',
              left:'5rem',
              zIndex:'-4'

            }}
          />
        
            <Segment style={{ 
              width: '20rem', 
              minWidth: '20rem',                
              position: 'absolute',
              top:'10rem',
              left:'5rem'}}>
              <Header color='grey' as='h2' textAlign='center' icon>
                <Image src={avatar} />
                <Header.Content style={{color:'#b09a5b'}}>Bienvenido</Header.Content>
                <Header.Subheader>Introduzca sus credenciales</Header.Subheader>
              </Header>
              <Form onSubmit={this.handleSubmit}>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Usuario'
                  name='user'
                  value={user}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Contraseña'
                  name='password'
                  type='password'
                  value={password}
                  onChange={this.handleChange}
                />

                <Button
                  style={{ color: '#ffffff', backgroundColor: '#3F3D56' }}
                  fluid size='large'
                  type='submit'
                  animated                  
                  disabled={!this.validateForm({ user, password })}
                  loading={tryingtolog}
                  >
                  <Button.Content visible>Acceder</Button.Content>
                  <Button.Content hidden>
                    <Icon name='sign-in alternate' />
                  </Button.Content>
                </Button>
                <Transition.Group animation='swing left'>
                  {loginfailed &&
                    <Message negative          
                      header='Inicio de sesión fallida  :('
                      content='tal vez hizo falta una letra?'
                    />
                  }
                </Transition.Group>
              </Form>
            </Segment>
          

          
            <Image src={buildings} 
            style={{
              position: 'absolute',
              top:'11rem',
              left:'30rem',
              zIndex:'-3',
              opacity:'.7'
            }}            
            />
          

        </Grid.Row>
        <Grid.Row only='mobile' style={{width:'100%'}}>
        <Header
            size='huge'
            content='Oficina Virtual de Atención a Capacitaciones'
            subheader='Secretaría de Economía y del Trabajo del estado de Chiapas'
            style={{ 
              color: '#3F3D56',
              position: 'absolute',
              top:'4rem',
              left:'3rem',
              zIndex:'-4'

            }}
          />

          <Header
            size='huge'
            content='Si deseas continuar aquí, cambia la orientación de tu pantalla '            
            style={{ 
              color: '#b09a5b',
              position: 'absolute',
              top:'13rem',
              left:'3rem',
              zIndex:'-4'

            }}
          />
        </Grid.Row>
        </Grid>

      </>
    )
  }
}
