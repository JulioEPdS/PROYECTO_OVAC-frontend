import { AuthContext } from '../../../../../auth/AuthContext'
import { Image, Segment, Header, Button, Icon, Step, Transition, Form, Message, List, Accordion, Statistic } from 'semantic-ui-react'
import { Component } from 'react'
import Axios from 'axios'

import Moment from 'moment'
import 'moment/locale/es-mx'

import config from '../../../../../config'

import events from '../../img/events.svg'


export default class DinamicActiveEvento extends Component {
    static contextType = AuthContext
    constructor(props) {
        super(props)
        this.state = {

            evento: this.props.match.params.id,
            liga: '',

            locator: 0,
            activeIndex: -1,
            hide: 100,
            show: 400,

            sucessSending: false,
            errorSending: false,


            //Event info
            title: "esperando...",
            type: "esperando...",
            project_type: "esperando...",
            description: "esperando...",
            duration: "esperando...",
            start_date: "esperando...",
            end_date: "esperando...",
            horarios: [{ fecha: "", hora: "" }],//JSON.stringify

            //ids de registros
            certdoc: "esperando...",
            ponente: "esperando...",
            organismo: "esperando...",
            formulario: "esperando...",
            beneficiados: "esperando...",
            categorias: [],

            banner: null,//Para presentar imagen            
            //no disponible debido a detalles de la API

            invitacion: '',//JSON.stringify
            recordatorio: '',
            ponentetext: '',
            inscritos: 0,

            //FOR FETCHING DATA///////////////////////////////////////////////////            
            waitingFetch: false,
            fetchError: false



        }
        //NAVIGATION
        this.handleAvanceClick = this.handleAvanceClick.bind(this)
        this.handleRetrocesoClick = this.handleRetrocesoClick.bind(this)

        this.handleHorariosChange = this.handleHorariosChange.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleChange = this.handleChange.bind(this)

        this.handleAddClick = this.handleAddClick.bind(this)
        this.handleRemoveClick = this.handleRemoveClick.bind(this)

        this.handleAccordioClick = this.handleAccordioClick.bind(this)

        //Information FETCHING
        this.fetchregistros = this.fetchregistros.bind(this)


        //SENDING DATA
        this.registerEvent = this.registerEvent.bind(this)


        this.enableButton = this.enableButton.bind(this)
    }

    componentDidMount() {
        this.fetchregistros()
    }

    //IMPORTANT HANDLERS/////////////////////////////////////////
    handleInputChange(e) {
        this.setState({
            banner: e.target.files[0],
            bannersend: e.target.files[0]
        })

        if (e.target.files && e.target.files[0]) {
            this.setState({
                banner: URL.createObjectURL(e.target.files[0])
            });
        }
    }
    handleHorariosChange = (e, { name, value, index }) => {
        //const { name, value } = e.target
        const { horarios } = this.state

        const list = [...horarios]
        list[index][name] = value
        this.setState({ horarios: list })
    }
    handleChange = (e, { name, value }) => this.setState({ [name]: value })
    handleAddClick = () => {
        const { horarios } = this.state
        const list = [...horarios, { fecha: "", hora: "" }]
        this.setState({ horarios: list })
    }
    handleRemoveClick = index => {
        const { horarios } = this.state
        const list = [...horarios];
        list.splice(index, 1);
        this.setState({ horarios: list })
    }
    handleAccordioClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }


    //NAVIGATION/////////////////////////////////////////////////
    handleRetrocesoClick() {
        const { locator } = this.state

        if (locator === 0) {
            this.props.history.replace('/app/eventos')
        }
        if (locator === 1) {
            this.setState({ locator: 0 })
        }

    }
    handleAvanceClick() {
        const { locator } = this.state

        if (locator === 0) {
            this.setState({ locator: 1 })
        }
    }


    //DATA ADQUISITION//////////////////////////////////////////
    async fetchregistros() {
        this.setState({ waitingFetch: true, fetchError: false })
        const { user } = this.context
        const { evento } = this.state


        await Axios.get(config.REACT_APP_apiURL + '/eventos/activos/' + evento, {
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
            .then(
                (result) => {

                    const data_start_day = (String(result.data[0].start_date)).slice(0, -1) //MSSQL uses the ISO-8601 but adds a Z at the end, Z must be removed
                    Moment.locale('es-mx')
                    const start_fecha = Moment(data_start_day).format('LL')//Gives day and month

                    const data_end_day = (String(result.data[0].end_date)).slice(0, -1) //MSSQL uses the ISO-8601 but adds a Z at the end, Z must be removed
                    Moment.locale('es-mx')
                    const end_fecha = Moment(data_end_day).format('LL')//Gives day and month

                    const text_mail = JSON.parse(result.data[0].text_mail)




                    //console.log(result)

                    this.setState({
                        waitingFetch: false,


                        //Event info
                        title: result.data[0].title,
                        type: result.data[0].type,
                        project_type: result.data[0].project_type,
                        description: result.data[0].description,

                        duration: result.data[0].duration,
                        start_date: start_fecha,
                        end_date: end_fecha,
                        horarios: JSON.parse(result.data[0].horarios),//JSON.parse

                        //ids de registros
                        certdoc: result.data[0].certdoc,
                        ponente: result.data[0].ponente,
                        organismo: result.data[0].organismo,
                        formulario: result.data[0].formulario,

                        beneficiados: result.data[0].beneficiados,

                        inscritos: result.data[0].inscritos,
                        categorias: result.data[0].categorias,

                        invitacion: text_mail[0].invitacion,
                        recordatorio: text_mail[0].recordatorio,
                        ponentetext: text_mail[0].ponente,

                        liga: result.data[0].liga

                    })




                },
                (error) => {
                    this.setState({
                        waitingFetch: false,
                        fetchError: true
                    })
                }
            )
            .catch(
                (error) => {
                    this.setState({
                        waitingFetch: false,
                        fetchError: true
                    })
                }
            )
    }
    promptReloadData = (childData) => {
        if (childData === 'reload') {
            this.fetchregistros()
        }
    }


    //BUTTON ENABLER///////////////////////////////////////////
    enableButton() {
        const {
            liga,
            fetchError
        } = this.state

        if (
            liga &&
            !fetchError) {
            return false
        }
        else {
            return true
        }
    }

    //DATA SEND/////////////////////////////////////////////////
    async registerEvent() {
        const { user } = this.context
        const {
            //EVENT INFO
            evento,
            liga
        } = this.state

        await Axios.put(config.REACT_APP_apiURL + '/eventos/updateLiga', {
            id: evento,
            liga: liga,
            user_id: user.id
        },
            {
                headers: {
                    'Authorization': 'Bearer ' + user.token
                }
            })
            .then(
                (result) => {
                    this.setState({ successSending: true, errorSending: false })
                    setTimeout(() => {
                        this.props.history.replace('/app/eventos')
                    }, 2000)

                },
                (error) => {
                    this.setState({ successSending: false, errorSending: true })
                    setTimeout(() => {
                        this.props.history.replace('/app/eventos')
                    }, 2000)
                }
            )
            .catch(
                (error) => {
                    this.setState({ successSending: false, errorSending: true })
                    setTimeout(() => {
                        this.props.history.replace('/app/eventos')
                    }, 2000)
                }
            )

    }

    //GRAPHICAL AREA////////////////////////////////////////////
    render() {
        const {
            liga, 

            //Graphical
            locator,
            activeIndex,
            hide,
            show,

            successSending,
            errorSending,


            //EVENT INFO
            title,
            type,
            project_type,
            description,
            duration,
            start_date,
            end_date,
            horarios,//JSON.stringify

            //ids de registros
            certdoc,
            ponente,
            organismo,
            formulario,
            //ids de registros



            beneficiados,
            inscritos,

            invitacion,
            recordatorio,
            ponentetext,



            waitingFetch,
            fetchError

        } = this.state

        return (
            <>
                <Segment>
                    <Header
                        color='teal'
                        dividing
                        content='Supervisión del evento'
                        subheader='Bienvenido, desde aquí puedes supervisar este evento'
                        icon='calendar'
                    />
                    <Step.Group size='mini' fluid>
                        <Step active={locator === 0 ? true : false}>
                            <Icon name='tasks' />
                            <Step.Content>
                                <Step.Title>Supervisión del evento</Step.Title>
                                <Step.Description>Corrobore los datos y estadísticas.</Step.Description>
                            </Step.Content>
                        </Step>

                        <Step active={locator === 1 ? true : false}>
                            <Icon name='send' />
                            <Step.Content>
                                <Step.Title>Envío de recordatorio</Step.Title>
                                <Step.Description>Proporcione el link de acceso al evento a través de un recordatorio.</Step.Description>
                            </Step.Content>
                        </Step>

                    </Step.Group>

                    <Transition.Group animation='fade left' duration={{ hide, show }}>
                        {locator === 0 &&
                            <div>
                                <Header color='grey'>Datos del evento:</Header>

                                <Segment floated='right' loading={waitingFetch}>
                                    <Header color='grey'>Estadísticas</Header>
                                    <Statistic.Group>
                                        <Statistic>
                                            <Statistic.Value>{inscritos}</Statistic.Value>
                                            <Statistic.Label>Personas inscritas</Statistic.Label>
                                        </Statistic>
                                    </Statistic.Group>

                                </Segment>


                                <Accordion styled>
                                    <Accordion.Title
                                        active={activeIndex === 0}
                                        index={0}
                                        onClick={this.handleAccordioClick}
                                    >
                                        <Icon name='dropdown' />
                                        Datos del evento
                                    </Accordion.Title>
                                    <Accordion.Content active={activeIndex === 0}>


                                        <List relaxed>
                                            {/* DESCRIPCIÓN DEL EVENTO */}
                                            <List.Item>
                                                <List.Icon name='info' color='blue' />
                                                <List.Content>
                                                    <List.Header>Descripción del evento</List.Header>
                                                    <List.Description>Los detalles generales del evento</List.Description>
                                                    <List.List>
                                                        <List.Item>
                                                            <List.Icon name='save' />
                                                            <List.Content>
                                                                <List.Header>Titulo del evento</List.Header>
                                                                <List.Description>
                                                                    {title}
                                                                </List.Description>
                                                            </List.Content>
                                                        </List.Item>
                                                        <List.Item>
                                                            <List.Icon name='save' />
                                                            <List.Content>
                                                                <List.Header>Tipo de evento</List.Header>
                                                                <List.Description>
                                                                    {type}
                                                                </List.Description>
                                                            </List.Content>
                                                        </List.Item>
                                                        <List.Item>
                                                            <List.Icon name='save' />
                                                            <List.Content>
                                                                <List.Header>Tipo de proyecto</List.Header>
                                                                <List.Description>
                                                                    {project_type}
                                                                </List.Description>
                                                            </List.Content>
                                                        </List.Item>
                                                        <List.Item>
                                                            <List.Icon name='save' />
                                                            <List.Content>
                                                                <List.Header>Descripción del evento</List.Header>
                                                                <List.Description>
                                                                    {description}
                                                                </List.Description>
                                                            </List.Content>
                                                        </List.Item>
                                                        <List.Item>
                                                            <List.Icon name='save' />
                                                            <List.Content>
                                                                <List.Header>Beneficiados</List.Header>
                                                                <List.Description>
                                                                    {beneficiados}
                                                                </List.Description>
                                                            </List.Content>
                                                        </List.Item>
                                                    </List.List>
                                                </List.Content>
                                            </List.Item>

                                        </List>


                                    </Accordion.Content>


                                    <Accordion.Title
                                        active={activeIndex === 1}
                                        index={1}
                                        onClick={this.handleAccordioClick}
                                    >
                                        <Icon name='dropdown' />
                                        Registros
                                    </Accordion.Title>
                                    <Accordion.Content active={activeIndex === 1}>
                                        <List relaxed>
                                            {/* REGISTROS constancia, empresa, formulario, ponente */}
                                            <List.Item>
                                                <List.Icon name='edit' color='olive' />
                                                <List.Content>
                                                    <List.Header>Registros</List.Header>
                                                    <List.Description>
                                                        Elementos relacionados y necesarios para el evento
                                                    </List.Description>
                                                    <List.List>
                                                        <List.Item>
                                                            <List.Icon name='save' />
                                                            <List.Content>
                                                                <List.Header>Constancia</List.Header>
                                                                <List.Description>
                                                                    {certdoc}
                                                                </List.Description>
                                                            </List.Content>
                                                        </List.Item>
                                                        <List.Item>
                                                            <List.Icon name='save' />
                                                            <List.Content>
                                                                <List.Header>Organismo</List.Header>
                                                                <List.Description>
                                                                    {organismo}
                                                                </List.Description>
                                                            </List.Content>
                                                        </List.Item>
                                                        <List.Item>
                                                            <List.Icon name='save' />
                                                            <List.Content>
                                                                <List.Header>Formulario adicional</List.Header>
                                                                <List.Description>
                                                                    {formulario}
                                                                </List.Description>
                                                            </List.Content>
                                                        </List.Item>
                                                        <List.Item>
                                                            <List.Icon name='save' />
                                                            <List.Content>
                                                                <List.Header>Ponente</List.Header>
                                                                <List.Description>
                                                                    {ponente}
                                                                </List.Description>
                                                            </List.Content>
                                                        </List.Item>
                                                    </List.List>
                                                </List.Content>
                                            </List.Item>
                                        </List>


                                    </Accordion.Content>



                                    <Accordion.Title
                                        active={activeIndex === 2}
                                        index={2}
                                        onClick={this.handleAccordioClick}
                                    >
                                        <Icon name='dropdown' />
                                        Fechas de realización
                                    </Accordion.Title>
                                    <Accordion.Content active={activeIndex === 2}>
                                        <List relaxed>
                                            {/* FECHAS DE REALIZACIÓN */}
                                            <List.Item>
                                                <List.Icon name='clock outline' color='violet' />
                                                <List.Content>
                                                    <List.Header>Fechas de realización</List.Header>
                                                    <List.Description>Información de la realización del evento</List.Description>
                                                    <List.List>
                                                        <List.Item>
                                                            <List.Icon name='save' />
                                                            <List.Content>
                                                                <List.Header>Fecha de inicio</List.Header>
                                                                <List.Description>{start_date}</List.Description>
                                                            </List.Content>
                                                        </List.Item>
                                                        <List.Item>
                                                            <List.Icon name='save' />
                                                            <List.Content>
                                                                <List.Header>Fecha de finalización</List.Header>
                                                                <List.Description>{end_date}</List.Description>
                                                            </List.Content>
                                                        </List.Item>
                                                        <List.Item>
                                                            <List.Icon name='save' />
                                                            <List.Content>
                                                                <List.Header>Duración</List.Header>
                                                                <List.Description>{duration}</List.Description>
                                                            </List.Content>
                                                        </List.Item>

                                                        <List.Item>
                                                            <List.Icon name='save' />
                                                            <List.Content>
                                                                <List.Header>Horarios</List.Header>
                                                                <List.Description>Horarios programados del evento</List.Description>
                                                                <List.List>
                                                                    {horarios?.map((x, i) => {
                                                                        return (
                                                                            <List.Item>
                                                                                <List.Icon name='save' />
                                                                                <List.Content>
                                                                                    <List.Header>{'horario ' + (i + 1)}</List.Header>
                                                                                    <List.Description>{Moment(x.fecha).format('LL') + ' ' + x.hora + ' hrs.'}</List.Description>
                                                                                </List.Content>
                                                                            </List.Item>
                                                                        )
                                                                    })}

                                                                </List.List>
                                                            </List.Content>
                                                        </List.Item>
                                                    </List.List>
                                                </List.Content>
                                            </List.Item>
                                        </List>


                                    </Accordion.Content>


                                    <Accordion.Title
                                        active={activeIndex === 3}
                                        index={3}
                                        onClick={this.handleAccordioClick}
                                    >
                                        <Icon name='dropdown' />
                                        Texto de invitación
                                    </Accordion.Title>
                                    <Accordion.Content active={activeIndex === 3}>
                                        {invitacion}
                                    </Accordion.Content>

                                    <Accordion.Title
                                        active={activeIndex === 4}
                                        index={4}
                                        onClick={this.handleAccordioClick}
                                    >
                                        <Icon name='dropdown' />
                                        Texto de recordatorio
                                    </Accordion.Title>
                                    <Accordion.Content active={activeIndex === 4}>
                                        {recordatorio}
                                    </Accordion.Content>

                                    <Accordion.Title
                                        active={activeIndex === 5}
                                        index={5}
                                        onClick={this.handleAccordioClick}
                                    >
                                        <Icon name='dropdown' />
                                        Texto para ponente
                                    </Accordion.Title>
                                    <Accordion.Content active={activeIndex === 5}>
                                        {ponentetext}
                                    </Accordion.Content>

                                </Accordion>


                            </div>
                        }

                        {locator === 1 &&
                            <div>

                                <Header color='grey'>Preparación para recordatorio:</Header>
                                <Form>
                                    <Form.Input
                                        label='Enlace de la reunión'
                                        placeholder='https://enlace.com.mx'
                                        name='liga'
                                        value={liga}
                                        onChange={this.handleChange}

                                    />
                                </Form>

                                <Button
                                    style={{ marginTop: '3vw' }}
                                    content='Enviar recordatorios'
                                    color='blue'
                                    labelPosition='right'
                                    icon='send'
                                    disabled={this.enableButton()}
                                    onClick={this.registerEvent}
                                />

                            </div>
                        }
                    </Transition.Group>





                    <Transition.Group>
                        {successSending &&
                            <Message
                                success
                                header='Información guardada correctamente'
                                content='Ya puede encontrar este evento en la sección de eventos en espera'
                            />
                        }
                        {errorSending &&
                            <Message
                                error
                                header='No se pudo actualizar la información'
                                content='No hubo comunicación con el servidor, revise su conexión a internet, o informe este problema a sistemas'
                            />
                        }

                    </Transition.Group>



                </Segment>


                <Button
                    style={{ marginTop: '3vh' }}
                    floated='right'
                    content='Avanzar'
                    icon='right arrow'
                    labelPosition='right'
                    onClick={this.handleAvanceClick}
                />
                <Button
                    style={{ marginTop: '3vh' }}
                    floated='right'
                    content='Regresar'
                    icon='left arrow'
                    labelPosition='left'
                    onClick={this.handleRetrocesoClick}
                />



                <Image size='medium' src={events} alt='Place' style={{ position: 'fixed', left: '-6vw', top: '64vh', zIndex: '-20', opacity: '.6' }} />
            </>
        )
    }
}