import { Component } from 'react'
import { Header, Icon, Segment, Image, Button, Form, Transition, Message, Modal } from 'semantic-ui-react'
import { AuthContext } from '../../../../../auth/AuthContext'
import Axios from 'axios'
import config from '../../../../../config'

//import Axios from 'axios'
import { NavLink } from 'react-router-dom'

import chore from '../../img/chore.svg'


const tipos = [
    { key: 'cons', text: 'Constancia', value: 'CONSTANCIA' },
    { key: 'reco', text: 'Reconocimiento', value: 'RECONOCIMIENTO' },
    { key: 'cert', text: 'Certificado', value: 'CERTIFICADO' },
    { key: 'dipl', text: 'Diploma', value: 'DIPLOMA' },
    { key: 'otro', text: 'Otro', value: 'OTRO' }
]

const datosAutomatizados = [
    { key: 'tat', text: 'Texto antes del type', value: 'value1' },
    { key: 'tdd', text: 'Tipo de documento', value: 'value2' },
    { key: 'ndp', text: 'Nombre de la persona', value: 'value3' },
    { key: 'tae', text: 'Texto antes del Evento', value: 'value4' },
    { key: 'nde', text: 'Nombre del Evento', value: 'value5' },
    { key: 'lyf', text: 'Lugar y Fecha', value: 'value6' }
]


export default class DinamicConstancia extends Component {

    //Necesario para extraer token e id
    static contextType = AuthContext

    constructor(props) {
        super(props)
        this.state = {
            //Extraer el parámetro de ID para consultar 
            constancia: this.props.match.params.id,

            //Estado del componente
            edit: false,
            waiting: false,
            successending: false,
            errorsending: false,

            //Estado del modal
            open: false,
            successdisable: false,
            errordisable: false,

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
        }

        this.getBase = this.getBase.bind(this)
        this.fetchInfo = this.fetchInfo.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.dropdownChange = this.dropdownChange.bind(this)
        this.handleDisableCat = this.handleDisableCat.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleModalCancel = this.handleModalCancel.bind(this)
        this.handlePrimaryButton = this.handlePrimaryButton.bind(this)
        this.handleSecondaryButton = this.handleSecondaryButton.bind(this)


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

    componentDidMount() {
        //FETCH THE INFO
        this.fetchInfo()
        //this.getBase()

    }


    /* SOLICITUDES A LA API ///////////////////*/
    /* Consulta, Actualización y Desactivación */
    /* /////////////////////////////////////// */
    async fetchInfo() { /* CONSULTA */

        //FORCE ALL TO DEFAULT THEN RELOAD INFO FROM API
        this.setState({ 
            waiting: true,
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
        })

        //FETCH THE INFO AGAIN THEN SET TO STATUS
        const { user } = this.context
        const { constancia } = this.state
        await Axios.get(config.REACT_APP_apiURL + '/objects/certdocs/' + constancia, {
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
            .then((result) => {


                this.setState({

                    waiting: false,

                    //Información de la constancia
                    name: result.data[0].name,
                    type: result.data[0].type,
                    description: result.data[0].description
                })

                //EXTRACTION OF THE CONFIGURATION
                const config = JSON.parse(result.data[0].config)
                let values = []
                if (config?.textBeforeType === "true") {
                    //Seleccionar V1                    
                    values.push('value1')
                    let content = config.textBeforeTypeContent
                    this.setState({ TAT: content, TATvisible: true })
                }
                if (config?.documentType === "true") {
                    //Seleccionar V2
                    values.push('value2')
                    let content = config.documentTypeContent
                    this.setState({ TDD: content, TDDvisible: true, TDDprint: true })
                }
                if (config?.nombrePersona === "true") {
                    values.push('value3')
                    //Seleccionar V3                    
                    this.setState({ NDP: true })
                }
                if (config?.textoSecundario === "true") {
                    //Seleccionar V4
                    values.push('value4')
                    let content = config.textoSecundarioContent
                    this.setState({ TAE: content, TAEvisible: true })
                }
                if (config?.eventName === "true") {
                    //Seleccionar V5               
                    values.push('value5')
                    this.setState({ NDE: true })
                }

                this.setState({ selection: values })



            })
    }

    async getBase() {
        const { user } = this.context
        const { constancia } = this.state


        fetch(config.REACT_APP_apiURL + '/objects/certdocs/base/' + constancia, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + user.token
            },
        })
            .then((data) => {
                this.setState({ base: data })
            })

        /*await Axios.get(config.REACT_APP_apiURL + '/objects/certdocs/base/' + constancia, {
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
            .then(
                (data) => {
                    let image = JSON.parse(data)
                    this.setState({ base: image})
                },

                (result) =>{
                    console.log(result)
                }
            )*/

    }//CÓDIGO SIN FUNCIONAR, ATENDER PARA MOSTRAR IMÁGEN DESDE API

    async updateInfo() {
        //IMPORT THE STATE DATA/////////////////////////////////////////////////////
        const { name, type, description, basename, constancia } = this.state
        const { user } = this.context

        //GENERATE CONFIG STRING////////////////////////////////////////////////////
        const configstring = this.configConstructor()

        //INITIALIZE THE DATA TO SEND///////////////////////////////////////////////
        //INITIALIZE FORMDATA///////////////////////////////////////////////////////
        var bodyFormData = new FormData()
        bodyFormData.append('id', constancia)
        bodyFormData.append('name', name)
        bodyFormData.append('type', type)
        bodyFormData.append('description', description)
        bodyFormData.append('base', basename)
        bodyFormData.append('config', configstring)
        bodyFormData.append('user_id', user.id)

        await Axios({
            method: 'PUT',
            url: config.REACT_APP_apiURL + '/objects/certdocs/update',
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

                },
                (error) => {
                    //409 ya existe alguno en BD
                    //401 no autorizado
                    //400 bad request
                    if (error.response.status === 409) {
                        this.setState({                            
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
                    

                }
            )
            .catch((error) => {
                //error al enviar data, no se pudo comunicar con el servidor                
                this.setState({
                    sendingdata: false,
                    errorsending: true
                })                          
            })

            setTimeout(() => {
                this.fetchInfo()
                this.setState({ successending: false, errorsending: false })
            }, 3000)


    }

    async disable() { /* DESHABILITACIÓN */
        const { constancia } = this.state
        this.setState({ waiting: true })
        const { user } = this.context

        Axios.delete(config.REACT_APP_apiURL + '/objects/certdocs/delete/' + constancia, {
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
            .then(
                (result) => {
                    this.setState({ successdisable: true })

                    setTimeout(() => {
                        this.props.history.replace('/app/datos')
                    }, 2000)
                },

                (error) => {
                    console.log(error)
                    setTimeout(() => {
                        this.setState({ errordisable: true })
                    }, 100)
                    setTimeout(() => {
                        this.setState({ errordisable: false, open: false })
                    }, 2000)
                }
            )
            .catch(
                (error) => { console.log(error) }
            )
    }


    /* Manejo de botones de acción /////////// */
    /* Habilitar edición, desactivar, cancelar */
    /* /////////////////////////////////////// */

    handlePrimaryButton(Content) {
        if (Content === 'Guardar') {
            //Acciones para guardar cambios
            this.updateInfo()
            this.setState({ edit: false })
        }
        else {
            //Acciones para permitir editar
            this.setState({ edit: true })
        }
    }

    handleSecondaryButton(Content) {
        if (Content === 'Desactivar') {
            //Need confirmation
            this.setState({ open: true })
        }

        else {
            //Cancelar, refresh info and change edit state
            this.fetchInfo()
            this.setState({ edit: false })
        }

    }

    handleDisableCat() {
        this.disable()
    }

    handleModalCancel() {
        this.fetchInfo()
        this.setState({ open: false })
    }

    handleInputChange(e) {
        this.setState({
            base: e.target.files[0],
            basename: e.target.files[0]
        })

        if (e.target.files && e.target.files[0]) {
            this.setState({
                base: URL.createObjectURL(e.target.files[0])
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
            if (config.length > 2) {
                config = config + ','
            }
            config = config + '"documentType":"true","documentTypeContent":"' + TDD + '"'
        }

        //ADD NDP TO CONFIG IF true
        if (NDP) {
            if (config.length > 2) {
                config = config + ','
            }
            config = config + '"nombrePersona":"true"'
        }

        //ADD TAE TO CONFIG IF has content
        if (TAEvisible && TAE.length > 0) {
            if (config.length > 2) {
                config = config + ','
            }
            config = config + '"textoSecundario": "true","textoSecundarioContent": "' + TAE + '"'
        }

        //ADD NDE TO CONFIG IF
        if (NDE) {
            if (config.length > 2) {
                config = config + ','
            }
            config = config + '"eventName":"true"'
        }

        //ADD LYF TO CONFIG IF
        if (LYF) {
            if (config.length > 2) {
                config = config + ','
            }
            config = config + '"dateAndPlace": "true"'

        }

        config = config + '}'

        return config
    }





    /* Elementos Gráficos */

    render() {
        const {
            //Estados del componente y subcomponentes
            edit,
            waiting,
            open,
            selection,

            successdisable,
            successending,

            errordisable,
            errorsending,


            type,
            name,
            description,
            base,

            //VISIBLE STATES
            TATvisible, TDDvisible, TAEvisible,
            TDDprint,
            //VALUES AND STATES
            TAT, TDD, NDP, TAE, NDE, LYF

        } = this.state
        return (
            <Segment basic style={{ height: '81vh' }}>
                <Header as='h2' style={{ color: "#AA8F18" }}>
                    <Icon name='file alternate' />
                    <Header.Content>
                        Detalles de la constancia
                        <Header.Subheader>
                            Aquí puedes editar o desactivar la constancia
                        </Header.Subheader>
                    </Header.Content>
                </Header>

                <Image
                    size='medium'
                    src={base}
                    alt='Esperando base...'
                    style={{ position: 'fixed', left: '65vw', top: '30vh' }} />

                {
                    TATvisible && <p style={{ position: 'fixed', left: '66vw', top: '19vw', width: '20vw', textAlign: 'center', fontSize: '0.4rem' }}>{TAT}</p>
                }

                {
                    TDDprint && <p style={{ position: 'fixed', left: '66vw', top: '19.5vw', width: '20vw', textAlign: 'center', color: '#b6a459' }}>{TDD}</p>
                }

                {
                    NDP && <p style={{ position: 'fixed', left: '66vw', top: '21.6vw', width: '20vw', textAlign: 'center', color: '#343432' }}>NOMBRE DE LA PERSONA</p>
                }

                {
                    TAEvisible && <p style={{ position: 'fixed', left: '66vw', top: '23.5vw', width: '20vw', textAlign: 'center', fontSize: '0.5rem' }}>{TAE}</p>
                }

                {
                    NDE && <p style={{ position: 'fixed', left: '66vw', top: '25vw', width: '20vw', textAlign: 'center', color: '#343432' }}>"NOMBRE DEL EVENTO"</p>
                }

                {
                    LYF && <p style={{ position: 'fixed', left: '66vw', top: '27vw', width: '20vw', textAlign: 'center', color: '#343432', fontSize: '0.4rem' }}>TUXTLA GUTIERREZ, CHIAPAS; 00/00/0000</p>
                }


                <Segment stacked style={{ width: '45vw' }}>

                    <Form loading={waiting}>

                        <Form.Input
                            fluid
                            value={name}
                            disabled={!edit}
                            name='name'
                            onChange={this.handleChange}
                            label='Defina un nombre con el que se diferencie de las demás'
                            placeholder='Ej. Constancia básica banda café derecha'
                        />

                        <Form.TextArea
                            value={description}
                            disabled={!edit}
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
                                disabled={!edit}
                                options={tipos}
                                onChange={this.handleChange}
                                placeholder='Elige alguno:'
                            />
                            <Header size='tiny' floated='right'>Formato base del documento (imágen)
                                <input
                                    style={{ backgroundColor: '' }}
                                    disabled={!edit}
                                    name="base"
                                    type="file"
                                    onChange={this.handleInputChange}
                                />
                            </Header>
                        </Form.Group>


                        <Form.Dropdown
                            placeholder='Seleccione texto a imprimir...'
                            fluid
                            multiple
                            selection
                            value={selection}
                            disabled={!edit}
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
                                disabled={!edit}
                                onChange={this.handleChange}
                            />
                        }
                        {TDDvisible &&
                            <Form.Input
                                label='Tipo de documento'
                                name='TDD'
                                placeholder='Carta, documento, etc.'
                                value={TDD}
                                disabled={!edit}
                                onChange={this.handleChange}
                            />
                        }
                        {TAEvisible &&
                            <Form.Input
                                label='Texto antes del nombre del evento'
                                name='TAE'
                                placeholder='Por haber participado en la plática/evento/curso, etc.'
                                value={TAE}
                                disabled={!edit}
                                onChange={this.handleChange}
                            />
                        }

                        <Button
                            color={edit ? 'green' : 'blue'}
                            content={edit ? 'Guardar' : 'Editar'}
                            disabled={waiting}
                            onClick={(e, { content }) => this.handlePrimaryButton(content)}
                        />

                        <Button
                            color={edit ? 'grey' : 'black'}
                            disabled={waiting}
                            content={edit ? 'Cancelar' : 'Desactivar'}
                            onClick={(e, { content }) => this.handleSecondaryButton(content)}
                        />


                    </Form>
                </Segment>


                <Button
                    style={{ position: 'fixed', bottom: '5vh', right: '3vw' }}
                    floated='right'
                    as={NavLink} to='/app/datos'
                    content='Regresar'
                    icon='left arrow'
                    labelPosition='left'
                />

                <Transition.Group>
                    {successending &&
                        <Message
                            success
                            header='Información guardada correctamente'
                            content='Los eventos relacionados con esta categoría conservarán la relación'
                        />
                    }
                    {errorsending &&
                        <Message
                            error
                            header='No se pudo actualizar la información'
                            content='No hubo comunicación con el servidor, revise su conexión a internet, o informe este problema a sistemas'
                        />
                    }

                </Transition.Group>

                <Modal
                    open={open}
                    style={{ width: '50vw' }}>

                    <Modal.Header style={{ color: 'red' }}>
                        <Icon name='exclamation' /> Porfavor confirme la desactivación
                    </Modal.Header>
                    <Modal.Content>
                        <Modal.Description style={{ marginBottom: '1rem' }}>
                            <Header>Está seguro de querer desactivar la constancia: {name}?
                                <Header.Subheader>Esta acción no eliminará datos, pero dejará la constancia fuera de línea
                                    para su uso posterior, la información y eventos relacionados con esta constancia no se verán afectados.

                                    Considere que ya no podrá modificarse información alguna de esta constancia, pero las personas podrán seguir solicitandola si lo desean.
                                </Header.Subheader>
                            </Header>
                        </Modal.Description>


                        <Transition.Group>
                            {successdisable &&
                                <Message
                                    info
                                    header='Se desactivó la categoría exitosamente'
                                />
                            }
                            {errordisable &&
                                <Message
                                    error
                                    header='No se pudo desactivar la categoría'
                                    content='No hubo comunicación con el servidor, revise su conexión a internet, o informe este problema a sistemas'
                                />
                            }
                        </Transition.Group>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            color='black'
                            onClick={this.handleModalCancel}>
                            Cancelar
                        </Button>
                        <Button
                            content='Desactivar'
                            labelPosition='right'
                            icon='trash alternate'
                            negative
                            onClick={this.handleDisableCat}
                        />
                    </Modal.Actions>
                </Modal>


                <Image size='medium' src={chore} alt='Registros' style={{ position: 'fixed', left: '-7vw', top: '65vh', zIndex: '-20', opacity: '.6' }} />
            </Segment>
        )
    }
}