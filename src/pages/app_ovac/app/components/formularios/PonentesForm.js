import { Component } from "react";
import { Modal, Button, Header, Icon, Message, Transition, Form } from "semantic-ui-react";

export default class PonentesModalForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //DEFAULT, NEEDED TO SET MODAL OPEN OR CLOSE IT
            open: false,

            //FIELDS
            nombre: '',
            apellido_p:'',
            apellido_m:'',
            correo:'',

            //POSIBLE SENDING STATES
            sendingdata: false,
            successending: false,
            errorsending: false,
            duplicated: false
        }
        this.open = this.open.bind(this)
        this.exit = this.exit.bind(this)

        this.handleChange = this.handleChange.bind(this)
    }

    open() {
        this.setState({ open: true })
    }

    exit() {
        this.setState({ open: false })
        this.props.parentCallback('reload')
    }

    handleChange(e){
        const {name, value} = e.target
        this.setState({[name]: value})
    }

    render() {
        const { open, sendingdata, successending, errorsending, duplicated,
            nombre, apellido_m, apellido_p, correo
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
                            name='correo'
                            value={correo}
                            onChange={this.handleChange}
                        />

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
                        content="Registrar ponente"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={this.exit}
                        positive
                        loading={sendingdata}
                    />
                </Modal.Actions>
            </Modal>
        )
    }
}