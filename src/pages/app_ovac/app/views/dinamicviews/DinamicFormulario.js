import { Component } from 'react'
import { Header, Icon, Segment, Image, Button, Form, Transition, Message, Modal} from 'semantic-ui-react'
import { AuthContext } from '../../../../../auth/AuthContext'
import Axios from 'axios'
import config from '../../../../../config'


import { NavLink } from 'react-router-dom'

import chore from '../../img/chore.svg'

const tipos = [
    { key: 'text', text: 'Texto', value: 'text' },
    { key: 'numeric', text: 'Numérico', value: 'numeric' },
    { key: 'date', text: 'Fecha', value: 'date' }
]

export default class DinamicFormulario extends Component {

    //Necesario para extraer token e id
    static contextType = AuthContext

    constructor(props) {
        super(props)
        this.state = {
            //Extraer el parámetro de ID para consultar 
            formulario: this.props.match.params.id,

            //Estado del componente
            edit: false,
            waiting: false,
            successending: false,
            errorsending: false,

            //Estado del modal
            open: false,
            successdisable: false,
            errordisable: false,

            //Valores iniciales de los campos            
            name: 'esperando...',
            description: 'esperando...',
            fields: []

        }

        this.fetchInfo = this.fetchInfo.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleDisableCat = this.handleDisableCat.bind(this)
        this.handlePrimaryButton = this.handlePrimaryButton.bind(this)
        this.handleSecondaryButton = this.handleSecondaryButton.bind(this)
        this.handleModalCancel = this.handleModalCancel.bind(this)

        this.handleAddClick = this.handleAddClick.bind(this)
        this.handleRemoveClick = this.handleRemoveClick.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)

    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })
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
    }

    componentDidMount() {
        //FETCH THE INFO
        this.fetchInfo()
    }


    /* SOLICITUDES A LA API ///////////////////*/
    /* Consulta, Actualización y Desactivación */
    /* /////////////////////////////////////// */
    async fetchInfo() { /* CONSULTA */
        this.setState({ waiting: true })
        const { user } = this.context
        const { formulario } = this.state
        Axios.get(config.REACT_APP_apiURL + '/objects/formularios/' + formulario, {
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
            .then((result) => {
                console.log(result)

                this.setState({

                    waiting: false,

                    //CAMPOS
                    name: result.data[0].name,
                    description: result.data[0].description,
                    fields: JSON.parse(result.data[0].fields),

                })                            

            })
    }

    async updateInfo() { /* ACTUALIZACIÓN DE INFORMACIÓN */
        this.setState({ waiting: true })
        const { user } = this.context
        const { formulario, name, description, fields } = this.state
        Axios.put(config.REACT_APP_apiURL + '/objects/formularios/update', {
            id: formulario,
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
                    this.setState({ successending: true, errorsending: false })
                }, (error) => {
                    this.setState({ errorsending: true, successending: false })

                }
            )
            .catch(
                (error) => {
                    this.setState({ errorsending: true, successending: false })
                }
            )

        setTimeout(() => {
            this.fetchInfo()
            this.setState({ successending: false, errorsending: false })
        }, 3000)
    }

    async disable() { /* DESHABILITACIÓN */
        const { formulario } = this.state
        this.setState({ waiting: true })
        const { user } = this.context

        Axios.delete(config.REACT_APP_apiURL + '/objects/formularios/delete/' + formulario, {
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
            .then(
                (result) => {
                    this.setState({ successdisable: true })

                    setTimeout(() => {
                        this.props.history.replace('/app/datos')
                    }, 2000)
                },

                (error) => {
                    console.log(error)
                    setTimeout(() => {
                        this.setState({ errordisable: true })
                    }, 100)
                    setTimeout(() => {
                        this.setState({ errordisable: false, open: false })
                    }, 2000)
                }
            )
            .catch(
                (error) => { console.log(error) }
            )
    }


    /* Manejo de botones de acción /////////// */
    /* Habilitar edición, desactivar, cancelar */
    /* /////////////////////////////////////// */

    handlePrimaryButton(Content) {
        if (Content === 'Guardar') {
            //Acciones para guardar cambios
            this.updateInfo()
            this.setState({ edit: false })
        }
        else {
            //Acciones para permitir editar
            this.setState({ edit: true })
        }
    }

    handleSecondaryButton(Content) {
        if (Content === 'Desactivar') {
            //Need confirmation
            this.setState({ open: true })
        }

        else {
            //Cancelar, refresh info and change edit state
            this.fetchInfo()

            this.setState({ edit: false })
        }

    }

    handleDisableCat() {
        this.disable()
    }

    handleModalCancel() {
        this.fetchInfo()
        this.setState({ open: false })
    }



    /* Elementos Gráficos */

    render() {
        const {
            //Estados del componente y subcomponentes
            edit,
            waiting,
            open,

            successdisable,
            successending,

            errordisable,
            errorsending,


            //CAMPOS
            name,
            description,
            fields

        } = this.state
        return (

            <Segment basic style={{ height: '81vh', width: '50vw' }}>
                <Header as='h2' style={{ color: "#BF5748" }}>
                    <Icon name='clipboard list' />
                    <Header.Content>
                        Detalles de la formulario
                        <Header.Subheader>
                            Aquí puedes editar o desactivar la formulario
                        </Header.Subheader>
                    </Header.Content>
                </Header>



                <Segment stacked>

                    <Form loading={waiting}>

                        <Form.Input
                            disabled={!edit}
                            label='Nombre del formulario'
                            placeholder="Nombre del formulario"
                            name='name'
                            value={name}
                            onChange={this.handleChange}
                        />


                        <Form.Input
                            disabled={!edit}
                            label='Descripción del formulario'
                            placeholder='Describa de manera objetiva para ayudar a identificar el formulario'
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
                                        disabled={!edit}
                                        onChange={this.handleInputChange}
                                    />

                                    <Form.Select
                                        options={tipos}
                                        label='Tipo de dato'
                                        placeholder='Seleccione el tipo de dato'
                                        name='fieldtype'
                                        index={i}
                                        value={x.fieldtype}
                                        disabled={!edit}
                                        onChange={this.handleInputChange}
                                    />

                                    <div style={{ marginTop: '4vh' }}>
                                        {fields.length !== 1 &&
                                            <Button
                                                compact
                                                disabled={!edit}
                                                onClick={() => this.handleRemoveClick(i)}
                                            >Quitar</Button>}
                                        {fields.length - 1 === i &&
                                            <Button
                                                compact
                                                disabled={!edit}
                                                onClick={this.handleAddClick}
                                            >Añadir</Button>}
                                    </div>

                                </Form.Group>


                            )

                        })}



                        <Button
                            color={edit ? 'green' : 'blue'}
                            content={edit ? 'Guardar' : 'Editar'}
                            disabled={waiting}
                            onClick={(e, { content }) => this.handlePrimaryButton(content)}
                        />

                        <Button
                            color={edit ? 'grey' : 'black'}
                            disabled={waiting}
                            content={edit ? 'Cancelar' : 'Desactivar'}
                            onClick={(e, { content }) => this.handleSecondaryButton(content)}
                        />
                    </Form>

                </Segment>

                <Modal
                    open={open}
                    style={{ width: '50vw' }}>

                    <Modal.Header style={{ color: 'red' }}>
                        <Icon name='exclamation' /> Porfavor confirme la desactivación
                    </Modal.Header>
                    <Modal.Content>
                        <Modal.Description style={{ marginBottom: '1rem' }}>
                            <Header>Está seguro de querer desactivar el formulario: {name}?
                                <Header.Subheader>Esta acción no eliminará datos, pero dejará al formulario fuera de línea
                                    para su uso posterior, la información y eventos relacionados con este formulario no se verán afectados.

                                    Considere que ya no podrá modificarse información alguna de este formulario.
                                </Header.Subheader>
                            </Header>
                        </Modal.Description>


                        <Transition.Group>
                            {successdisable &&
                                <Message
                                    info
                                    header='Se desactivó la formulario exitosamente'
                                />
                            }
                            {errordisable &&
                                <Message
                                    error
                                    header='No se pudo desactivar la formulario'
                                    content='No hubo comunicación con el servidor, revise su conexión a internet, o informe este problema a sistemas'
                                />
                            }
                        </Transition.Group>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            color='black'
                            onClick={this.handleModalCancel}>
                            Cancelar
                        </Button>
                        <Button
                            content='Desactivar'
                            labelPosition='right'
                            icon='trash alternate'
                            negative
                            onClick={this.handleDisableCat}
                        />
                    </Modal.Actions>
                </Modal>


                {/*<Segment style={{ position: 'fixed', top: '25vh', right: '5vw', width: '30vw' }}>
                    <List relaxed>

                        <List.Item>
                            <List.Icon name='industry' />
                            <List.Content>
                                <List.Header>Nombre de la formulario</List.Header>
                                <List.Description>{name}</List.Description>
                            </List.Content>
                        </List.Item>

                        <List.Item>
                            <List.Icon name='building' />
                            <List.Content>
                                <List.Header>Razón social</List.Header>
                                <List.Description>{r_social}</List.Description>
                            </List.Content>
                        </List.Item>

                        <List.Item>
                            <List.Icon name='dolly' />
                            <List.Content>
                                <List.Header>
                                    Giro, producto o servicio
                                </List.Header>
                                <List.Description>{girops}</List.Description>
                            </List.Content>
                        </List.Item>

                        <List.Item>
                            <List.Icon name='address card' />
                            <List.Content>
                                <List.Header>Persona representante</List.Header>
                                <List.Description>{representante}</List.Description>
                            </List.Content>
                        </List.Item>

                        <List.Item>
                            <List.Icon name='fax' />
                            <List.Content>
                                <List.Header>Teléfonos de contacto</List.Header>
                                <List.Description>{phone}</List.Description>
                            </List.Content>
                        </List.Item>


                    </List>
                        </Segment>*/}


                <Image size='medium' src={chore} alt='Registros' style={{ position: 'fixed', left: '-7vw', top: '65vh', zIndex: '-20', opacity: '.6' }} />
                <Transition.Group>
                    {successending &&
                        <Message
                            style={{ position: 'fixed', bottom: '3vh', left: '15vw' }}
                            success
                            header='Información guardada correctamente'
                            content='Los eventos relacionados con este formulario conservarán su relación, pero los datos se han actualizado'
                        />
                    }
                    {errorsending &&
                        <Message
                            style={{ position: 'fixed', bottom: '3vh', left: '15vw' }}
                            error
                            header='No se pudo actualizar la información'
                            content='No hubo comunicación con el servidor, revise su conexión a internet, o informe este problema a sistemas'
                        />
                    }
                </Transition.Group>


                <Button
                    style={{ position: 'fixed', bottom: '5vh', right: '3vw' }}
                    floated='right'
                    as={NavLink} to='/app/datos'
                    content='Regresar'
                    icon='left arrow'
                    labelPosition='left'
                />

            </Segment >

        )
    }
}