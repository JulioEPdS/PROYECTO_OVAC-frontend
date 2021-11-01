import { Component } from 'react'
import { Button, Header, Modal, Icon, Form, Card, Segment } from 'semantic-ui-react'
import { AuthContext } from '../../../../../auth/AuthContext'


const iconos = [
    { key: 'aje', text: 'Ajedréz', value: 'chess', icon: 'chess' },
    { key: 'alt', text: 'Altavoz', value: 'bullhorn', icon: 'bullhorn' },
    { key: 'bal', text: 'Balanza', value: 'balance scale', icon: 'balance scale' },
    { key: 'bir', text: 'Birrete', value: 'graduation cap', icon: 'graduation cap' },
    { key: 'caj', text: 'Cajas', value: 'boxes', icon: 'boxes' },
    { key: 'cer', text: 'Sello', value: 'certificate', icon: 'certificate' },
    { key: 'cha', text: 'Gráfica', value: 'chart line', icon: 'chart line' },
    { key: 'clo', text: 'Reloj', value: 'clock', icon: 'clock' },
    { key: 'dol', text: 'Dolar', value: 'dollar sign', icon: 'dollar sign' },
    { key: 'edi', text: 'Edificio', value: 'building', icon: 'building' },
    { key: 'esc', text: 'Escudo', value: 'shield alternate', icon: 'shield alternate' },
    { key: 'eti', text: 'Etiquetas', value: 'tags', icon: 'tags' },
    { key: 'ext', text: 'Extintor', value: 'fire extinguisher', icon: 'fire extinguisher' },
    { key: 'fil', text: 'Film', value: 'film', icon: 'film' },
    { key: 'fol', text: 'Folder', value: 'folder', icon: 'folder' },
    { key: 'glo', text: 'Globo', value: 'globe', icon: 'globe' },
    { key: 'ind', text: 'Industria', value: 'industry', icon: 'industry' },
    { key: 'lat', text: 'Latido', value: 'heartbeat', icon: 'heartbeat' },
    { key: 'lib', text: 'Libro', value: 'book', icon: 'book' },
    { key: 'mic', text: 'Microchip', value: 'microchip', icon: 'microchip' },
    { key: 'por', text: 'Portafolio', value: 'suitcase', icon: 'suitcase' },
    { key: 'pod', text: 'Podcast', value: 'podcast', icon: 'podcast' },
    { key: 'pri', text: 'Privado', value: 'user secret', icon: 'user secret' },
    { key: 'pro', text: 'Programa', value: 'file code', icon: 'file code' },
    { key: 'rec', text: 'Reciclado', value: 'recycle', icon: 'recycle' },
    { key: 'vid', text: 'Videojuego', value: 'gamepad', icon: 'gamepad' },
]

const colors = [
    { key: 'red', text: 'Rojo', value: 'red' },
    { key: 'ora', text: 'Naranja', value: 'orange' },
    { key: 'yel', text: 'Amarillo', value: 'yellow' },
    { key: 'oli', text: 'Oliva', value: 'olive' },
    { key: 'gre', text: 'Verde', value: 'green' },
    { key: 'tea', text: 'Teal', value: 'teal' },
    { key: 'blu', text: 'Azul', value: 'blue' },
    { key: 'vio', text: 'Violeta', value: 'violet' },
    { key: 'pur', text: 'Morado', value: 'purple' },
    { key: 'pin', text: 'Rosa', value: 'pink' },
    { key: 'bro', text: 'Café', value: 'brown' },
    { key: 'bla', text: 'Obscuro', value: 'black' }
]

export default class CategoriasModalForm extends Component {

    static contextType = AuthContext

    constructor(props) {
        super(props)
        this.state = {
            open: false,
            nombre: '',
            descripcion: '',
            color: 'grey',
            icon: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.selectChange = this.selectChange.bind(this)
        this.iconChange = this.iconChange.bind(this)
        this.exit = this.exit.bind(this)
        this.open = this.open.bind(this)
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        console.log(this.state.color)
    }

    selectChange = (e, { value }) => this.setState({ color: value })
    iconChange = (e, { value }) => this.setState({ icon: value })

    open() {
        this.setState({ open: true })
    }

    exit() {
        this.setState({ open: false })
    }

    render() {
        const { open, color, icon, nombre, descripcion } = this.state
        const { disabled } = this.props
        return (
            <Modal
                open={open}
                style={{width:'50vw'}}
                trigger={
                    <Button
                        animated
                        style={{
                            backgroundColor: "#a95168",
                            color: "#ffffff",
                            position: 'absolute',
                            top: '1vh',
                            right: '.2vw'
                        }}
                        disabled={disabled}
                        onClick={this.open}
                    >
                        <Button.Content visible>
                            Crear nueva <Icon name="th" />
                        </Button.Content>
                        <Button.Content hidden>
                            Crear <Icon name="add circle" />
                        </Button.Content>
                    </Button>
                }
            >
                <Modal.Header style={{ color: "#a95168" }}>Crear nueva categoría</Modal.Header>
                <Modal.Content>
                    <Modal.Description style={{ marginBottom: '1rem' }}>
                        <Header color='grey'>Por favor llene los siguientes campos:</Header>
                    </Modal.Description>

                    <Segment basic style={{position:'fixed',top:'20vh', left:'30vw'}}>
                        <Header color='grey' content='Vista previa'/>
                        <Card color={color}>
                            <Card.Content>
                                <Card.Header>
                                <Icon name={icon} color={color} />
                                    {nombre}
                                </Card.Header>
                                <Card.Description>                                    
                                    {descripcion}
                                </Card.Description>

                            </Card.Content>
                        </Card>
                    </Segment>

                    <Form style={{ width: '25vw' }}>

                        <Form.Input
                            fluid
                            value={nombre}
                            name='nombre'
                            onChange={this.handleChange}
                            label='Nombre de la categoría'
                            placeholder='Ej. Tecnología, Salud, Financieros'                            
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
                                label='Color'
                                name='color'
                                value={color}
                                options={colors}
                                onChange={this.selectChange}
                                placeholder='Elige alguno:'
                                width='10'
                            />

                            <Form.Select
                                icon
                                fluid
                                label='Icono'
                                name='icon'
                                value={icon}
                                options={iconos}
                                onChange={this.iconChange}
                                placeholder='Elige alguno:'
                                color={color}
                                width='10'
                            />
                        </Form.Group>

                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        color='black'
                        onClick={this.exit}>
                        Cancelar
                    </Button>
                    <Button
                        content="Crear categoría"
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
