import React, {useContext, useState} from 'react'
import Axios from 'axios'
import { AuthContext } from '../../auth/AuthContext'
import { Button, Form, Grid, Header, Icon, Segment} from 'semantic-ui-react'
import { types } from '../../types/types'
import { useHistory } from 'react-router'



export const LoginPage=() =>{
  
  const {dispatch} = useContext(AuthContext)
  const history = useHistory()
  
  const [user, setUser] = useState("")
  const [password, setPassw] = useState("")
    
  function validateForm(){
    return user.length > 8 && password.length > 8
  }
  
  function handleSubmit(event) {    
    event.preventDefault();
    Axios.post('http://localhost:5000/usuarios/login',{
      usuario : user,
      contraseña : password
    }).then((res)=>{        
      if (res.status === 200){
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
    }).catch((err)=>{                  
    })    
    //setErrorM(reject)
    history.replace('/ovac/inicio')
    //window.location.href='./ovac/inicio'
  }
  
    return(
  <Grid textAlign='center' columns='equal' centered style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column className='four wide'>
      <Header color='grey'>
        <Icon name='user circle' color='brown'/>       
        <Header.Content as='h2'>Login
        <Header.Subheader>
          Oficina Virtual de Atención a Capacitaciones
        </Header.Subheader>
        </Header.Content>
      </Header>
      <Form size='large' onSubmit={handleSubmit}>
        <Segment raised color='brown'>
          <Form.Input  
            fluid 
            icon='at' 
            iconPosition='left' 
            placeholder='E-mail address'
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <Form.Input
            fluid
            icon='lock'            
            iconPosition='left'
            placeholder='Contraseña'
            type='password'
            value={password}
            onChange={(e) => setPassw(e.target.value)}
          />

          <Button color='brown' fluid size='large' type='submit' animated disabled={!validateForm()}>
            <Button.Content visible>Iniciar sesión</Button.Content>
            <Button.Content hidden>
              Vamos <Icon name='sign-in alternate' />
            </Button.Content>
                      
          </Button>
        </Segment>
      </Form>
    </Grid.Column>
  </Grid>
  )
}
export default LoginPage