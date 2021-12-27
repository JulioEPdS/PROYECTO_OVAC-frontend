import { Component } from 'react'
import { Header, Icon, Segment, Breadcrumb, Image, Button, Form, Grid, Card, Statistic } from 'semantic-ui-react'
import { AuthContext } from '../../../../../auth/AuthContext'
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

            //Valores iniciales de los campos
            InitialNombre: '',
            InitialDescripcion: '',
            InitialColor: '',
            InitialIcono: '',

            //Valores editados de los campos
            EditedNombre: '',
            EditedDescripcion: '',
            EditedColor: '',
            EditedIcono: '',
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSecondaryButton = this.handleSecondaryButton.bind(this)
        this.fetchInfo = this.fetchInfo.bind(this)

    }

    handleChange = (e, { name, value }) => this.setState({
        [name]: value
        //successending: false,
        //errorsending: false,
        //duplicated: false
    })

    componentDidMount() {
        //FETCH THE INFO
        this.fetchInfo()
    }

    async fetchInfo() {
        this.setState({ waiting: true })
        const { user } = this.context
        const { categoria } = this.state
        Axios.get(config.REACT_APP_apiURL + '/objects/categorias/' + categoria, {
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
            .then((result) => {

                console.log(result)

                const name = result.data[0].name
                const description = result.data[0].description
                const icon = result.data[0].icon
                const color = result.data[0].color

                this.setState({

                    waiting: false,

                    //Valores de inicio no modificarse
                    InitialNombre: name,
                    InitialDescripcion: description,
                    InitialIcono: icon,
                    InitialColor: color,

                    //Valores copias, modificables
                    EditedNombre: name,
                    EditedDescripcion: description,
                    EditedIcono: icon,
                    EditedColor: color,
                })

            })

    }

    handleSecondaryButton(Content) {
        if (Content === 'Cancelar') {
            const { InitialNombre, InitialDescripcion, InitialIcono, InitialColor } = this.state
            this.setState({
                EditedNombre: InitialNombre,
                EditedDescripcion: InitialDescripcion,
                EditedColor: InitialColor,
                EditedIcono: InitialIcono,

                edit: false
            })
        }
        if (Content === 'Desactivar') {
            console.log('Hay que confirmar')
        }
    }





    render() {
        const { edit, waiting, EditedNombre, EditedDescripcion, EditedColor, EditedIcono } = this.state
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
                                            name='EditedNombre'
                                            value={EditedNombre}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>



                                    <Form.Field>
                                        <label>Descripción de la categoría</label>
                                        <Form.TextArea
                                            disabled={!edit}
                                            placeholder='Descripción'
                                            name='EditedDescripcion'
                                            value={EditedDescripcion}
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
                                                name='EditedColor'
                                                value={EditedColor}
                                                onChange={this.handleChange}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Ícono de la categoría</label>
                                            <Form.Select
                                                disabled={!edit}
                                                options={iconos}
                                                placeholder='Ícono'
                                                name='EditedIcono'
                                                value={EditedIcono}
                                                onChange={this.handleChange}

                                            />
                                        </Form.Field>
                                    </Form.Group>


                                    <Button
                                        color={edit ? 'green' : 'primary'}
                                        content={edit ? 'Guardar' : 'Editar'}
                                        disabled={waiting}
                                        onClick={(e) => this.setState({ edit: !edit })}
                                    />

                                    <Button
                                        color={edit ? 'gray' : 'secondary'}
                                        disabled={waiting}
                                        content={edit ? 'Cancelar' : 'Desactivar'}
                                        onClick={(e, { content }) => this.handleSecondaryButton(content)}
                                    />


                                </Form>
                            </Segment>
                        </Grid.Column>

                        {/*DERECHA */}
                        <Grid.Column >
                            {/*SUPERIOR */}
                            <Grid.Row>
                                <Segment basic style={{ height: '32vh' }}>
                                    <Header color='grey' content='Vista previa' />
                                    <Card color={EditedColor} fluid>
                                        <Card.Content>
                                            <Card.Header>
                                                <Icon name={EditedIcono} color={EditedColor} />
                                                {EditedNombre}
                                            </Card.Header>
                                            <Card.Description>
                                                {EditedDescripcion}
                                            </Card.Description>

                                        </Card.Content>
                                    </Card>

                                </Segment>

                            </Grid.Row>
                            {/*INFERIOR*/}
                            <Grid.Row>
                                <Segment style={{ height: '22vh' }}>
                                    <Header color='grey'>Estadisticas</Header>
                                    <Statistic.Group>
                                        <Statistic>
                                            <Statistic.Value>22</Statistic.Value>
                                            <Statistic.Label>Eventos</Statistic.Label>
                                        </Statistic>
                                        <Statistic color={EditedColor}>
                                            <Statistic.Value>31,200</Statistic.Value>
                                            <Statistic.Label>Interesados</Statistic.Label>
                                        </Statistic>                                        
                                    </Statistic.Group>

                                </Segment>

                            </Grid.Row>

                        </Grid.Column>
                    </Grid.Row>


                </Grid>
                <Button floated='right' as={NavLink} to='/app/datos' content='Regresar' icon='left arrow' labelPosition='left' />







                <Image size='medium' src={chore} alt='Registros' style={{ position: 'fixed', left: '-7vw', top: '65vh', zIndex: '-20', opacity: '.6' }} />
            </Segment>
        )
    }
}