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
            nombre: '',
            tipo: '',
            descripcion: '',
            base: '',
            image: '',
            

            seleccion: [],

            TAT: '',
            TATvisible: false,
            TDD: '',
            TDDvisible: false,
            TAE: '',
            TAEvisible: false,

            config: []
        }

        this.handleChange = this.handleChange.bind(this)
        this.revealInputs = this.revealInputs.bind(this)
        this.dropdownChange = this.dropdownChange.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.exit = this.exit.bind(this)
        this.open = this.open.bind(this)
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });

    }

    handleInputChange(e) {
        this.setState({
            base: e.target.files[0],
        })
        
        if (e.target.files && e.target.files[0]) {
            this.setState({
              image: URL.createObjectURL(e.target.files[0])
            });
        }
    }




    open() {
        this.setState({ open: true })
    }

    exit() {
        this.setState({ open: false })
        this.props.parentCallback('cancelled')
        //this.props.parentCallback('reload')
    }

    dropdownChange(e, { value }) {
        this.setState({ seleccion: value })

    }

    revealInputs() {
        const { seleccion } = this.state
        if (seleccion.length > 0) {
            let array = seleccion
            if (array.find(element => element === "value1")) {
                this.setState({ TATvisible: true })
            }
            else {
                this.setState({ TATvisible: false })
            }
            if (array.find(element => element === "value2")) {
                this.setState({ TDDvisible: true })
            }
            else {
                this.setState({ TDDvisible: false })
            }
            if (array.find(element => element === "value4")) {
                this.setState({ TAEvisible: true })
            }
            else {
                this.setState({ TAEvisible: false })
            }
        }

    }

    render() {
        const { open, color, nombre, descripcion, TATvisible, TDDvisible, TAEvisible, image } = this.state
        const { disabled } = this.props
        return (
            <Modal
                open={open}
                style={{ width: '50vw', marginLeft:'-20vw' }}
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
                            Crear <Icon name="add circle" />
                        </Button.Content>
                    </Button>
                }
            >
                <Modal.Header style={{ color: "#aa8f18" }}>
                    <Icon name='file alternate' style={{ color: '#aa8f18' }} />
                    Crear nueva constancia
                </Modal.Header>
                <Modal.Content>

                    <Image size='medium' src={image} alt='Esperando base...' style={{position:'fixed', left:'55vw', top:'20vh'}}/>

                    <Modal.Description style={{ marginBottom: '1rem' }}>
                        <Header color='grey'>Por favor llene los siguientes campos:</Header>
                    </Modal.Description>

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
                                value={color}
                                options={tipos}
                                onChange={this.selectChange}
                                placeholder='Elige alguno:'
                            />
                            <Header size='tiny' floated='right'>Formato del documento
                                <input style={{ backgroundColor: '' }} id="base" type="file" onChange={this.handleInputChange}/>
                            </Header>
                        </Form.Group>

                        <Form.Group>
                            <Form.Dropdown
                                placeholder='Seleccione texto a imprimir...'
                                fluid
                                multiple
                                selection
                                options={datosAutomatizados}
                                onChange={this.dropdownChange}
                                width='14'
                                label='Seleccione qué inforación debe imprimirse automáticamente'
                            />
                            <Button color='teal' icon='checkmark'/>
                        </Form.Group>


                        {TATvisible &&
                            <Form.Input
                                label='Texto antes del tipo de documento'
                                name='TAT'
                            />
                        }
                        {TDDvisible &&
                            <Form.Input
                                label='Tipo de documento'
                                name='TDD'
                            />
                        }
                        {TAEvisible &&
                            <Form.Input
                                label='Texto antes del nombre del evento'
                                name='TAE'
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
