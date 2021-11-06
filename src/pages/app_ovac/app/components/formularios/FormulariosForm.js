import { Component } from "react";
import { Modal, Button, Header, Icon, Message, Transition, Form } from "semantic-ui-react";

export default class FormulariosModalForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            
            sendingdata: false,
            successending: false,
            errorsending: false,
            duplicated: false
        }
        this.open = this.open.bind(this)
        this.exit = this.exit.bind(this)
    }

    open(){
        this.setState({open: true})
    }

    exit(){
        this.setState({open: false})
        this.props.parentCallback('reload')
    }

    render() {
        const { open, sendingdata, successending, errorsending, duplicated } = this.state
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
                            Crear nuevo <Icon name="clipboard list"/>
                        </Button.Content>
                        <Button.Content hidden>
                            Formulario <Icon name="add circle"/>
                        </Button.Content>
                    </Button>
                }
            >
                <Modal.Header style={{ color: "#bf5748" }}>
                    <Icon name='clipboard list'/> Crear nuevo formulario
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description style={{ marginBottom: '1rem' }}>
                        <Header color='grey'>Por favor llene los siguientes campos:</Header>
                    </Modal.Description>

                    <Form>

                     
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
                        onClick={this.exit}                    
                        positive                        
                        loading={sendingdata}
                    />
                </Modal.Actions>
            </Modal>
        )
    }
}