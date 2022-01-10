//Gráfico y de estado
import { Component } from 'react'
import { Grid, Header, Segment, Card, Button, Icon, Image, Message, Transition } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../../../auth/AuthContext'

//Funcional-consumo API 
import config from '../../../../config'
import Axios from 'axios'
import _ from 'lodash'


//Elementos-vistas
import WaitingEventos from '../components/containers/WaitingEvents'
import ActiveEventos from '../components/containers/ActiveEvents'
import HistorialEventos from '../components/containers/HistorialEvents'


import CardPlaceholder from '../components/objetos/placeholders/CardPlaceholder'
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

            eventosActivos: [],
            eventosWaiting: [],
            eventosHistorial: [],

            waitingActivos: true,
            waitingWaiting: true,
            waitingHistorial: false,

            fetcherrorA: false,
            fetcherrorW: false,
            fetcherrorH: false
        }
        this.fetchActivos = this.fetchActivos.bind(this)
        this.fetchWaiting = this.fetchWaiting.bind(this)
        this.fetchHistorial = this.fetchHistorial.bind(this)

        this.reloadClick = this.reloadClick.bind(this)
    }

    componentDidMount() {
        this.fetchWaiting()
        this.fetchActivos()
        this.fetchHistorial()        
    }

    async fetchActivos() {
        this.setState({ waitingeventos: true, fetcherrorE: false })
        const { user } = this.context
        await Axios.get(config.REACT_APP_apiURL + '/eventos/activos/N', {
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
            .then(
                (result) => {
                    this.setState({ eventosActivos: result.data, waitingActivos: false, fetcherrorE: false })
                },
                (error) => {
                    this.setState({ fetcherrorA: true, waitingActivos: false, eventosActivos: [] })
                }
            )
    }

    async fetchWaiting() {
        this.setState({ waitingWaiting: true, fetcherrorW: false })
        const { user } = this.context
        await Axios.get(config.REACT_APP_apiURL + '/eventos/espera/N', {
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
            .then(
                (result) => {
                    this.setState({ eventosWaiting: result.data, waitingWaiting: false, fetcherrorW: false })
                },
                (error) => {
                    this.setState({ fetcherrorW: true, waitingWaiting: false, eventosWaiting: [] })
                }
            )
            .catch((error) => {
                this.setState({ fetcherrorW: true, waitingWaiting: false, eventosWaiting: [] })
            })

    }

    async fetchHistorial() {
        this.setState({ waitingWaiting: true, fetcherrorW: false })
        const { user } = this.context
        await Axios.get(config.REACT_APP_apiURL + '/eventos/historial/N', {
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
            .then(
                (result) => {
                    this.setState({ eventosHistorial: result.data, waitingHistorial: false, fetcherrorH: false })
                },
                (error) => {
                    this.setState({ fetcherrorH: true, waitingHistorial: false, eventosHistorial: [] })
                }
            )
            .catch((error) => {
                this.setState({ fetcherrorH: true, waitingHistorial: false, eventosHistorial: [] })
            })

    }

    reloadClick(){
        this.fetchActivos()
        this.fetchWaiting()
        this.fetchHistorial()

    }

    render() {
        const {
            eventosActivos,
            waitingActivos,
            fetcherrorA,

            eventosWaiting,
            waitingWaiting,
            fetcherrorW,

            eventosHistorial,
            waitingHistorial,
            fetcherrorH
        } = this.state

        const recomendaciones = ['No recargues la página completa :) intenta con el botón azul que está arriba a la derecha ', 'Si esta falla persiste comunica este problema']
        return (
            <>
                <Button
                    icon
                    loading={waitingWaiting}
                    color='blue'
                    floated='right'
                    onClick={this.reloadClick}
                >
                    <Icon name='refresh' />
                </Button>

                <Button
                    icon='calendar plus outline'
                    content='Nuevo Evento'
                    labelPosition='right'
                    loading={waitingWaiting}
                    disabled={fetcherrorW || waitingWaiting}
                    color='olive'
                    floated='right'
                    as={NavLink} to='/app/eventos/crear'
                />

                {/*###################################################  PRIMERA SECCION  ##############################################################################*/}
                <Grid.Row >
                    <Header
                        as='h2'
                        color='grey'
                        dividing
                        content='Eventos en espera'
                        subheader='Eventos con datos pendientes o que no se han lanzado al público'
                        icon='calendar outline'
                    />

                    <Segment basic style={{
                        overflowY: 'auto',
                        height: 238
                    }}>
                        <Card.Group itemsPerRow='4'>
                            {waitingWaiting ?
                                _.times(5, (i) =>
                                    <CardPlaceholder key={i} />
                                )
                                : eventosWaiting.length === 0 && !fetcherrorW ?
                                    <>
                                        <Image
                                            size='small'
                                            src={empty}
                                            alt='No se hallaron datos'
                                            style={{ marginLeft: '32vw', marginTop: '10vh' }}
                                        />
                                        <Header
                                            icon='database'
                                            content='No se hallaron eventos en la base de datos'
                                            style={{ marginLeft: '23vw', color: '#3F3D56' }}
                                        />
                                    </>
                                    : <WaitingEventos eventos={eventosWaiting} />

                            }
                        </Card.Group>

                        {fetcherrorW &&
                            <div style={{ marginTop: '3vw' }}>
                                <Image
                                    src={redcross}
                                    size='small'
                                    floated='right'
                                    style={{ zIndex: '2', marginTop: '-2vh' }}
                                />

                                <Message
                                    error
                                    header='Oops.. no se pudo comunicar con el servidor'
                                    list={recomendaciones}
                                />
                            </div>
                        }
                    </Segment>

                </Grid.Row>


                {/*###################################################  SEGUNDA SECCION  ##############################################################################*/}



                <Grid.Row style={{ marginTop: '4vh' }}>
                    <Header
                        as='h2'
                        color='grey'
                        dividing
                        content='Eventos activos'
                        subheader='Eventos próximos a llevarse a cabo'
                        icon='calendar check'
                    />

                    <Segment
                        style={{
                            overflowY: 'auto',
                            height: 238,
                        }}
                        basic>

                        <Card.Group itemsPerRow='4'>
                            {waitingActivos ?
                                _.times(5, (i) =>
                                    <CardPlaceholder key={i} />
                                )
                                : eventosActivos.length === 0 && !fetcherrorA ?
                                    <>
                                        <Image
                                            size='small'
                                            src={empty}
                                            alt='No se hallaron datos'
                                            style={{ marginLeft: '32vw', marginTop: '10vh' }}
                                        />

                                        <Header
                                            icon='database'
                                            content='No se hallaron eventos en la base de datos'
                                            style={{ marginLeft: '23vw', color: '#3F3D56' }}
                                        />
                                    </>
                                    : <ActiveEventos eventos={eventosActivos} />

                            }
                        </Card.Group>
                        {fetcherrorA &&
                            <div style={{ marginTop: '3vw' }}>
                                <Image
                                    src={redcross}
                                    size='small'
                                    floated='right'
                                    style={{ zIndex: '2', marginTop: '-2vh' }}
                                />

                                <Message
                                    error
                                    header='Oops.. no se pudo comunicar con el servidor'
                                    list={recomendaciones}
                                />
                            </div>
                        }
                    </Segment>

                    <Transition.Group>
                        {eventosActivos.length > 0 ?
                            <Header as='h5' style={{ color: '#c9a915' }}>
                                Hay {eventosActivos.length} eventos activos
                            </Header>
                            : waitingActivos ?
                                <Header as='h5' style={{ color: '#c9a915' }}>
                                    Recibiendo datos...
                                </Header>
                                : eventosActivos.length === 0 &&
                                <Header as='h5' style={{ color: '#c9a915' }}>
                                    No hay eventos activos
                                </Header>
                        }
                    </Transition.Group>
                </Grid.Row>



                {/*###################################################  TERCERA SECCION  ##############################################################################*/}



                <Grid.Row style={{ marginTop: '4vh' }}>
                    <Header
                        as='h2'
                        color='grey'
                        dividing
                        content='Historial de eventos'
                        subheader='Eventos que sucedieron con anterioridad'
                        icon='history'
                    />
                    <Segment loading={waitingHistorial} basic style={{
                        overflowY: 'auto',
                        height: 270
                    }}>
                        {waitingHistorial ?
                                _.times(5, (i) =>
                                    <CardPlaceholder key={i} />
                                )
                                : eventosHistorial.length === 0 && !fetcherrorH ?
                                    <>
                                        <Image
                                            size='small'
                                            src={empty}
                                            alt='No se hallaron datos'
                                            style={{ marginLeft: '32vw', marginTop: '10vh' }}
                                        />

                                        <Header
                                            icon='database'
                                            content='No se hallaron eventos en la base de datos'
                                            style={{ marginLeft: '23vw', color: '#3F3D56' }}
                                        />
                                    </>
                                    : <HistorialEventos eventos={eventosHistorial}/>

                            }

                        {fetcherrorH &&
                            <div style={{ marginTop: '3vw' }}>
                                <Image
                                    src={redcross}
                                    size='small'
                                    floated='right'
                                    style={{ zIndex: '2', marginTop: '-2vh' }}
                                />

                                <Message
                                    error
                                    header='Oops.. no se pudo comunicar con el servidor'
                                    list={recomendaciones}
                                />
                            </div>
                        }
                    </Segment>

                </Grid.Row>


                <Image size='medium' src={events} alt='Place' style={{ position: 'fixed', left: '-6vw', top: '64vh', zIndex: '-20', opacity: '.6' }} />
            </>
        )
    }
}