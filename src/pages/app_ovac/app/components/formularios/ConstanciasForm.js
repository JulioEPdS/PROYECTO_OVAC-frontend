import { Component } from 'react'
import { Button, Header, Modal, Icon, Form, Image } from 'semantic-ui-react'
import { AuthContext } from '../../../../../auth/AuthContext'

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


            //MULTI OPTION SELECTION
            selection: [],

            //FIRST CONTENT, THEN STATE OF THE FIELD
            TAT: '',//TEXTO ANTES TITULO
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

    handleSubmit() {
        //IMPORT THE STATE DATA
        const { name, type, description, base } = this.state

        const config = this.configConstructor()

        //INITIALIZE THE DATA TO SEND///////////////////////////////////////////////
        //INITIALIZE FORMDATA///////////////////////////////////////////////////////
        var bodyFormData = new FormData()
        bodyFormData.append('name', name)
        bodyFormData.append('type', type)
        bodyFormData.append('description', description)
        bodyFormData.append('base', base)
        bodyFormData.append('config', config)

        for (var value of bodyFormData.values()) {
            console.log(value)
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


    render() {
        const { open,
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
        const { disabled } = this.props
        return (
            <Modal
                open={open}
                style={{ width: '50vw', marginLeft: '-20vw' }}
                trigger={
                    <Button
                        animated='fade'
                        floated="right"
                        style={{ backgroundColor: "#aa8f18", color: "#ffffff" }}
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
                        TATvisible && <p style={{ position: 'fixed', left: '63vw', top: '23.5vw', width: '20vw', fontSize: '0.4rem' }}>{TAT}</p>
                    }

                    {
                        TDDprint && <p style={{ position: 'fixed', left: '55vw', top: '43vw', width: '20vw' }}>{TDD}</p>
                    }

                    {
                        NDP && <p style={{ position: 'fixed', left: '55vw', top: '45vw', width: '20vw' }}>NOMBRE DE LA PERSONA</p>
                    }

                    {
                        TAEvisible && <p style={{ position: 'fixed', left: '55vw', top: '47vw', width: '20vw' }}>{TAE}</p>
                    }

                    {
                        NDE && <p style={{ position: 'fixed', left: '55vw', top: '49vw', width: '20vw' }}>"NOMBRE DEL EVENTO"</p>
                    }

                    {
                        LYF && <p style={{ position: 'fixed', left: '55vw', top: '51vw', width: '20vw' }}>TUXTLA GUTIERREZ, CHIAPAS; 00/00/0000</p>
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
                                <input style={{ backgroundColor: '' }} id="base" type="file" onChange={this.handleInputChange} />
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
                        onClick={this.handleSubmit}
                        positive
                    />
                </Modal.Actions>
            </Modal>
        )
    }

}
