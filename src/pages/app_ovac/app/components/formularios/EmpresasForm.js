import { Component } from 'react'
import { AuthContext } from '../../../../../auth/AuthContext'
import { Button, Modal, Icon, Form, Header, Transition, Message } from 'semantic-ui-react'
import Axios from 'axios'
import config from '../../../../../config'

export default class EmpresasModalForm extends Component {

    static contextType = AuthContext

    constructor(props) {
        super(props)
        this.state = {
            open: false,


            //CAMPOS
            name: '',
            girops: '',
            phone: '',
            representante: '',
            r_social: '',


            //ESTADOS DEL ENVÍO
            //Para definir los estados de envío            
            sendingdata: false, //enviando
            errorsending: false, //error al enviar
            duplicated: false,
            successending: false //enviado correctamente

        }


        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.fieldsAreComplete = this.fieldsAreComplete.bind(this)

        this.open = this.open.bind(this)
        this.exit = this.exit.bind(this)

    }

    fieldsAreComplete() {
        const { name, girops, phone, representante, r_social } = this.state
        if (
            name.length > 2 &&
            girops.length > 3 &&
            phone.length > 6 &&
            representante.length > 3 &&
            r_social.length > 3
        ) {
            return false

        }
        else { return true }
    }

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
            successending: false
        })
        this.props.parentCallback('reload')
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value })
    }


    async handleSubmit() {

        this.setState({
            sendingdata: true,
            errorsending: false,
            successending: false,
            duplicated: false
        })

        //DATA THAT'S GOING TO BE SENDED
        const { name, girops, phone, representante, r_social } = this.state
        //GET THE JWT
        const { user } = this.context

        await Axios.post(config.REACT_APP_apiURL + '/objects/empresa', {
            name: name,
            girops: girops,
            phone: phone,
            representante: representante,
            r_social: r_social,
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
                        successending: true
                    })
                    setTimeout(() => {
                        this.props.parentCallback('reload')
                        this.setState({
                            open: false,
                            successending: false,

                            //CLEAR ALL FIELDS
                            name: '',
                            girops: '',
                            phone: '',
                            representante: '',
                            r_social: ''
                        })
                    }, 2000)

                },
                (error) => {
                    //409 ya existe alguno en BD
                    //401 no autorizado
                    //400 bad request
                    if (error.response.status === 409) {
                        this.setState({
                            sendingdata: false,
                            duplicated: true
                        })
                    }
                    else {
                        this.setState({
                            sendingdata: false,
                            errorsending: true,
                        })
                        console.log('error al enviar')
                        console.log(error)
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
        const { disabled } = this.props
        const { name, girops, phone, representante, r_social,
            sendingdata, errorsending, duplicated, successending
        } = this.state
        return (
            <>
                <Modal
                    open={this.state.open}
                    style={{ width: '50vw' }}
                    trigger={
                        <Button
                            animated='fade'
                            floated='right'
                            disabled={disabled}
                            style={{
                                backgroundColor: "#007a99",
                                color: "#ffffff"
                            }}
                            onClick={this.open}
                        >
                            <Button.Content visible>
                                Registrar nueva <Icon name="industry" />
                            </Button.Content>
                            <Button.Content hidden>
                                Empresa <Icon name="add circle" />
                            </Button.Content>
                        </Button>
                    }
                >
                    <Modal.Header style={{ color: '#007a99' }}>
                        <Icon name='industry' /> Registrar nueva empresa
                    </Modal.Header>

                    <Modal.Content>
                        <Modal.Description>
                            <Header color='grey'>Por favor llene los siguientes campos:</Header>
                        </Modal.Description>


                        <Form>

                            <Form.Input
                                label='Nombre de la empresa'
                                placeholder="Nombre de la empresa"
                                name='name'
                                value={name}
                                onChange={this.handleChange}
                            />

                            <Form.Group widths='equal'>
                                <Form.Input
                                    label='Razón social'
                                    placeholder='ej. Agencia de Viajes Chiapas'
                                    name='r_social'
                                    value={r_social}
                                    onChange={this.handleChange}
                                />

                                <Form.Input
                                    label='Giro de la empresa'
                                    placeholder='ej. Agencia de viajes'
                                    name='girops'
                                    value={girops}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>

                            <Form.Input
                                label='Persona representante'
                                placeholder='ej. Ignacio Salazar Morales'
                                name='representante'
                                value={representante}
                                onChange={this.handleChange}
                            />

                            <Form.Input
                                label='Teléfono(s) de contacto, separe por comas'
                                placeholder='ej. 961-100-1000, 512-972-1234'
                                name='phone'
                                value={phone}
                                onChange={this.handleChange}
                            />

                        </Form>

                        <Transition.Group>
                            {successending &&
                                <Message
                                    success
                                    header='Se creó exitosamente'
                                    content='Ya se puede hallar esta empresa en el sistema'
                                />
                            }
                            {errorsending &&
                                <Message
                                    error
                                    header='No se pudo registrar la empresa'
                                    content='No hubo comunicación con el servidor, revise su conexión a internet, o informe este problema a sistemas'
                                />
                            }
                            {duplicated &&
                                <Message
                                    warning
                                    header='Ya existe una empresa con este mismo nombre'
                                    content='Los registros duplicados generan conlictos, verifique las empresas registradas'
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
                            content="Registrar empresa"
                            labelPosition='right'
                            icon='checkmark'
                            onClick={this.handleSubmit}
                            loading={sendingdata}
                            positive
                            disabled={this.fieldsAreComplete()}
                        />
                    </Modal.Actions>
                </Modal>

            </>
        )


    }

}
