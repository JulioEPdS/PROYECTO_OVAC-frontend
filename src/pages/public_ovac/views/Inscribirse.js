import { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Card, Grid, Header, Icon, Segment, Button, Search } from 'semantic-ui-react'

export default class Inscripciones extends Component {
    

    render() {

        const cards = (
            <>
                <Card fluid color='orange'>
                    <Card.Content>
                        <Card.Header>Consultar datos</Card.Header>
                        <Card.Meta>Consulta o actualiza tus datos</Card.Meta>
                        <Card.Description>
                            Si ya te has inscrito alguna vez a un evento, puedes
                            consultar tus datos, modificarlos o cambiar tus
                            preferencias de invitación o las categorías que te interesan.

                        </Card.Description>

                    </Card.Content>
                    <Card.Content extra>
                        <Button color='orange' size='large' floated='right' animated as={NavLink} to='/datos'>
                            <Button.Content visible>Consultar</Button.Content>
                            <Button.Content hidden>
                                <Icon name='right arrow' />
                            </Button.Content>
                        </Button>
                    </Card.Content>
                </Card>
                <Card fluid color='teal'>
                    <Card.Content>
                        <Card.Header>Eventos de capacitación</Card.Header>
                        <Card.Meta>Inscríbete a eventos de capacitación</Card.Meta>
                        <Card.Description>
                            La Secretaría de Economía y del Trabajo del estado de Chiapas
                            pone a disposición del público múltiples eventos, capacitaciones,
                            pláticas, congresos y más. Si desea participar en estos eventos
                            continue a la sección de inscripción.

                        </Card.Description>

                    </Card.Content>
                    <Card.Content extra>
                        <Button color='teal' size='large' floated='right' animated as={NavLink} to='/inscripciones'>
                            <Button.Content visible>Inscribirse</Button.Content>
                            <Button.Content hidden>
                                <Icon name='right arrow' />
                            </Button.Content>
                        </Button>
                    </Card.Content>
                </Card>

                <Card fluid color='brown'>
                    <Card.Content>
                        <Card.Header>Documentos de participación</Card.Header>
                        <Card.Meta>Imprime tus constancias</Card.Meta>
                        <Card.Description>
                            Algunos eventos facilitan un documento que comprueba
                            la participación a un evento, si has participado en algún
                            evento donde se otorgue uno de estos documentos, desde aquí
                            puedes obtenerlo.

                        </Card.Description>

                    </Card.Content>
                    <Card.Content extra>
                        <Button color='brown' size='large' floated='right' animated as={NavLink} to=''>
                            <Button.Content visible>Imprimir</Button.Content>
                            <Button.Content hidden>
                                <Icon name='right arrow' />
                            </Button.Content>
                        </Button>
                    </Card.Content>
                </Card>

                <Card fluid color='teal'>
                    <Card.Content>
                        <Card.Header>Eventos de capacitación</Card.Header>
                        <Card.Meta>Inscríbete a eventos de capacitación</Card.Meta>
                        <Card.Description>
                            La Secretaría de Economía y del Trabajo del estado de Chiapas
                            pone a disposición del público múltiples eventos, capacitaciones,
                            pláticas, congresos y más. Si desea participar en estos eventos
                            continue a la sección de inscripción.

                        </Card.Description>

                    </Card.Content>
                    <Card.Content extra>
                        <Button color='teal' size='large' floated='right' animated as={NavLink} to='/inscripciones'>
                            <Button.Content visible>Inscribirse</Button.Content>
                            <Button.Content hidden>
                                <Icon name='right arrow' />
                            </Button.Content>
                        </Button>
                    </Card.Content>
                </Card>

                <Card fluid color='orange'>
                    <Card.Content>
                        <Card.Header>Consultar datos</Card.Header>
                        <Card.Meta>Consulta o actualiza tus datos</Card.Meta>
                        <Card.Description>
                            Si ya te has inscrito alguna vez a un evento, puedes
                            consultar tus datos, modificarlos o cambiar tus
                            preferencias de invitación o las categorías que te interesan.

                        </Card.Description>

                    </Card.Content>
                    <Card.Content extra>
                        <Button color='orange' size='large' floated='right' animated as={NavLink} to='/datos'>
                            <Button.Content visible>Consultar</Button.Content>
                            <Button.Content hidden>
                                <Icon name='right arrow' />
                            </Button.Content>
                        </Button>
                    </Card.Content>
                </Card>

            </>
        )

        return (
            <Segment style={{ width: '85vw', marginTop: '10vh', marginLeft: 'auto', marginRight: 'auto' }}>
                <Grid padded>
                    <Grid.Row>
                        <Header icon style={{ color: '#2f2e41' }} textAlign='center'>
                            <Icon name='calendar' />
                            Inscripción a eventos
                            <Header.Subheader>Selecciona el evento al que desees inscribirte</Header.Subheader>
                        </Header>                        
                    </Grid.Row>
                    <Grid.Row>
                        <Search fluid></Search>
                    </Grid.Row>



                    <Grid.Row only='tablet computer'>
                        <Card.Group itemsPerRow='4'>
                            {cards}
                        </Card.Group>
                    </Grid.Row>

                    <Grid.Row only='mobile'>
                        {cards}
                    </Grid.Row>





                </Grid>
            </Segment>
        )
    }
}