import { Component } from 'react'
import { Button, Modal, Icon, Form, Header } from 'semantic-ui-react'

export default class EmpresasModalForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,

        }

        this.open = this.open.bind(this)
        this.exit = this.exit.bind(this)

    }


    open() {
        this.setState({ open: true })
    }

    exit() {
        this.setState({ open: false })
        this.props.parentCallback('reload')
    }

    render() {
        const { disabled } = this.props
        return (
            <>
                <Modal
                    open={this.state.open}
                    trigger={
                        <Button
                            animated='fade'
                            floated='right'
                            disabled={disabled}
                            style={{
                                backgroundColor: "#007a99",
                                color: "#ffffff"
                            }}
                            //disabled={disabled}
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

                            <Form.Group widths='equal'>
                                <Form.Input
                                    label='Nombre de la empresa'
                                    placeholder="Nombre"
                                />


                                <Form.Input
                                    label='Razón social'
                                    placeholder='Razón'
                                />
                            </Form.Group>

                            <Form.Input
                                label='Giro de la empresa'
                                placeholder='Hotelería, '
                            />

                            <Form.Input
                                label='Persona representante'
                                placeholder='Ej. Ignacio Salazar Morales'
                            />

                            <Form.Group>
                                <Form.Input
                                    width='10'
                                    label='Teléfono(s) de contacto, separe por comas'
                                    placeholder='Ej. 961-000-0000, 01-972-123'
                                />

                                <Form.Input
                                    label='Folio de atención'
                                    placeholder=''
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
                            content="Registrar empresa"
                            labelPosition='right'
                            icon='checkmark'
                            onClick={this.exit}
                            positive
                        //loading={sendingdata}
                        //disabled={this.fieldsAreComplete()}
                        />
                    </Modal.Actions>
                </Modal>

            </>
        )


    }

}
