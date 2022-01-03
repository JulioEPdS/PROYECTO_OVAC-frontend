import { Component } from 'react'
import { Header, Icon, Segment, Image, Button, Form, Grid, Card, Statistic, Transition, Message, Modal } from 'semantic-ui-react'
import { AuthContext } from '../../../../../auth/AuthContext'
import Axios from 'axios'
import config from '../../../../../config'

//import Axios from 'axios'
import { NavLink } from 'react-router-dom'

import chore from '../../img/chore.svg'


export default class DinamicCertificado extends Component {

    //Necesario para extraer token e id
    static contextType = AuthContext

    constructor(props) {
        super(props)
        this.state = {
            //Extraer el parámetro de ID para consultar 
            categoria: this.props.match.params.id,

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
            Nombre: '...',
            Descripcion: '...',
            Color: 'grey',
            Icono: 'question',


            //Valores estadísticas
            Eventos: 0,
            Interesados: 0
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
        //this.fetchInfo()
    }


    /* SOLICITUDES A LA API ///////////////////*/
    /* Consulta, Actualización y Desactivación */
    /* /////////////////////////////////////// */
    async fetchInfo() { /* CONSULTA */
        this.setState({ waiting: true })
        const { user } = this.context
        const { categoria } = this.state
        Axios.get(config.REACT_APP_apiURL + '/objects/categorias/' + categoria, {
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
            .then((result) => {

                const name = result.data[0][0].name
                const description = result.data[0][0].description
                const icon = result.data[0][0].icon
                const color = result.data[0][0].color

                const eventos = result.data[1][0].Eventos
                const personas = result.data[2][0].Personas

                this.setState({

                    waiting: false,

                    //Información categoría
                    Nombre: name,
                    Descripcion: description,
                    Icono: icon,
                    Color: color,


                    //Estadísticas
                    Eventos: eventos,
                    Interesados: personas
                })

            })

    }

    async updateInfo() { /* ACTUALIZACIÓN DE INFORMACIÓN */

        this.setState({ waiting: true })

        const { user } = this.context


        const { categoria, Nombre, Descripcion, Color, Icono } = this.state

        Axios.put(config.REACT_APP_apiURL + '/objects/categorias/update', {
            id: categoria,
            name: Nombre,
            description: Descripcion,
            color: Color,
            icon: Icono,
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
        }, 1000)
    }

    async disable() { /* DESHABILITACIÓN */
        const { categoria } = this.state
        this.setState({ waiting: true })
        const { user } = this.context

        Axios.delete(config.REACT_APP_apiURL + '/objects/categorias/delete/' + categoria, {
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


            //Info y estadísticas
            Nombre,
            Descripcion,
            Color,
            Icono,
            Eventos,
            Interesados

        } = this.state
        return (
            <Segment basic style={{ height: '81vh' }}>
                <Header as='h2' style={{ color: "#a95168" }}>
                    <Icon name='th' />
                    <Header.Content>
                        Detalles de la categoría
                        <Header.Subheader>
                            Aquí puedes editar o desactivar la categoría
                        </Header.Subheader>
                    </Header.Content>
                </Header>


                <Grid columns={2} style={{ marginTop: '.5rem' }}>
                    <Grid.Row stretched>
                        {/*IZQUIERDA */}
                        <Grid.Column>
                            <Segment stacked>

                                <Form loading={waiting}>


                                    <Form.Field>
                                        <label>Nombre de la categoría</label>
                                        <Form.Input
                                            disabled={!edit}
                                            placeholder='Nombre'
                                            name='Nombre'
                                            value={Nombre}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>



                                    <Form.Field>
                                        <label>Descripción de la categoría</label>
                                        <Form.TextArea
                                            disabled={!edit}
                                            placeholder='Descripción'
                                            name='Descripcion'
                                            value={Descripcion}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>


                                    


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

                                    <Modal
                                        open={open}
                                        style={{ width: '50vw' }}>

                                        <Modal.Header style={{ color: 'red' }}>
                                            <Icon name='exclamation' /> Porfavor confirme la desactivación
                                        </Modal.Header>
                                        <Modal.Content>
                                            <Modal.Description style={{ marginBottom: '1rem' }}>
                                                <Header>Está seguro de querer desactivar la categoría: {Nombre}?
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
                                                        header='Se desactivó la categoría exitosamente'                                                        
                                                    />
                                                }
                                                {errordisable &&
                                                    <Message
                                                        error
                                                        header='No se pudo desactivar la categoría'
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


                                </Form>
                            </Segment>
                        </Grid.Column>

                        {/*DERECHA */}
                        <Grid.Column >
                            {/*SUPERIOR */}
                            <Grid.Row>
                                <Segment basic style={{ height: '32vh' }} loading={waiting}>
                                    <Header color='grey' content='Vista previa' />
                                    <Card color={Color} fluid>
                                        <Card.Content>
                                            <Card.Header>
                                                <Icon name={Icono} color={Color} />
                                                {Nombre}
                                            </Card.Header>
                                            <Card.Description>
                                                {Descripcion}
                                            </Card.Description>

                                        </Card.Content>
                                    </Card>

                                </Segment>

                            </Grid.Row>
                            {/*INFERIOR*/}
                            <Grid.Row>
                                <Segment style={{ height: '22vh' }} loading={waiting}>
                                    <Header color='grey'>Estadisticas</Header>
                                    <Statistic.Group>
                                        <Statistic>
                                            <Statistic.Value>{Eventos}</Statistic.Value>
                                            <Statistic.Label>Eventos</Statistic.Label>
                                        </Statistic>
                                        <Statistic color={Color}>
                                            <Statistic.Value>{Interesados}</Statistic.Value>
                                            <Statistic.Label>Interesados</Statistic.Label>
                                        </Statistic>
                                    </Statistic.Group>

                                </Segment>

                            </Grid.Row>

                        </Grid.Column>
                    </Grid.Row>


                </Grid>

                <Button floated='right' as={NavLink} to='/app/datos' content='Regresar' icon='left arrow' labelPosition='left' />

                <Transition.Group>
                    {successending &&
                        <Message
                            success
                            header='Información guardada correctamente'
                            content='Los eventos relacionados con esta categoría conservarán la relación'
                        />
                    }
                    {errorsending &&
                        <Message
                            error
                            header='No se pudo actualizar la información'
                            content='No hubo comunicación con el servidor, revise su conexión a internet, o informe este problema a sistemas'
                        />
                    }

                </Transition.Group>


                <Image size='medium' src={chore} alt='Registros' style={{ position: 'fixed', left: '-7vw', top: '65vh', zIndex: '-20', opacity: '.6' }} />
            </Segment>
        )
    }
}