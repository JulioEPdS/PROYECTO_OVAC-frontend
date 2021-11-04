//Gráfico y de estado
import { Component } from 'react'
import { Grid, Header, Segment, Card, Button, Icon, Image, Message, Transition } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../../../auth/AuthContext'
//Funcional-consumo API 
import Axios from 'axios'
import _ from 'lodash'
//Elementos-vistas
import Events from '../components/containers/Events'
import CardPlaceholder from '../components/objetos/CardPlaceholder'
//import EventPlaceholder from './componentes/EventsPlaceholder'
//import HistoricalPlaceholder from './componentes/HistoricalPlaceholder'

//Imágenes
import events from '../img/events.svg'
import redcross from '../img/redcross.svg'
import empty from '../img/empty.svg'


export default class ViewEventos extends Component {

    static contextType = AuthContext

    constructor(props) {
        super(props)
        this.state = {
            eventos: [],
            historial: [],
            waitingeventos: true,
            waitinghistorial: true,
            fetcherrorE: false,
            fetcherrorH: false
        }
        this.fetchActivos = this.fetchActivos.bind(this)
        this.fetchHistorial = this.fetchHistorial.bind(this)
    }

    componentDidMount() {
        this.fetchActivos()
        //this.fetchHistorial()
        //this.setState({ waitinghistorial: false })
    }

    fetchActivos() {
        this.setState({ waitingeventos: true, fetcherrorE: false })
        const { user } = this.context
        Axios.get('http://localhost:5000/eventos', {
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
            .then(
                (result) => {
                    this.setState({ eventos: result.data, waitingeventos: false })
                },
                (error) => {
                    console.log('No se ha podido obtener info :(')
                    this.setState({ fetcherrorE: true, waitingeventos: false, eventos: [] })
                }
            )
    }

    fetchHistorial() {
        this.setState({ waitingeventos: true, fetcherrorE: false })
        const { user } = this.context
        Axios.get('http://localhost:5000/eventos', {
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
            .then(
                (result) => {
                    this.setState({ historial: result.data, waitinghistorial: false })
                },
                (error) => {
                    this.setState({ fetcherrorH: true, waitinghistorial: false, historial: [] })
                }
            )
            .catch((error) => {
                this.setState({ fetcherrorH: true, waitinghistorial: false, historial: [] })
            })

    }

    render() {
        const { eventos, waitingeventos, historial, waitinghistorial, fetcherrorE, fetcherrorH } = this.state

        const recomendaciones = ['No recargues la página completa :) intenta con el botón azul que está arriba a la derecha ', 'Si esta falla persiste comunica este problema']
        return (
            <>
                <Button icon loading={waitingeventos} color='blue' floated='right' onClick={this.fetchActivos}>
                    <Icon name='refresh' />
                </Button>
                <Button
                    icon='calendar plus outline'
                    content='Nuevo Evento'
                    labelPosition='right'
                    loading={waitingeventos}
                    disabled={fetcherrorE || waitingeventos}
                    color='olive'
                    floated='right'
                    as={NavLink} to='/ovac/eventos/crear'
                />

                <Grid.Row>
                    <Header as='h2' color='grey' dividing content='Eventos activos' subheader='En espera de ser lanzados y próximos a lanzar' icon='calendar check' />

                    <Segment
                        style={{
                            overflowY: 'auto',
                            height: 238,
                        }}
                        basic>

                        <Card.Group itemsPerRow='4'>
                            {waitingeventos ?
                                _.times(5, (i) =>
                                    <CardPlaceholder key={i} />
                                )
                                : eventos.length === 0 && !fetcherrorE ?
                                    <>
                                        <Image size='small' src={empty} alt='No se hallaron datos' style={{ marginLeft: '32vw', marginTop: '10vh' }} />
                                        <Header icon='database' content='No se hallaron eventos en la base de datos' style={{ marginLeft: '23vw', color: '#3F3D56' }} />
                                    </>
                                    : <Events eventos={eventos} />

                            }
                        </Card.Group>
                        {fetcherrorE ?
                            <>
                                <Image src={redcross} size='small' floated='right' style={{ zIndex: '2', marginTop:'-2vh'}} />
                                <Message error header='Oops.. no se pudo comunicar con el servidor' list={recomendaciones} />
                            </>
                            : <></>
                        }                        
                    </Segment>

                    <Transition.Group>
                    {eventos.length > 0 ?
                        <Header as='h5' style={{ color: '#c9a915' }}>
                            Hay {eventos.length} eventos activos
                        </Header>
                        : waitingeventos ?
                            <Header as='h5' style={{ color: '#c9a915' }}>
                                Recibiendo datos...
                            </Header>
                            : eventos.length === 0 &&
                                <Header as='h5' style={{ color: '#c9a915' }}>
                                    No hay eventos activos
                                </Header>
                    }
                    </Transition.Group>
                </Grid.Row>

                <Grid.Row style={{ marginTop: '1rem' }}>
                    <Header as='h2' color='grey' dividing content='Historial de eventos' subheader='Eventos que sucedieron con anterioridad' icon='history' />
                    <Segment loading={waitinghistorial} basic style={{
                        overflowY: 'auto',
                        height: 238
                    }}>
                        {waitinghistorial ?
                            <>Esperando historial</>
                            : fetcherrorH ?
                                <>
                                    <Image src={redcross} size='small' floated='right' style={{ zIndex: '20' }} />
                                    <Message error header='Oops.. no se pudo comunicar con el servidor' list={recomendaciones} />
                                </>
                                : historial.length === 0 ?
                                    <>
                                        <Image size='small' src={empty} alt='No se hallaron datos' style={{ marginLeft: '32vw', marginTop: '10vh' }} />
                                        <Header icon='database' content='No se hallaron eventos en la base de datos' style={{ marginLeft: '23vw', color: '#3F3D56' }} />
                                    </>
                                    : <>Aquí está el historial</>

                        }                        
                    </Segment>

                </Grid.Row>




                <Image size='medium' src={events} alt='Place' style={{ position: 'fixed', left: '-6vw', top: '64vh', zIndex: '-20', opacity: '.6' }} />
            </>
        )
    }
}