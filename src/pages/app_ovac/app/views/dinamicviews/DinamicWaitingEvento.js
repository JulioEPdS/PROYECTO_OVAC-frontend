import { AuthContext } from '../../../../../auth/AuthContext'
import { Component } from 'react'
import { Image, Segment, Header, Button, Icon, Step, Transition, Form, Message, List, Grid } from 'semantic-ui-react'

import Moment from 'moment'
import 'moment/locale/es-mx'

import Axios from 'axios'

import config from '../../../../../config'
//import { NavLink } from 'react-router-dom'

import events from '../../img/events.svg'
import CategoriasModalForm from '../../components/formularios/CategoriasForm'



export default class DinamicWaitingEvento extends Component {
    //Necesario para extraer token e id user
    static contextType = AuthContext

    constructor(props) {
        super(props)
        this.state = {

            //Extraer el parámetro de ID para consultar 
            evento: this.props.match.params.id,

            locator: 0,
            hide: 100,
            show: 400,

            sucessSending: false,
            errorSending: false,            


            //Event info guardada
            title: 'esperando..',
            type: 'esperando..',
            project_type: 'esperando..',
            description: 'esperando..',
            duration: 'esperando..',
            start_date: 'esperando..',
            end_date: 'esperando..',
            horarios: [{ fecha: "", hora: "" }],//JSON.stringify            
            certdoc: 'esperando..',
            ponente: 'esperando..',
            organismo: 'esperando..',
            formulario: 'esperando..',
            beneficiados: 'esperando..',


            banner: null,//Para presentar imagen            
            optionscategorias: [{ key: 0, text: "No hay datos en la bd", value: null }],
            //INFORMACIÓN A ENVIAR    
            bannersend: null, //Imagen para enviar
            text_mail: [{ invitacion: "", recordatorio: "", ponente: "" }],//JSON.stringify
            categorias: [],


            //FOR FETCHING DATA///////////////////////////////////////////////////            
            waitingFetch: false,
            waitingCats: false,
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

        this.dropdownChange = this.dropdownChange.bind(this)

        //Information FETCHING
        this.fetchregistros = this.fetchregistros.bind(this)
        this.getCategorias = this.getCategorias.bind(this)


        //SENDING DATA
        this.activateEvent = this.activateEvent.bind(this)


        this.enableButton = this.enableButton.bind(this)
    }

    componentDidMount() {
        this.fetchregistros()
        this.getCategorias()

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
    handleInputChange(e) {
        this.setState({
            banner: e.target.files[0],
            bannersend: e.target.files[0]
        })

        if (e.target.files && e.target.files[0]) {
            this.setState({
                banner: URL.createObjectURL(e.target.files[0]),
                bannersend: e.target.files[0]
            });
        }
    }
    handleTextChange = (e, { name, value }) => {
        //const { name, value } = e.target
        const { text_mail } = this.state

        const list = [...text_mail]
        list[0][name] = value
        this.setState({ text_mail: list })
    }
    dropdownChange(e, { value }) {
        const { categorias, evento } = this.state

        if (categorias.find((seleccion => seleccion.categoria === value.at(-1)))) {
            return
        }
        else {
            const list = [...categorias, { id: evento, categoria: value.at(-1) }]
            this.setState({ categorias: list })
        }


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


        await Axios.get(config.REACT_APP_apiURL + '/eventos/espera/' + evento, {
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

                        beneficiados: result.data[0].beneficiados

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
    async getCategorias() {
        this.setState({ waiting: true, waitingFetch: true })
        const { user } = this.context
        Axios.get(config.REACT_APP_apiURL + '/objects/categorias/n', {
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
            .then((result) => {



                let list = []
                result.data[0].map((x) => (
                    list = [...list, { key: x.id, text: x.name, value: x.id, icon: x.icon }]
                ))



                this.setState({
                    waitingCats: false,
                    waitingFetch: false,
                    optionscategorias: list
                })

            })
            .catch(
                (error) => {
                    this.setState({
                        fetchError: true,
                        waitingCats: false,
                        waitingFetch: false
                    })
                }
            )

    }
    promptReloadData = (childData) => {
        if (childData === 'reload') {
            this.fetchregistros()
            this.getCategorias()
        }
    }


    //BUTTON ENABLER///////////////////////////////////////////
    enableButton() {
        const {
            //EVENT INFO
            text_mail,
            bannersend,
            categorias,
            fetchError
        } = this.state

        if (
            //EVENT INFO
            text_mail &&
            bannersend &&
            categorias &&
            !fetchError) {
            return false
        }
        else {
            return true
        }
    }

    //DATA SEND/////////////////////////////////////////////////
    async activateEvent() {
        const { user } = this.context
        const {
            evento,
            text_mail,
            bannersend,
            categorias
        } = this.state


        var bodyFormData = new FormData()



        bodyFormData.append('id', evento)
        bodyFormData.append('text_mail', JSON.stringify(text_mail))
        bodyFormData.append('banner', bannersend)
        bodyFormData.append('categorias', JSON.stringify(categorias))
        bodyFormData.append('user_id', user.id)


        await Axios({
            method: 'POST',
            url: config.REACT_APP_apiURL + '/eventos/activateEvent',
            data: bodyFormData,
            headers: {
                "Authorization": "Bearer " + user.token,
                "Content-Type": "multipart/form-data"
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
            fetchError,
            waitingFetch,


            //EVENT INFO
            title,
            type,
            project_type,
            description,
            duration,
            start_date,
            end_date,
            horarios,//JSON.stringify
            //registros
            certdoc,
            ponente,
            organismo,
            formulario,
            //registros


            optionscategorias,
            text_mail,


            beneficiados,
            banner



        } = this.state

        return (
            <>
                <Segment>
                    <Header
                        color='green'
                        dividing
                        content='Preparar evento para activación'
                        subheader='Sigue la secuencia para registrar un evento en el sistema'
                        icon='calendar check'
                    />
                    <Step.Group size='mini' fluid>
                        <Step active={locator === 0 ? true : false}>
                            <Icon name='info' />
                            <Step.Content>
                                <Step.Title>Información general</Step.Title>
                                <Step.Description>Revise los datos que fueron registrados.</Step.Description>
                            </Step.Content>
                        </Step>

                        <Step active={locator === 1 ? true : false}>
                            <Icon name='checkmark' />
                            <Step.Content>
                                <Step.Title>Activar evento</Step.Title>
                                <Step.Description>Defina los ultimos elementos del evento para hacerlo público.</Step.Description>
                            </Step.Content>
                        </Step>

                    </Step.Group>

                    <Transition.Group animation='fade left' duration={{ hide, show }}>
                        {locator === 0 &&
                            <div>
                                <Header color='grey'>Datos del evento:</Header>

                                <Grid>

                                    <Grid.Row columns={2}>
                                        <Grid.Column>
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

                                        </Grid.Column>
                                        <Grid.Column>
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

                                        </Grid.Column>

                                    </Grid.Row>

                                    <Grid.Row>
                                        <Grid.Column>

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

                                        </Grid.Column>

                                    </Grid.Row>
                                </Grid>

                            </div>
                        }

                        {locator === 1 &&
                            <div>
                                <Header color='grey'>Por favor proporcione lo siguiente:</Header>
                                <Form>
                                    <Form.TextArea
                                        label='Texto en correo de invitación'
                                        placeholder='Defina el texto que acompañará al banner al momento de enviar una invitación.'
                                        name='invitacion'
                                        value={text_mail.invitacion}
                                        onChange={this.handleTextChange}
                                    />
                                    <Form.TextArea
                                        label='Texto en correo de recordatorio'
                                        placeholder='Defina el texto para el correo de recordatorio antes de la realización del evento.'
                                        name='recordatorio'
                                        value={text_mail.recordatorio}
                                        onChange={this.handleTextChange}
                                    />
                                    <Form.TextArea
                                        label='Texto en correo para el ponente'
                                        placeholder='Defina el texto que acompañará el correo de reconocimiento al ponente.'
                                        name='ponente'
                                        value={text_mail.ponente}
                                        onChange={this.handleTextChange}
                                    />

                                    <Form.Dropdown
                                        label='Seleccione las categorias relacionadas con el evento'
                                        placeholder='Seleccione una o más...'
                                        fluid
                                        multiple
                                        selection
                                        options={optionscategorias}
                                        onChange={this.dropdownChange}
                                    />

                                    <CategoriasModalForm
                                        customstyle={{                                            
                                            backgroundColor: "#a95168",
                                            color: "#ffffff"
                                        }}
                                        disabled={waitingFetch || fetchError}
                                        parentCallback={this.promptReloadData}
                                    />

                                    <Header size='tiny'>Banner del evento
                                        <input style={{ backgroundColor: '' }} name="banner" type="file" onChange={this.handleInputChange} />
                                    </Header>
                                </Form>
                                <Image size='medium' style={{ marginTop: '3vw' }} src={banner} alt='Esperando banner...' />


                            </div>
                        }
                    </Transition.Group>


                    <Button
                        style={{ marginTop: '3vw' }}
                        content='Activar evento'
                        color='green'
                        labelPosition='right'
                        icon='check'
                        disabled={this.enableButton()}
                        onClick={this.activateEvent}
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

                        {fetchError &&
                            <Message
                                error
                                header='No se ha podido consultar información'
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