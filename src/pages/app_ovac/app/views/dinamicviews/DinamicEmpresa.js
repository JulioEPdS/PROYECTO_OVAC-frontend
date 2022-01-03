import { Component } from 'react'
import { Header, Icon, Segment, Image, Button, Form, Transition, Message, Modal, List } from 'semantic-ui-react'
import { AuthContext } from '../../../../../auth/AuthContext'
import Axios from 'axios'
import config from '../../../../../config'


import { NavLink } from 'react-router-dom'

import chore from '../../img/chore.svg'

export default class DinamicEmpresa extends Component {

    //Necesario para extraer token e id
    static contextType = AuthContext

    constructor(props) {
        super(props)
        this.state = {
            //Extraer el parámetro de ID para consultar 
            empresa: this.props.match.params.id,

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
            girops: 'esperando...',
            phone: 'esperando...',
            representante: 'esperando...',
            r_social: 'esperando...',
            
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
        const { empresa } = this.state
        Axios.get(config.REACT_APP_apiURL + '/objects/empresas/' + empresa, {
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
                    girops: result.data[0].giro_prod_serv,
                    phone: result.data[0].phone,
                    representante: result.data[0].representante,
                    r_social: result.data[0].r_social,

                })

            })
    }

    async updateInfo() { /* ACTUALIZACIÓN DE INFORMACIÓN */
        this.setState({ waiting: true })
        const { user } = this.context
        const { empresa, name, girops, phone, representante, r_social } = this.state
        Axios.put(config.REACT_APP_apiURL + '/objects/empresas/update', {
            id: empresa,
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
        const { empresa } = this.state
        this.setState({ waiting: true })
        const { user } = this.context

        Axios.delete(config.REACT_APP_apiURL + '/objects/empresas/delete/' + empresa, {
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
            girops,
            phone,
            representante,
            r_social

        } = this.state
        return (

            <Segment basic style={{ height: '81vh', width: '50vw' }}>
                <Header as='h2' style={{ color: "#007A99" }}>
                    <Icon name='industry' />
                    <Header.Content>
                        Detalles de la empresa
                        <Header.Subheader>
                            Aquí puedes editar o desactivar la empresa
                        </Header.Subheader>
                    </Header.Content>
                </Header>



                <Segment stacked>

                    <Form loading={waiting}>

                        <Form.Input
                            disabled={!edit}
                            label='Nombre de la empresa'
                            placeholder="Nombre de la empresa"
                            name='name'
                            value={name}
                            onChange={this.handleChange}
                        />

                        <Form.Group widths='equal'>
                            <Form.Input
                                disabled={!edit}
                                label='Razón social'
                                placeholder='ej. Agencia de Viajes Chiapas'
                                name='r_social'
                                value={r_social}
                                onChange={this.handleChange}
                            />

                            <Form.Input
                                disabled={!edit}
                                label='Giro de la empresa'
                                placeholder='ej. Agencia de viajes'
                                name='girops'
                                value={girops}
                                onChange={this.handleChange}
                            />
                        </Form.Group>

                        <Form.Input
                            disabled={!edit}
                            label='Persona representante'
                            placeholder='ej. Ignacio Salazar Morales'
                            name='representante'
                            value={representante}
                            onChange={this.handleChange}
                        />

                        <Form.Input
                            disabled={!edit}
                            label='Teléfono(s) de contacto, separe por comas'
                            placeholder='ej. 961-100-1000, 512-972-1234'
                            name='phone'
                            value={phone}
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
                            <Header>Está seguro de querer desactivar la categoría: {name}?
                                <Header.Subheader>Esta acción no eliminará datos, pero dejará la categoría fuera de línea
                                    para su uso posterior, la información y eventos relacionados con esta categoría no se verán afectados.

                                    Considere que ya no podrá modificarse información alguna de esta categoría.
                                </Header.Subheader>
                            </Header>
                        </Modal.Description>


                        <Transition.Group>
                            {successdisable &&
                                <Message
                                    info
                                    header='Se desactivó la empresa exitosamente'
                                />
                            }
                            {errordisable &&
                                <Message
                                    error
                                    header='No se pudo desactivar la empresa'
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
                            <List.Icon name='industry' />
                            <List.Content>
                                <List.Header>Nombre de la empresa</List.Header>
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