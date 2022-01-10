import { AuthContext } from '../../../../../auth/AuthContext'
import { Image, Segment, Header, Button, Icon, Step, Transition, Form, Message } from 'semantic-ui-react'
import { Component } from 'react'
import Axios from 'axios'

import config from '../../../../../config'
//import { NavLink } from 'react-router-dom'

import events from '../../img/events.svg'


const tipoproyecto = [
    { key: 'inst', text: 'Institucional', value: 'Institucional' },
    { key: 'inv', text: 'Inversión', value: 'Inversión' }
]

const tipoevento = [
    { key: 'Capacitación', text: 'Capacitación', value: 'Capacitación' },
    { key: 'Congreso', text: 'Congreso', value: 'Congreso' },
    { key: 'Curso', text: 'Curso', value: 'Curso' },
    { key: 'Plática', text: 'Plática', value: 'Plática' },
    { key: 'Otro', text: 'Otro', value: 'Otro' }
]

export default class DinamicHistorialEvento extends Component {
    static contextType = AuthContext
    constructor(props) {
        super(props)
        this.state = {
            locator: 0,
            hide: 100,
            show: 400,

            sucessSending: false,
            errorSending: false,


            //Event info
            title: null,
            type: null,
            project_type: null,
            description: null,
            duration: null,
            start_date: null,
            end_date: null,
            horarios: [{ fecha: "", hora: "" }],//JSON.stringify

            //ids de registros
            certdoc_id: null,
            ponente_id: null,
            organismo: null,
            formulario: null,


            beneficiados: null,
            banner: null,//Para presentar imagen
            bannersend: null, //Imagen para enviar
            text_mail: null,//JSON.stringify

            //FOR FETCHING DATA///////////////////////////////////////////////////
            constancias: [{ key: 0, text: "No hay datos en la bd", value: null }],
            empresas: [{ key: 0, text: "No hay datos en la bd", value: null }],
            formularios: [{ key: 0, text: "No hay datos en la bd", value: null }],
            ponentes: [{ key: 0, text: "No hay datos en la bd", value: null }],
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
        await Axios.get(config.REACT_APP_apiURL + '/objects/allobjects', {
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
            .then(
                (result) => {
                    const constancias = result.data.constancias
                    const empresas = result.data.empresas
                    const formularios = result.data.formularios
                    const ponentes = result.data.ponentes

                    let opciones = []


                    if (constancias.length > 0) {
                        constancias.map((x, i) => {
                            opciones = [...opciones, { key: x.id, text: x.name + ', ' + x.description, value: x.id }]

                        })
                        this.setState({ constancias: opciones })
                        opciones = []
                    }


                    if (empresas.length > 0) {
                        empresas.map((x, i) => {
                            opciones = [...opciones, { key: x.id, text: x.name + ', ' + x.r_social, value: x.id }]

                        })
                        this.setState({ empresas: opciones })
                        opciones = []
                    }


                    if (formularios.length > 0) {
                        formularios.map((x, i) => {
                            opciones = [...opciones, { key: x.id, text: x.name + ', ' + x.description, value: x.id }]

                        })
                        this.setState({ formularios: opciones })
                        opciones = []
                    }



                    if (ponentes.length > 0) {
                        ponentes.map((x, i) => {
                            opciones = [...opciones, { key: x.id, text: x.nombre + ' ' + x.apellido_p + ' ' + x.apellido_m + ', ' + x.email, value: x.id }]
                        })
                        this.setState({ ponentes: opciones })
                        opciones = []
                    }

                    this.setState({ waitingFetch: false })


                },
                (error) => {
                    this.setState({
                        constancias: [],
                        empresas: [],
                        formularios: [],
                        ponentes: [],
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
            certdoc_id,
            ponente_id,
            organismo,
            formulario,
            beneficiados,

            fetchError
        } = this.state

        if (
            //EVENT INFO
            title &&
            type &&
            project_type &&
            description &&
            duration &&
            start_date &&
            end_date &&
            horarios &&//JSON.stringify

            //ids de registros
            certdoc_id &&
            ponente_id &&
            organismo &&
            formulario &&
            beneficiados && !fetchError) {
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
            title,
            type,
            project_type,
            description,
            duration,
            start_date,
            end_date,
            horarios,//JSON.stringify

            //ids de registros
            certdoc_id,
            ponente_id,
            organismo,
            formulario,
            beneficiados,
        } = this.state

        await Axios.post(config.REACT_APP_apiURL + '/eventos', {
            title: title,
            type: type,
            project_type: project_type,
            description: description,
            duration: duration,
            start_date: start_date,
            end_date: end_date,
            horarios: JSON.stringify(horarios),//JSON.stringify

            //ids de registros
            certdoc_id: certdoc_id,
            ponente_id: ponente_id,
            organismo: organismo,
            formulario: formulario,
            beneficiados: beneficiados,


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
            //Graphical
            locator,
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
            certdoc_id,
            ponente_id,
            organismo,
            formulario,
            //ids de registros


            //listado de opciones
            beneficiados,
            constancias,
            empresas,
            formularios,
            ponentes,


            waitingFetch,
            fetchError

        } = this.state

        return (
            <>
                <Segment>
                    <Header
                        color='olive'
                        dividing
                        content='Crear un evento'
                        subheader='Sigue la secuencia para registrar un evento en el sistema'
                        icon='calendar plus'
                    />
                    <Step.Group size='mini' fluid>
                        <Step active={locator === 0 ? true : false}>
                            <Icon name='info' />
                            <Step.Content>
                                <Step.Title>Información general</Step.Title>
                                <Step.Description>Defina los datos esenciales del evento.</Step.Description>
                            </Step.Content>
                        </Step>

                        <Step active={locator === 1 ? true : false}>
                            <Icon name='edit' />
                            <Step.Content>
                                <Step.Title>Registros</Step.Title>
                                <Step.Description>Seleccione o cree nuevos registros relacionados con el evento.</Step.Description>
                            </Step.Content>
                        </Step>

                    </Step.Group>

                    <Transition.Group animation='fade left' duration={{ hide, show }}>
                        {locator === 0 &&
                            <div>
                                <Header color='grey'>Descripción del evento:</Header>
                                <Segment style={{ contentAlign: 'center' }}>
                                    <Form >
                                        <Form.Group>
                                            <Form.Input
                                                label='Titulo del evento'
                                                placeholder='Escribre aquí'
                                                width={12}
                                                value={title}
                                                name='title'
                                                onChange={this.handleChange}
                                            />
                                            <Form.Select
                                                label='Tipo de evento'
                                                placeholder='Seleccione'
                                                options={tipoevento}
                                                value={type}
                                                name='type'
                                                onChange={this.handleChange}
                                            />
                                            <Form.Select
                                                label='Tipo de proyecto'
                                                placeholder='Seleccione'
                                                options={tipoproyecto}
                                                value={project_type}
                                                name='project_type'
                                                onChange={this.handleChange}
                                            />
                                        </Form.Group>
                                        <Form.TextArea
                                            label='Descripción del evento'
                                            placeholder='Llame la atención del participante describiendo el tema del evento.'
                                            name='description'
                                            value={description}
                                            onChange={this.handleChange}
                                        />
                                        <Form.Input
                                            width={8}
                                            label='Beneficiados'
                                            placeholder='Personas beneficiadas por el evento'
                                            value={beneficiados}
                                            name='beneficiados'
                                            onChange={this.handleChange}
                                        />

                                    </Form>
                                </Segment>
                                <Header color='grey'>Fechas de realización:</Header>
                                <Segment>
                                    <Form>
                                        <Form.Group>
                                            <Form.Input
                                                type='date'
                                                label='Fecha de inicio'
                                                name='start_date'
                                                value={start_date}
                                                onChange={this.handleChange}
                                            />
                                            <Form.Input
                                                type='date'
                                                label='Fecha de finalización'
                                                name='end_date'
                                                value={end_date}
                                                onChange={this.handleChange}

                                            />
                                            <Form.Input
                                                label='Duración'
                                                placeholder='Ej: 3 días, 4 horas...'
                                                name='duration'
                                                value={duration}
                                                onChange={this.handleChange}
                                            />
                                        </Form.Group>
                                        <Header as='h5' color='grey'>Horarios:</Header>
                                        {horarios?.map((x, i) => {
                                            return (
                                                <Form.Group>
                                                    <Form.Input
                                                        type='date'
                                                        label='Fecha'
                                                        index={i}
                                                        name='fecha'
                                                        value={x.fecha}
                                                        onChange={this.handleHorariosChange}
                                                    />
                                                    <Form.Input
                                                        type='time'
                                                        label='Hora de realización'
                                                        index={i}
                                                        name='hora'
                                                        value={x.hora}
                                                        onChange={this.handleHorariosChange}
                                                    />
                                                    <div style={{ marginTop: '4vh' }}>
                                                        {horarios.length !== 1 &&
                                                            <Button
                                                                compact
                                                                onClick={() => this.handleRemoveClick(i)}
                                                            >Quitar</Button>}
                                                        {horarios.length - 1 === i &&
                                                            <Button
                                                                compact
                                                                onClick={this.handleAddClick}
                                                            >Añadir</Button>}
                                                    </div>
                                                </Form.Group>
                                            )
                                        })}

                                    </Form>
                                </Segment>

                            </div>
                        }

                        {locator === 1 &&
                            <div>
                                


                            </div>
                        }
                    </Transition.Group>


                    <Button
                        style={{ marginTop: '3vw' }}
                        content='Registrar evento'
                        color='green'
                        labelPosition='right'
                        icon='check'
                        disabled={this.enableButton()}
                        onClick={this.registerEvent}
                    />


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