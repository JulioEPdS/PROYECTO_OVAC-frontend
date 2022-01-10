import { Component } from "react";
import { Modal, Button, Header, Icon, Message, Transition, Form } from "semantic-ui-react";
import Axios from "axios";

import config from "../../../../../config";
import { AuthContext } from "../../../../../auth/AuthContext";


const tipos = [
    { key: 'text', text: 'Texto', value: 'text' },
    { key: 'numeric', text: 'Numérico', value: 'numeric' },
    { key: 'date', text: 'Fecha', value: 'date' }
]


export default class FormulariosModalForm extends Component {

    static contextType = AuthContext

    constructor(props) {
        super(props)
        this.state = {
            open: false,

            //INFO OF THE FORM
            name: '',
            description: '',
            fields: [{ fieldname: "", fieldtype: "" }],


            sendingdata: false,
            successending: false,
            errorsending: false,
            duplicated: false
        }
        this.open = this.open.bind(this)
        this.exit = this.exit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleAddClick = this.handleAddClick.bind(this)
        this.handleRemoveClick = this.handleRemoveClick.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    open() {
        this.setState({ open: true })
    }

    exit() {
        this.setState({ open: false })
        this.props.parentCallback('reload')
    }

    async handleSubmit() {
        this.setState({
            sendingdata: true,
            errorsending: false,
            successending: false,
            duplicated: false
        })
        const {
            name,
            description,
            fields
        } = this.state
        const { user } = this.context
        await Axios.post(config.REACT_APP_apiURL + '/objects/formulario', {
            name: name,
            description: description,
            fields: JSON.stringify(fields),
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
                            sendingdata: false
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
                    this.setState({ open: false, errorsending: false })
                }, 2000)
            })
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value })
    }

    handleInputChange = (e, { name, value, index }) => {
        //const { name, value } = e.target
        const { fields } = this.state

        const list = [...fields]
        list[index][name] = value
        this.setState({ fields: list })
    }

    handleAddClick = () => {
        const { fields } = this.state
        const list = [...fields, { fieldname: "", fieldtype: "" }]
        this.setState({ fields: list })
    }

    handleRemoveClick = index => {
        const { fields } = this.state
        const list = [...fields];
        list.splice(index, 1);
        this.setState({ fields: list })
    };

    render() {
        const {
            open,

            //FORM INFO
            name,
            description,
            fields,

            //STATUS
            sendingdata,
            successending,
            errorsending,
            duplicated
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
                            backgroundColor: "#bf5748",
                            color: "#ffffff",
                        }}
                        disabled={disabled}
                        onClick={this.open}
                    >
                        <Button.Content visible>
                            Crear nuevo <Icon name="clipboard list" />
                        </Button.Content>
                        <Button.Content hidden>
                            Formulario <Icon name="add circle" />
                        </Button.Content>
                    </Button>
                }
            >
                <Modal.Header style={{ color: "#bf5748" }}>
                    <Icon name='clipboard list' /> Crear nuevo formulario
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description style={{ marginBottom: '1rem' }}>
                        <Header color='grey'>Por favor llene los siguientes campos:</Header>
                    </Modal.Description>

                    <Form>

                        <Form.Input
                            label='Nombre del formulario'
                            placeholder='Info adicional salud'
                            name='name'
                            value={name}
                            onChange={this.handleChange}
                        />
                        <Form.TextArea
                            label='Descripción del formulario'
                            placeholder=''
                            name='description'
                            value={description}
                            onChange={this.handleChange}
                        />

                        {fields.map((x, i) => {
                            return (
                                <Form.Group>
                                    <Form.Input
                                        label='Nombre del campo'
                                        placeholder='NSS, Clave de elector, Contraseña...'
                                        name='fieldname'
                                        index={i}
                                        value={x.fieldname}
                                        onChange={this.handleInputChange}
                                    />

                                    <Form.Select
                                        options={tipos}
                                        label='Tipo de dato'
                                        placeholder='Seleccione el tipo de dato'
                                        name='fieldtype'
                                        index={i}
                                        value={x.fieldtype}
                                        onChange={this.handleInputChange}
                                    />

                                    <div style={{ marginTop: '4vh' }}>
                                        {fields.length !== 1 &&
                                            <Button
                                                compact
                                                onClick={() => this.handleRemoveClick(i)}
                                            >Quitar</Button>}
                                        {fields.length - 1 === i &&
                                            <Button
                                                compact
                                                onClick={this.handleAddClick}
                                            >Añadir</Button>}
                                    </div>

                                </Form.Group>


                            )

                        })}


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
                        content="Crear formulario"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={this.handleSubmit}
                        positive
                        loading={sendingdata}
                    />
                </Modal.Actions>
            </Modal>
        )
    }
}