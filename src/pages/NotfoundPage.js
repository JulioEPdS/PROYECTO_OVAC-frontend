import React from 'react'
import { NavLink } from 'react-router-dom'

import {Button, Grid, Header, Icon} from 'semantic-ui-react'

export default function NotfoundPage() {
    return (
        <Grid columns='equal' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column className='eight wide'>
                <Header size='huge' style={{fontSize:'9em', marginLeft:'10rem'}}>
                    <Icon color='brown' name='question circle' style={{fontSize:'2.3em'}}/>
                    <Header.Content >
                    404 
                    <Header.Subheader style={{fontSize:'0.6em'}}>
                        NOT FOUND
                    </Header.Subheader>
                    <Header.Subheader>
                        La página que estás buscando no se ha encontrado
                    </Header.Subheader>
                    </Header.Content>                    
                </Header>

                <Button content='Volver al LogIn' as={NavLink} to='/login'/>
            </Grid.Column>

            
        </Grid>
                  
    )
}
