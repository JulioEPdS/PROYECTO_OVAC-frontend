import { Component } from 'react'
import { Header, Icon, Segment, Breadcrumb, Image, Button, Form, Grid } from 'semantic-ui-react'
import { AuthContext } from '../../../../auth/AuthContext'

//import Axios from 'axios'
import { NavLink } from 'react-router-dom'

import chore from '../img/chore.svg'

export default class DinamicCategoria extends Component {

    //Necesario para extraer token e id
    static contextType = AuthContext

    constructor(props) {
        super(props)
        this.state = {
            //Extraer el parámetro de ID para consultar 
            categoria: this.props.match.params.id,

            edit: false
        }

    }

    componentDidMount() {
        //FETCH THE INFO
    }

    async fetchInfo() {

    }

    render() {
        const { categoria, edit } = this.state
        return (
            <Segment style={{ height: '81vh' }}>
                <Header as='h2' style={{ color: "#a95168" }}>
                    <Icon name='th' />
                    <Header.Content>
                        Detalles de la categoría
                        <Header.Subheader>
                            Aquí puedes editar o desactivar la categoría
                        </Header.Subheader>
                    </Header.Content>
                </Header>


                <Breadcrumb>
                    <Breadcrumb.Section link as={NavLink} to='/ovac/datos'>Registros</Breadcrumb.Section>
                    <Breadcrumb.Divider />
                    <Breadcrumb.Section active>Categoría</Breadcrumb.Section>
                </Breadcrumb>

                <Grid columns={2} style={{marginTop:'.5rem'}}>
                    <Grid.Row stretched>
                        {/*IZQUIERDA */}
                        <Grid.Column>
                            <Segment stacked>

                                <Form>

                                    <Header as='h3' color='grey'>Nombre de la categoría</Header>

                                    {edit === false ?
                                        <Header as='h5'>El nombre aquí</Header> :
                                        <Form.Input placeholder='' />
                                    }

                                    <Header as='h3' color='grey'>Descripción</Header>
                                    {edit === false ?
                                        <Header as='h5'>La descripción aquí</Header> :
                                        <Form.Input placeholder='' />
                                    }

                                    <Header as='h3' color='grey'>Color e ícono</Header>

                                    {edit === false ?
                                        <Header as='h5'>Color e ícono aquí</Header> :
                                        <Form.Group widths='equal'>
                                            <Form.Input placeholder='' />
                                            <Form.Input placeholder='' />
                                        </Form.Group>
                                    }

                                    <Button onClick={(e) => this.setState({ edit: !edit })} content={edit ? 'Guardar' : 'Editar'} />
                                </Form>
                            </Segment>
                        </Grid.Column>

                        {/*DERECHA */}
                        <Grid.Column >
                            {/*SUPERIOR */}
                            <Grid.Row>
                                <Segment style={{ width: '20vw', height: '30vh' }}>

                                </Segment>

                            </Grid.Row>
                            {/*INFERIOR */}
                            <Grid.Row>
                                <Segment style={{ width: '20vw', height: '30vh' }}>

                                </Segment>

                            </Grid.Row>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>







                <Image size='medium' src={chore} alt='Registros' style={{ position: 'fixed', left: '-7vw', top: '65vh', zIndex: '-20', opacity: '.6' }} />
            </Segment>
        )
    }
}