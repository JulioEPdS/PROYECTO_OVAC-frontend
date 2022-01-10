import Axios from 'axios'
import { Component } from 'react'
import { Button, Header, Modal, Icon, Form, Image, Transition, Message } from 'semantic-ui-react'
import { AuthContext } from '../../../../../auth/AuthContext'
import config from '../../../../../config'

const tipos = [
    { key: 'cons', text: 'Constancia', value: 'CONSTANCIA' },
    { key: 'reco', text: 'Reconocimiento', value: 'RECONOCIMIENTO' },
    { key: 'cert', text: 'Certificado', value: 'CERTIFICADO' },
    { key: 'dipl', text: 'Diploma', value: 'DIPLOMA' },
    { key: 'otro', text: 'Otro', value: 'OTRO' }
]

const datosAutomatizados = [
    { key: 'tat', text: 'Texto antes del tipo de documento', value: 'value1' },
    { key: 'tdd', text: 'Tipo de documento', value: 'value2' },
    { key: 'ndp', text: 'Nombre de la persona', value: 'value3' },
    { key: 'tae', text: 'Texto antes del Evento', value: 'value4' },
    { key: 'nde', text: 'Nombre del Evento', value: 'value5' },
    { key: 'lyf', text: 'Lugar y Fecha', value: 'value6' }
]

export default class ConstanciasModalForm extends Component {

    static contextType = AuthContext

    constructor(props) {
        super(props)
        this.state = {
            open: false,

            //FIELDS
            name: '',
            type: '',
            description: '',
            base: '', //CONTAINS IMAGE
            basename: '',


            //MULTI OPTION SELECTION
            selection: [],

            //FIRST CONTENT, THEN STATE OF THE FIELD
            TAT: '',//TEXTO ANTES TIPO
            TATvisible: false,

            TDD: '',//TIPO DE DOCUMENTO
            TDDprint: false,
            TDDvisible: false,


            NDP: false,//NOMBRE DE LA PERSONA

            TAE: '',//TEXTO ANTES EVENTO
            TAEvisible: false,

            NDE: false,//NOMBRE DEL EVENTO
            LYF: false,//LUGAR Y FECHA

            //Para definir los estados de envío            
            sendingdata: false, //enviando
            errorsending: false, //error al enviar
            duplicated: false,
            successending: false, //enviado correctamente

        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.buttonEnabler = this.buttonEnabler.bind(this)
        this.dropdownChange = this.dropdownChange.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)


        this.exit = this.exit.bind(this)
        this.open = this.open.bind(this)
    }

    open() {
        this.setState({ open: true })
    }

    exit() {
        this.setState({ open: false })
        //this.props.parentCallback('cancelled')
        this.props.parentCallback('reload')
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value })

        if (name === 'type') {
            const { TDDprint } = this.state
            if (TDDprint) {
                if (value === 'OTRO') {
                    this.setState({ TDDvisible: true, TDD: '' })
                }
                else {
                    this.setState({ TDDvisible: false, TDD: value })
                }
            }
            else {
                this.setState({ TDD: value })
            }

        }

    }

    handleInputChange(e) {
        this.setState({
            base: e.target.files[0],
            basename: e.target.files[0]
        })

        if (e.target.files && e.target.files[0]) {
            this.setState({
                base: URL.createObjectURL(e.target.files[0]),
                basename: e.target.files[0]
            });
        }
    }


    dropdownChange(e, { value }) {
        const { type } = this.state
        this.setState({ selection: value })

        if (value.find(element => element === 'value1')) {
            this.setState({ TATvisible: true })
        }
        else {
            this.setState({ TATvisible: false })
        }

        if (value.find(element => element === 'value2')) {
            if (type === 'OTRO') {
                this.setState({ TDDvisible: true, TDDprint: true })
            }
            else {
                this.setState({ TDDvisible: false, TDDprint: true })
            }

        }
        else {
            this.setState({ TDDvisible: false, TDDprint: false })
        }

        if (value.find(element => element === 'value3')) {
            this.setState({ NDP: true })
        }
        else {
            this.setState({ NDP: false })
        }

        if (value.find(element => element === 'value4')) {
            this.setState({ TAEvisible: true })
        }
        else {
            this.setState({ TAEvisible: false })
        }

        if (value.find(element => element === 'value5')) {
            this.setState({ NDE: true })
        }
        else {
            this.setState({ NDE: false })
        }

        if (value.find(element => element === 'value6')) {
            this.setState({ LYF: true })
        }
        else {
            this.setState({ LYF: false })
        }
    }

    buttonEnabler() {
        const { name, type, description, base, TAT, TATvisible, TDD, TDDvisible, TAE, TAEvisible, selection } = this.state
        if (name.length > 5 &&
            type.length > 5 &&
            description.length > 5 &&
            base.length > 0 &&
            selection.length > 0 &&
            ((TATvisible && TAT.length > 5) || !TATvisible) &&
            ((TDDvisible && TDD.length > 5) || !TDDvisible) &&
            ((TAEvisible && TAE.length > 5) || !TAEvisible)
        ) {

            return false
        }
        else {
            return true
        }
    }

    async handleSubmit() {
        //IMPORT THE STATE DATA/////////////////////////////////////////////////////
        const { name, type, description, basename, base } = this.state
        const { user } = this.context

        //GENERATE CONFIG STRING////////////////////////////////////////////////////
        const configstring = this.configConstructor()

        //INITIALIZE THE DATA TO SEND///////////////////////////////////////////////
        //INITIALIZE FORMDATA///////////////////////////////////////////////////////
        var bodyFormData = new FormData()

        bodyFormData.append('name', name)
        bodyFormData.append('type', type)
        bodyFormData.append('description', description)
        bodyFormData.append('base', basename)
        bodyFormData.append('config', configstring)
        bodyFormData.append('user_id', user.id)

        await Axios({
            method: 'POST',
            url: config.REACT_APP_apiURL + '/objects/certdoc',
            data: bodyFormData,
            headers: {
                "Authorization": "Bearer " + user.token,
                "Content-Type": "multipart/form-data"
            }
        })
            .then(
                (result) => {
                    this.setState({
                        duplicated: false,
                        sendingdata: false,
                        errorsending: false,
                        successending: true,
                    })
                    setTimeout(() => {
                        this.props.parentCallback('reload')
                        this.setState({ open: false, successending: false })
                    }, 2000)

                },
                (error) => {
                    //409 ya existe alguno en BD
                    //401 no autorizado
                    //400 bad request
                    if (error.response.status === 409) {
                        this.setState({
                            duplicated: true,
                            sendingdata: false,
                            successending: false
                        })
                    }
                    else {
                        this.setState({
                            duplicated: false,
                            sendingdata: false,
                            errorsending: true,
                            successending: false
                        })
                    }

                    console.log(error.response)

                }
            )
            .catch((error) => {
                //error al enviar data, no se pudo comunicar con el servidor                
                this.setState({
                    sendingdata: false,
                    errorsending: true
                })
                setTimeout(() => {
                    this.props.parentCallback('reload')
                    this.setState({ open: false })
                }, 2000)
            })


    }


    //CONFIGURATION//////////////////////////////////////////////////////////////////////////
    //Designada a crear la cadena de configuración de la constancia//////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////
    configConstructor() {
        const { TAT, TATvisible, TDD, TDDprint, NDP, TAE, TAEvisible, NDE, LYF } = this.state


        //ARRAY NEEDED TO CONFIG THE FILE
        let config = '{'

        //ADD TAT TO CONFIG IF has content
        if (TATvisible && TAT.length > 0) {
            //NEED TO ADD INFO TO CONFIG STRING
            config = config + '"textBeforeType":"true","textBeforeTypeContent":"' + TAT + '"'
        }

        //ADD TDD TO CONFIG IF has content
        if (TDDprint && TDD.length > 0) {
            //NECESARIO POR SI SE TRATA (O NO) DE PRIMERA CONFIG
            if (config.length > 2) {
                config = config + ','
            }
            config = config + '"documentType":"true","documentTypeContent":"' + TDD + '"'
        }

        //ADD NDP TO CONFIG IF true
        if (NDP) {
            //NECESARIO POR SI SE TRATA (O NO) DE PRIMERA CONFIG
            if (config.length > 2) {
                config = config + ','
            }
            config = config + '"nombrePersona":"true"'
        }

        //ADD TAE TO CONFIG IF has content
        if (TAEvisible && TAE.length > 0) {
            //NECESARIO POR SI SE TRATA (O NO) DE PRIMERA CONFIG
            if (config.length > 2) {
                config = config + ','
            }
            config = config + '"textoSecundario": "true","textoSecundarioContent": "' + TAE + '"'
        }

        //ADD NDE TO CONFIG IF
        if (NDE) {
            //NECESARIO POR SI SE TRATA (O NO) DE PRIMERA CONFIG
            if (config.length > 2) {
                config = config + ','
            }
            config = config + '"eventName":"true"'
        }

        //ADD LYF TO CONFIG IF
        if (LYF) {
            //NECESARIO POR SI SE TRATA (O NO) DE PRIMERA CONFIG
            if (config.length > 2) {
                config = config + ','
            }
            config = config + '"dateAndPlace": "true"'

        }

        config = config + '}'

        return config
    }


    render() {
        const { open,
            type,
            name,
            description,
            base,


            sendingdata, //enviando
            errorsending, //error al enviar
            duplicated,
            successending, //enviado correctamente

            //VISIBLE STATES
            TATvisible, TDDvisible, TAEvisible,
            TDDprint,
            //VALUES AND STATES
            TAT, TDD, NDP, TAE, NDE, LYF
        } = this.state
        const { disabled } = this.props
        return (
            <Modal
                open={open}
                style={{ width: '50vw', marginLeft: '-20vw' }}
                trigger={
                    <Button
                        animated='fade'                        
                        floated='right'
                        style={{ 
                            backgroundColor: "#aa8f18", 
                            color: "#ffffff"                                                    
                        }}                                                
                        disabled={disabled}                        
                        onClick={this.open}
                    >
                        <Button.Content visible>
                            Crear nueva <Icon name="file alternate" />
                        </Button.Content>
                        <Button.Content hidden>
                            Constancia <Icon name="add circle" />
                        </Button.Content>
                    </Button>
                }
            >
                <Modal.Header style={{ color: "#aa8f18" }}>
                    <Icon name='file alternate' style={{ color: '#aa8f18' }} />
                    Crear nueva constancia
                </Modal.Header>
                <Modal.Content>

                    <Modal.Description style={{ marginBottom: '1rem' }}>
                        <Header color='grey'>Por favor llene los siguientes campos:</Header>
                    </Modal.Description>

                    <Image size='medium' src={base} alt='Esperando base...' style={{ position: 'fixed', left: '55vw', top: '40vh' }} />

                    {
                        TATvisible && <p style={{ position: 'fixed', left: '56vw', top: '24vw', width: '20vw', textAlign: 'center', fontSize: '0.4rem' }}>{TAT}</p>
                    }

                    {
                        TDDprint && <p style={{ position: 'fixed', left: '56vw', top: '25vw', width: '20vw', textAlign: 'center', color: '#b6a459' }}>{TDD}</p>
                    }

                    {
                        NDP && <p style={{ position: 'fixed', left: '56vw', top: '27vw', width: '20vw', textAlign: 'center', color: '#343432' }}>NOMBRE DE LA PERSONA</p>
                    }

                    {
                        TAEvisible && <p style={{ position: 'fixed', left: '56vw', top: '29vw', width: '20vw', textAlign: 'center', fontSize: '0.5rem' }}>{TAE}</p>
                    }

                    {
                        NDE && <p style={{ position: 'fixed', left: '56vw', top: '30vw', width: '20vw', textAlign: 'center', color: '#343432' }}>"NOMBRE DEL EVENTO"</p>
                    }

                    {
                        LYF && <p style={{ position: 'fixed', left: '56vw', top: '32vw', width: '20vw', textAlign: 'center', color: '#343432', fontSize: '0.4rem' }}>TUXTLA GUTIERREZ, CHIAPAS; 00/00/0000</p>
                    }


                    <Form>
                        <Form.Input
                            fluid
                            value={name}
                            name='name'
                            onChange={this.handleChange}
                            label='Defina un nombre con el que se diferencie de las demás'
                            placeholder='Ej. Constancia básica banda café derecha'
                        />

                        <Form.TextArea
                            value={description}
                            name='description'
                            onChange={this.handleChange}
                            label='Descripción'
                            placeholder='Ej. Categoría para eventos relacionados con ...'
                        />

                        <Form.Group>
                            <Form.Select
                                fluid
                                width='5'
                                label='Tipo de documento'
                                name='type'
                                value={type}
                                options={tipos}
                                onChange={this.handleChange}
                                placeholder='Elige alguno:'
                            />
                            <Header size='tiny' floated='right'>Formato base del documento (imágen)
                                <input style={{ backgroundColor: '' }} name="base" type="file" onChange={this.handleInputChange} />
                            </Header>
                        </Form.Group>


                        <Form.Dropdown
                            placeholder='Seleccione texto a imprimir...'
                            fluid
                            multiple
                            selection
                            options={datosAutomatizados}
                            onChange={this.dropdownChange}
                            label='Seleccione qué información debe imprimirse automáticamente'
                        />

                        {TATvisible &&
                            <Form.Input
                                label='Texto antes del tipo de documento'
                                name='TAT'
                                placeholder='Otorga el/la presente/siguiente'
                                value={TAT}
                                onChange={this.handleChange}
                            />
                        }
                        {TDDvisible &&
                            <Form.Input
                                label='Tipo de documento'
                                name='TDD'
                                placeholder='Carta, documento, etc.'
                                value={TDD}
                                onChange={this.handleChange}
                            />
                        }
                        {TAEvisible &&
                            <Form.Input
                                label='Texto antes del nombre del evento'
                                name='TAE'
                                placeholder='Por haber participado en la plática/evento/curso, etc.'
                                value={TAE}
                                onChange={this.handleChange}
                            />
                        }

                    </Form>
                    <Transition.Group>
                        {successending &&
                            <Message
                                success
                                header='Se creó exitosamente'
                                content='Ya se puede utilizar esta constancia en los eventos'
                            />
                        }
                        {errorsending &&
                            <Message
                                error
                                header='No se pudo crear la constancia :('
                                content='No hubo comunicación con el servidor, revise su conexión a internet, o informe este problema a sistemas'
                            />
                        }
                        {duplicated &&
                            <Message
                                warning
                                header='Ya existe una constancia con este mismo nombre'
                                content='Los registros duplicados generan conlictos, modifique el nombre o utilice el certificado que ya existe'
                            />
                        }
                    </Transition.Group>
                </Modal.Content>

                <Modal.Actions>
                    <Button
                        color='black'
                        onClick={this.exit}>
                        Cancelar
                    </Button>
                    <Button
                        content="Crear constancia"
                        labelPosition='right'
                        icon='checkmark'
                        loading={sendingdata}
                        onClick={this.handleSubmit}
                        positive
                    />
                </Modal.Actions>
            </Modal>
        )
    }

}
