import { Component } from 'react'
import { Header, Icon, Segment, Image, Button, Form, Transition, Message, Modal, List } from 'semantic-ui-react'
import { AuthContext } from '../../../../../auth/AuthContext'
import Axios from 'axios'
import config from '../../../../../config'


import { NavLink } from 'react-router-dom'

import chore from '../../img/chore.svg'

export default class DinamicPonente extends Component {

    //Necesario para extraer token e id
    static contextType = AuthContext

    constructor(props) {
        super(props)
        this.state = {
            //Extraer el parámetro de ID para consultar 
            ponente: this.props.match.params.id,

            //Estado del componente
            edit: false,
            waiting: false,
            successending: false,
            errorsending: false,

            //Estado del modal
            open: false,
            successdisable: false,
            errordisable: false,

            //FIELDS
            nombre: 'esperando...',
            apellido_p: 'esperando...',
            apellido_m: 'esperando...',
            email: 'esperando...',



        }

        this.fetchInfo = this.fetchInfo.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleDisableCat = this.handleDisableCat.bind(this)
        this.handlePrimaryButton = this.handlePrimaryButton.bind(this)
        this.handleSecondaryButton = this.handleSecondaryButton.bind(this)
        this.handleModalCancel = this.handleModalCancel.bind(this)

    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

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
        const { ponente } = this.state
        Axios.get(config.REACT_APP_apiURL + '/objects/ponentes/' + ponente, {
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
            .then((result) => {                
                this.setState({

                    waiting: false,

                    //CAMPOS
                    nombre: result.data[0].nombre,
                    apellido_p: result.data[0].apellido_p,
                    apellido_m: result.data[0].apellido_m,
                    email: result.data[0].email

                })

            })
    }

    async updateInfo() { /* ACTUALIZACIÓN DE INFORMACIÓN */
        this.setState({ waiting: true })
        const { user } = this.context
        const { ponente, nombre, apellido_p, apellido_m, email } = this.state
        Axios.put(config.REACT_APP_apiURL + '/objects/ponentes/update', {
            id: ponente,
            nombre: nombre,
            apellido_p: apellido_p,
            apellido_m: apellido_m,
            email: email,
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
        const { ponente } = this.state
        this.setState({ waiting: true })
        const { user } = this.context

        Axios.delete(config.REACT_APP_apiURL + '/objects/ponentes/delete/' + ponente, {
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


            //FIELDS
            nombre,
            apellido_p,
            apellido_m,
            email

        } = this.state
        return (

            <Segment basic style={{ height: '81vh', width: '50vw' }}>
                <Header as='h2' style={{ color: "#00C9A9" }}>
                    <Icon name='comment' />
                    <Header.Content>
                        Detalles del ponente
                        <Header.Subheader>
                            Aquí puedes editar o desactivar al ponente
                        </Header.Subheader>
                    </Header.Content>
                </Header>



                <Segment stacked>

                    <Form loading={waiting}>
                        <Form.Group widths='equal'>
                            <Form.Input
                                disabled={!edit}
                                label='Nombre(s) del ponente'
                                placeholder='Juan José'
                                name='nombre'
                                value={nombre}
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                disabled={!edit}
                                label='Apellido paterno'
                                placeholder='Morales'
                                name='apellido_p'
                                value={apellido_p}
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                disabled={!edit}
                                label='Apellido materno'
                                placeholder='Armendariz'
                                name='apellido_m'
                                value={apellido_m}
                                onChange={this.handleChange}
                            />
                        </Form.Group>

                        <Form.Input
                            disabled={!edit}
                            label='Correo electrónico (servirá para envíar reconocimiento)'
                            placeholder='Ej. ponente@dominio.mx'
                            name='email'
                            value={email}
                            onChange={this.handleChange}
                        />

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
                            <Header>Está seguro de querer desactivar al ponente: {nombre + ' ' + apellido_p}?
                                <Header.Subheader>Esta acción no eliminará datos, pero dejará al ponente fuera de línea
                                    para su uso posterior, la información y eventos relacionados con este ponente no se verán afectados.

                                    Considere que ya no podrá modificarse información alguna posterior a esta acción.
                                </Header.Subheader>
                            </Header>
                        </Modal.Description>


                        <Transition.Group>
                            {successdisable &&
                                <Message
                                    info
                                    header='Se desactivó al ponente exitosamente'
                                />
                            }
                            {errordisable &&
                                <Message
                                    error
                                    header='No se pudo desactivar al ponente'
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


                <Segment style={{ position: 'fixed', top: '25vh', right: '5vw', width: '30vw' }}>
                    <List relaxed>

                        <List.Item>
                            <List.Icon name='user' />
                            <List.Content>
                                <List.Header>Nombre completo del ponente</List.Header>
                                <List.Description>{nombre + ' ' + apellido_p + ' ' + apellido_m}</List.Description>
                            </List.Content>
                        </List.Item>

                        <List.Item>
                            <List.Icon name='at' />
                            <List.Content>
                                <List.Header>Correo electrónico</List.Header>
                                <List.Description>{email}</List.Description>
                            </List.Content>
                        </List.Item>

                    </List>
                </Segment>


                <Image size='medium' src={chore} alt='Registros' style={{ position: 'fixed', left: '-7vw', top: '65vh', zIndex: '-20', opacity: '.6' }} />
                <Transition.Group>
                    {successending &&
                        <Message
                            style={{ position: 'fixed', bottom: '3vh', left: '15vw' }}
                            success
                            header='Información guardada correctamente'
                            content='Los eventos relacionados con esta empresa conservarán su relación, pero los datos se han actualizado'
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