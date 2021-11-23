import { Component } from 'react'
import { AuthContext } from '../../../../../auth/AuthContext'
import { Button, Header, Modal, Icon, Form, Card, Segment, Message, Transition } from 'semantic-ui-react'
import Axios from 'axios'
import config from '../../../../../config'

const iconos = [
    { key: 'acc', text: 'Access', value: 'wheelchair', icon: 'wheelchair' },
    { key: 'aje', text: 'Ajedrez', value: 'chess', icon: 'chess' },
    { key: 'alt', text: 'Altavoz', value: 'bullhorn', icon: 'bullhorn' },
    { key: 'arb', text: 'Árbol', value: 'tree', icon: 'tree' },
    { key: 'arr', text: 'Arroba', value: 'at', icon: 'at' },
    { key: 'avi', text: 'Avión', value: 'plane', icon: 'plane' },
    { key: 'bal', text: 'Balanza', value: 'balance scale', icon: 'balance scale' },
    { key: 'bao', text: 'Balón', value: 'futbol', icon: 'futbol' },
    { key: 'bir', text: 'Birrete', value: 'graduation cap', icon: 'graduation cap' },
    { key: 'bol', text: 'Bolso', value: 'shopping bag', icon: 'shopping bag' },
    { key: 'bom', text: 'Bombilla', value: 'lightbulb', icon: 'lightbulb' },
    { key: 'caj', text: 'Cajas', value: 'boxes', icon: 'boxes' },
    { key: 'coh', text: 'Cohete', value: 'rocket', icon: 'rocket' },
    { key: 'cub', text: 'Cubiertos', value: 'food', icon: 'food' },
    { key: 'dol', text: 'Dolar', value: 'dollar sign', icon: 'dollar sign' },
    { key: 'edi', text: 'Edificio', value: 'building', icon: 'building' },
    { key: 'eng', text: 'Engranajes', value: 'cogs', icon: 'cogs' },
    { key: 'esc', text: 'Escudo', value: 'shield alternate', icon: 'shield alternate' },
    { key: 'eti', text: 'Etiquetas', value: 'tags', icon: 'tags' },
    { key: 'ext', text: 'Extintor', value: 'fire extinguisher', icon: 'fire extinguisher' },
    { key: 'fil', text: 'Film', value: 'film', icon: 'film' },
    { key: 'fol', text: 'Folder', value: 'folder', icon: 'folder' },
    { key: 'glo', text: 'Globo', value: 'globe', icon: 'globe' },
    { key: 'cha', text: 'Gráfica', value: 'chart line', icon: 'chart line' },
    { key: 'hue', text: 'Huella', value: 'paw', icon: 'paw' },
    { key: 'ind', text: 'Industria', value: 'industry', icon: 'industry' },
    { key: 'lat', text: 'Latido', value: 'heartbeat', icon: 'heartbeat' },
    { key: 'lib', text: 'Libro', value: 'book', icon: 'book' },
    { key: 'lis', text: 'Lista', value: 'clipboard list', icon: 'clipboard list' },
    { key: 'mat', text: 'Matraz', value: 'flask', icon: 'flask' },
    { key: 'mic', text: 'Microchip', value: 'microchip', icon: 'microchip' },
    { key: 'pil', text: 'Píldoras', value: 'pills', icon: 'pills' },
    { key: 'pod', text: 'Podcast', value: 'podcast', icon: 'podcast' },
    { key: 'por', text: 'Portafolio', value: 'suitcase', icon: 'suitcase' },
    { key: 'pro', text: 'Programa', value: 'file code', icon: 'file code' },
    { key: 'pri', text: 'Privado', value: 'user secret', icon: 'user secret' },
    { key: 'rec', text: 'Reciclado', value: 'recycle', icon: 'recycle' },
    { key: 'rel', text: 'Reloj', value: 'clock', icon: 'clock' },
    { key: 'sel', text: 'Sello', value: 'certificate', icon: 'certificate' },
    { key: 'vid', text: 'Videojuego', value: 'gamepad', icon: 'gamepad' }
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
            //Para definir los estados de envío            
            sendingdata: false, //enviando
            errorsending: false, //error al enviar
            duplicated: false,
            successending: false, //enviado correctamente

            //estado del modal
            open: false,

            //campos
            name: '',
            description: '',
            color: 'grey',
            icon: 'help'
        }

        //Cambios de estado y texto
        this.handleChange = this.handleChange.bind(this)
        this.hanldeSubmit = this.hanldeSubmit.bind(this)
        this.fieldsAreComplete = this.fieldsAreComplete.bind(this)
        //this.Capitalize = this.Capitalize.bind(this)


        //Para salir o entrar
        this.exit = this.exit.bind(this)
        this.open = this.open.bind(this)

    }

    /*handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
            successending: false,
            errorsending: false,
            duplicated: false
        });
    }*/

    handleChange = (e, { name, value }) => this.setState({
        [name]: value,
        successending: false,
        errorsending: false,
        duplicated: false
    })

    open() {
        this.setState({ open: true })
    }

    exit() {
        this.setState({
            open: false,

            //RESET ALL STATES
            //enviando datos
            sendingdata: false,
            //error al enviar
            errorsending: false,
            //ya existe una categoría con este name
            duplicated: false,
            //envío exitoso
            successending: false,

            //clear fields
            name: '',
            description: '',
            color: 'grey',
            icon: 'help'
        })

        this.props.parentCallback('reload')
    }

    fieldsAreComplete() {
        const { name, description, color, icon } = this.state
        if (name.length > 0
            && description.length > 0
            && (color.length > 0 && color !== 'grey')
            && (icon.length > 0 && icon !== 'help')) {
            return false
        }
        else { return true }
    }

    async hanldeSubmit() {
        this.setState({
            sendingdata: true,
            errorsending: false,
            successending: false,
            duplicated: false
        })
        const {
            name,
            description,
            color,
            icon,
        } = this.state
        const { user } = this.context
        await Axios.post(config.REACT_APP_apiURL + '/objects/categoria', {
            name: name,
            description: description,
            color: color,
            icon: icon,
            user_id: user.id
        },
            {
                headers: {
                    'Authorization': 'Bearer ' + user.token
                }
            })
            .then(
                (result) => {
                    this.setState({
                        sendingdata: false,                        
                        successending: true,

                        name: '',
                        description: '',
                        color: 'grey',
                        icon: 'help'

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
                            duplicated: true
                        })
                    }
                    else {
                        this.setState({
                            sendingdata: false,
                            errorsending: true,                                                        
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
                setTimeout(() => {
                    this.props.parentCallback('reload')
                    this.setState({ open: false })
                }, 2000)
            })
    }

    render() {
        const {
            open,

            color,
            icon,
            name,
            description,

            sendingdata,
            errorsending,
            duplicated,
            successending

        } = this.state
        const { disabled } = this.props
        return (
            <Modal
                open={open}
                style={{ width: '50vw' }}
                trigger={
                    <Button
                        animated='fade'
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
                            Categoría <Icon name="add circle" />
                        </Button.Content>
                    </Button>
                }
            >
                <Modal.Header style={{ color: "#a95168" }}>
                    <Icon name='th' />    Crear nueva categoría
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description style={{ marginBottom: '1rem' }}>
                        <Header color='grey'>Por favor llene los siguientes campos:</Header>
                    </Modal.Description>



                    <Segment basic style={{ position: 'fixed', top: '20vh', left: '30vw' }}>
                        <Header color='grey' content='Vista previa' />
                        <Card color={color}>
                            <Card.Content>
                                <Card.Header>
                                    <Icon name={icon} color={color} />
                                    {name}
                                </Card.Header>
                                <Card.Description>
                                    {description}
                                </Card.Description>

                            </Card.Content>
                        </Card>
                    </Segment>

                    <Form style={{ width: '25vw' }}>

                        <Form.Input
                            fluid
                            value={name}
                            name='name'
                            onChange={this.handleChange}
                            label='Define un nombre para la categoría'
                            placeholder='Ej. Tecnología, Salud, Financieros, Deportes ...'
                        />

                        <Form.TextArea
                            value={description}
                            name='description'
                            onChange={this.handleChange}
                            label='¿Qué tipo de eventos formarían parte?'
                            placeholder='Escribe aquí los tipos de eventos que pueden formar parte de esta categoría Ej. Categoría para eventos relacionados con Investigación, Avances tecnológicos y Estudios'
                        />

                        <Form.Group>
                            <Form.Select
                                fluid
                                label='Usa un color para resaltar'
                                name='color'
                                value={color}
                                options={colors}
                                onChange={this.handleChange}
                                placeholder='Elige alguno:'
                                width='10'
                            />

                            <Form.Select
                                fluid
                                label='Dale un ícono'
                                name='icon'
                                value={icon}
                                options={iconos}
                                onChange={this.handleChange}
                                placeholder='Elige alguno:'
                                color={color}
                                width='10'
                            />
                        </Form.Group>
                    </Form>
                    <Transition.Group>
                        {successending &&
                            <Message
                                success
                                header='Se creó exitosamente'
                                content='Ya se puede utilizar esta categoría para agrupar eventos'
                            />
                        }
                        {errorsending &&
                            <Message
                                error
                                header='No se pudo crear la categoría :('
                                content='No hubo comunicación con el servidor, revise su conexión a internet, o informe este problema a sistemas'
                            />
                        }
                        {duplicated &&
                            <Message
                                warning
                                header='Ya existe una categoría con este mismo nombre'
                                content='Los registros duplicados generan conlictos, modifique el nombre o utilice la categoría que ya existe'
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
                        content="Crear categoría"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={this.hanldeSubmit}
                        positive
                        loading={sendingdata}
                        disabled={this.fieldsAreComplete()}
                    />
                </Modal.Actions>
            </Modal>
        )
    }

}
