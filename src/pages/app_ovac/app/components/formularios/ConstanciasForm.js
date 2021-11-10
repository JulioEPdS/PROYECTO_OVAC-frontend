import { Component } from 'react'
import { Button, Header, Modal, Icon, Form, Image } from 'semantic-ui-react'
import { AuthContext } from '../../../../../auth/AuthContext'

const tipos = [
    { key: 'cons', text: 'Constancia', value: 'Constancia' },
    { key: 'reco', text: 'Reconocimiento', value: 'Reconocimiento' },
    { key: 'cert', text: 'Certificado', value: 'Certificado' },
    { key: 'dipl', text: 'Diploma', value: 'Diploma' },
    { key: 'otro', text: 'Otro', value: 'Otro' }
]

const datosAutomatizados = [
    { key: 'tat', text: 'Texto antes del tipo', value: 'value1' },
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
            nombre: '',
            tipo: '', 
            descripcion: '',
            base: '',
                        

            //MULTI OPTION SELECTION
            seleccion: [],

            //FIRST CONTENT, THEN STATE OF THE FIELD
            TAT: '',//TEXTO ANTES TITULO
            TATvisible: false,

            TDD: '',//TIPO DE DOCUMENTO
            TDDvisible: false,

            NDP: false,//NOMBRE DE LA PERSONA

            TAE: '',//TEXTO ANTES EVENTO
            TAEvisible: false,

            NDE: false,//NOMBRE DEL EVENTO

            LYF: false,//LUGAR Y FECHA


            //NEEDED TO CONFIG THE FILE
            config: []
        }

        this.handleChange = this.handleChange.bind(this)
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

    handleChange = (e, { name, value }) => {this.setState({ [name]: value })}

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
        this.setState({ seleccion: value })

        if (value.find(element => element === 'value1')) {
            this.setState({ TATvisible: true })
        }
        else {
            this.setState({ TATvisible: false })
        }

        if (value.find(element => element === 'value2')) {
            this.setState({ TDDvisible: true })
        }
        else {
            this.setState({ TDDvisible: false })
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


    render() {
        const { open, 
            tipo, 
            nombre, 
            descripcion, 
            base, 

            //VISIBLE STATES
            TATvisible, TDDvisible, TAEvisible, 
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
                        TATvisible && <p style={{ position: 'fixed', left: '63vw', top:'23.5vw', width:'20vw', fontSize:'0.4rem'}}>{TAT}</p>
                    }

                    {
                        TDDvisible && <p style={{ position: 'fixed', left: '55vw', top:'43vw', width:'20vw'}}>{TDD}</p>
                    }

                    {
                        NDP && <p style={{ position: 'fixed', left: '55vw', top:'45vw', width:'20vw'}}>NOMBRE DE LA PERSONA</p>
                    }
                    
                    {
                        TAEvisible && <p style={{ position: 'fixed', left: '55vw', top:'47vw', width:'20vw'}}>{TAE}</p>
                    }

                    {
                        NDE && <p style={{ position: 'fixed', left: '55vw', top:'49vw', width:'20vw'}}>"NOMBRE DEL EVENTO"</p>
                    }

                    {
                        LYF && <p style={{ position: 'fixed', left: '55vw', top:'51vw', width:'20vw'}}>TUXTLA GUTIERREZ, CHIAPAS; 00/00/0000</p>
                    }
                    
                    
                    <Form>
                        <Form.Input
                            fluid
                            value={nombre}
                            name='nombre'
                            onChange={this.handleChange}
                            label='Defina un nombre con el que se diferencie de las demás'
                            placeholder='Ej. Constancia básica banda café derecha'
                        />

                        <Form.TextArea
                            value={descripcion}
                            name='descripcion'
                            onChange={this.handleChange}
                            label='Descripción'
                            placeholder='Ej. Categoría para eventos relacionados con ...'
                        />

                        <Form.Group>
                            <Form.Select
                                fluid
                                width='5'
                                label='Tipo de documento'
                                name='tipo'
                                value={tipo}
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
                                value={TAT}
                                onChange={this.handleChange}
                            />
                        }
                        {TDDvisible &&
                            <Form.Input
                                label='Tipo de documento'
                                name='TDD'
                                value={TDD}
                                onChange={this.handleChange}
                            />
                        }
                        {TAEvisible &&
                            <Form.Input
                                label='Texto antes del nombre del evento'
                                name='TAE'
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
                        onClick={this.exit}
                        positive
                    />
                </Modal.Actions>
            </Modal>
        )
    }

}
