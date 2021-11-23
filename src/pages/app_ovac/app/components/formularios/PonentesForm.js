import { Component } from "react";
import { Modal, Button, Header, Icon, Message, Transition, Form } from "semantic-ui-react";
import { AuthContext } from '../../../../../auth/AuthContext'
import Axios from 'axios'
import config from "../../../../../config";


export default class PonentesModalForm extends Component {

    static contextType = AuthContext

    constructor(props) {
        super(props)
        this.state = {
            //DEFAULT, NEEDED TO SET MODAL OPEN OR CLOSE IT
            open: false,

            //FIELDS
            nombre: '',
            apellido_p: '',
            apellido_m: '',
            email: '',

            //POSIBLE SENDING STATES
            sendingdata: false,
            successending: false,
            errorsending: false,
            duplicated: false
        }
        this.open = this.open.bind(this)
        this.exit = this.exit.bind(this)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.fieldsAreComplete = this.fieldsAreComplete.bind(this)


        this.handleChange = this.handleChange.bind(this)
    }

    open() {
        this.setState({ open: true })
    }

    exit() {
        this.setState({ open: false })
        this.props.parentCallback('reload')
    }

    handleChange(e) {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    fieldsAreComplete() {
        const { nombre, apellido_p, apellido_m, email } = this.state
        if (nombre.length > 2 && apellido_p.length > 2 && apellido_m.length > 2 && email.length > 5) {
            return false
        }
        else { return true }
    }

    async handleSubmit() {
        this.setState({
            sendingdata: true,
            errorsending: false,
            successending: false,
            duplicated: false
        })
        const { nombre, apellido_p, apellido_m, email } = this.state
        const { user } = this.context

        await Axios.post(config.REACT_APP_apiURL + '/objects/ponente', {
            nombre: nombre,
            apellido_p: apellido_p,
            apellido_m: apellido_m,
            email: email,
            user_id: user.id
        }, {
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
            .then(
                (result) => {
                    this.setState({
                        sendingdata: false,
                        successending: true,

                        nombre: '',
                        apellido_p: '',
                        apellido_m: '',
                        email: ''

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
            //STATES
            open,
            sendingdata,
            successending,
            errorsending,
            duplicated,

            //FIELDS
            nombre,
            apellido_m,
            apellido_p,
            email
        } = this.state
        const { disabled } = this.props
        return (
            <Modal
                open={open}
                style={{ width: '50vw' }}
                trigger={
                    <Button
                        animated='fade'
                        floated='right'
                        style={{
                            backgroundColor: "#00c9a9",
                            color: "#ffffff",
                        }}
                        disabled={disabled}
                        onClick={this.open}
                    >
                        <Button.Content visible>
                            Registrar nuevo <Icon name="comment" />
                        </Button.Content>
                        <Button.Content hidden>
                            Ponente <Icon name="add circle" />
                        </Button.Content>
                    </Button>
                }
            >
                <Modal.Header style={{ color: "#00c9a9" }}>
                    <Icon name='comment' /> Registrar nuevo ponente
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description style={{ marginBottom: '1rem' }}>
                        <Header color='grey'>Por favor llene los siguientes campos:</Header>
                    </Modal.Description>

                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Input
                                label='Nombre(s) del ponente'
                                placeholder='Juan José'
                                name='nombre'
                                value={nombre}
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                label='Apellido paterno'
                                placeholder='Morales'
                                name='apellido_p'
                                value={apellido_p}
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                label='Apellido materno'
                                placeholder='Armendariz'
                                name='apellido_m'
                                value={apellido_m}
                                onChange={this.handleChange}
                            />
                        </Form.Group>

                        <Form.Input
                            label='Correo electrónico (servirá para envíar reconocimiento)'
                            placeholder='Ej. ponente@dominio.mx'
                            name='email'
                            value={email}
                            onChange={this.handleChange}
                        />

                    </Form>
                    <Transition.Group>
                        {successending &&
                            <Message
                                success
                                header='Se registró exitosamente'
                                content='Ya se puede visualizar al ponente en el sistema'
                            />
                        }
                        {errorsending &&
                            <Message
                                error
                                header='No se pudo registrar al ponente'
                                content='No hubo comunicación con el servidor, revise su conexión a internet, o informe este problema a sistemas'
                            />
                        }
                        {duplicated &&
                            <Message
                                warning
                                header='Ya existe un registro de este ponente'
                                content='Los registros duplicados generan conlictos, verifique los datos'
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
                        content="Registrar ponente"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={this.handleSubmit}
                        positive
                        loading={sendingdata}
                        disabled={this.fieldsAreComplete()}
                    />
                </Modal.Actions>
            </Modal>
        )
    }
}