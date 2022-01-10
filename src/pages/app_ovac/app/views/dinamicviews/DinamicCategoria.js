import { AuthContext } from '../../../../../auth/AuthContext'
import { Component } from 'react'
import { Header, Icon, Segment, Image, Button, Form, Grid, Card, Statistic, Transition, Message, Modal } from 'semantic-ui-react'
import Axios from 'axios'
import config from '../../../../../config'

//import Axios from 'axios'
import { NavLink } from 'react-router-dom'

import chore from '../../img/chore.svg'


const iconos = [
    { key: 'acc', text: 'Access', value: 'wheelchair', icon: 'wheelchair' },
    { key: 'aje', text: 'Ajedrez', value: 'chess', icon: 'chess' },
    { key: 'alt', text: 'Altavoz', value: 'bullhorn', icon: 'bullhorn' },
    { key: 'arb', text: 'Árbol', value: 'tree', icon: 'tree' },
    { key: 'arr', text: 'Arroba', value: 'at', icon: 'at' },
    { key: 'avi', text: 'Avión', value: 'plane', icon: 'plane' },
    { key: 'bal', text: 'Balanza', value: 'balance scale', icon: 'balance scale' },
    { key: 'bao', text: 'Balón', value: 'futbol', icon: 'futbol' },
    { key: 'bir', text: 'Birrete', value: 'graduation cap', icon: 'graduation cap' },
    { key: 'bol', text: 'Bolso', value: 'shopping bag', icon: 'shopping bag' },
    { key: 'bom', text: 'Bombilla', value: 'lightbulb', icon: 'lightbulb' },
    { key: 'caj', text: 'Cajas', value: 'boxes', icon: 'boxes' },
    { key: 'coh', text: 'Cohete', value: 'rocket', icon: 'rocket' },
    { key: 'cub', text: 'Cubiertos', value: 'food', icon: 'food' },
    { key: 'dol', text: 'Dolar', value: 'dollar sign', icon: 'dollar sign' },
    { key: 'edi', text: 'Edificio', value: 'building', icon: 'building' },
    { key: 'eng', text: 'Engranajes', value: 'cogs', icon: 'cogs' },
    { key: 'esc', text: 'Escudo', value: 'shield alternate', icon: 'shield alternate' },
    { key: 'eti', text: 'Etiquetas', value: 'tags', icon: 'tags' },
    { key: 'ext', text: 'Extintor', value: 'fire extinguisher', icon: 'fire extinguisher' },
    { key: 'fil', text: 'Film', value: 'film', icon: 'film' },
    { key: 'fol', text: 'Folder', value: 'folder', icon: 'folder' },
    { key: 'glo', text: 'Globo', value: 'globe', icon: 'globe' },
    { key: 'cha', text: 'Gráfica', value: 'chart line', icon: 'chart line' },
    { key: 'hue', text: 'Huella', value: 'paw', icon: 'paw' },
    { key: 'ind', text: 'Industria', value: 'industry', icon: 'industry' },
    { key: 'lat', text: 'Latido', value: 'heartbeat', icon: 'heartbeat' },
    { key: 'lib', text: 'Libro', value: 'book', icon: 'book' },
    { key: 'lis', text: 'Lista', value: 'clipboard list', icon: 'clipboard list' },
    { key: 'mat', text: 'Matraz', value: 'flask', icon: 'flask' },
    { key: 'mic', text: 'Microchip', value: 'microchip', icon: 'microchip' },
    { key: 'pil', text: 'Píldoras', value: 'pills', icon: 'pills' },
    { key: 'pod', text: 'Podcast', value: 'podcast', icon: 'podcast' },
    { key: 'por', text: 'Portafolio', value: 'suitcase', icon: 'suitcase' },
    { key: 'pro', text: 'Programa', value: 'file code', icon: 'file code' },
    { key: 'pri', text: 'Privado', value: 'user secret', icon: 'user secret' },
    { key: 'rec', text: 'Reciclado', value: 'recycle', icon: 'recycle' },
    { key: 'rel', text: 'Reloj', value: 'clock', icon: 'clock' },
    { key: 'sel', text: 'Sello', value: 'certificate', icon: 'certificate' },
    { key: 'vid', text: 'Videojuego', value: 'gamepad', icon: 'gamepad' }
]

const colors = [
    { key: 'yel', text: 'Amarillo', value: 'yellow' },
    { key: 'blu', text: 'Azul', value: 'blue' },
    { key: 'bro', text: 'Café', value: 'brown' },
    { key: 'pur', text: 'Morado', value: 'purple' },
    { key: 'ora', text: 'Naranja', value: 'orange' },
    { key: 'bla', text: 'Obscuro', value: 'black' },
    { key: 'oli', text: 'Oliva', value: 'olive' },
    { key: 'pin', text: 'Rosa', value: 'pink' },
    { key: 'red', text: 'Rojo', value: 'red' },
    { key: 'tea', text: 'Teal', value: 'teal' },
    { key: 'gre', text: 'Verde', value: 'green' },
    { key: 'vio', text: 'Violeta', value: 'violet' }
]


export default class DinamicCategoria extends Component {

    //Necesario para extraer token e id user
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

            fetchError: false,

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
        this.fetchInfo()
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
            .catch(
                (error) => {
                    this.setState({ fetchError: true, waiting: false })
                }
            )

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

            fetchError,


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


                                    <Form.Group widths='equal'>
                                        <Form.Field>
                                            <label>Color de la categoría</label>
                                            <Form.Select
                                                disabled={!edit}
                                                options={colors}
                                                placeholder='Color'
                                                name='Color'
                                                value={Color}
                                                onChange={this.handleChange}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Ícono de la categoría</label>
                                            <Form.Select
                                                disabled={!edit}
                                                options={iconos}
                                                placeholder='Ícono'
                                                name='Icono'
                                                value={Icono}
                                                onChange={this.handleChange}

                                            />
                                        </Form.Field>
                                    </Form.Group>


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
                                    <Header color='grey'>Estadísticas</Header>
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

                <Button
                    style={{ position: 'fixed', bottom: '5vh', right: '3vw' }}
                    floated='right'
                    content='Regresar'
                    icon='left arrow'
                    labelPosition='left'
                    as={NavLink} to='/app/datos'
                />

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
                    {fetchError &&
                        <Message
                        error
                        header='Error al consultar datos'
                        content='No se ha podido consultar los datos de la categoría, por favor revise su conexión a internet o informe este problema a sistemas'
                        />
                    }

                </Transition.Group>


                <Image size='medium' src={chore} alt='Registros' style={{ position: 'fixed', left: '-7vw', top: '65vh', zIndex: '-20', opacity: '.6' }} />
            </Segment>
        )
    }
}