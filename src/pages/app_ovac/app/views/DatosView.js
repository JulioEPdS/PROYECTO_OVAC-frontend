import { Component } from "react";
import { Segment, Grid, Header, Icon, List, Button, Image, Message, Transition} from "semantic-ui-react";
import Axios from "axios";
import _ from 'lodash'
//import Categorías

//COMPONENTES DE CONSULTA
import Categorias from "../components/containers/Categorias";
import Constancias from "../components/containers/Constancias";
import Empresas from "../components/containers/Empresas";

//FORMULARIOS DE REGISTRO
import CategoriasModalForm from '../components/formularios/CategoriasForm'

//PLACEHOLDERS
import CardPlaceholder from '../components/objetos/CardPlaceholder'

//
import empty from '../img/empty.svg'
import redcross from '../img/redcross.svg'
import chore from '../img/chore.svg'

//CSS necesario
import './customcss.css'

import { AuthContext } from "../../../../auth/AuthContext";
import ConstanciasModalForm from "../components/formularios/ConstanciasForm";
//import Formularios
//import Ponentes




export default class Datos extends Component {

    static contextType = AuthContext

    constructor(props) {
        super(props)
        this.state = {
            waitingFetch: true,
            fetchError: false,
            categorias: [],
            constancias: [],
            empresas: [],
            formularios: [],
            ponentes: []
        }

        this.fetchregistros = this.fetchregistros.bind(this)
    }

    componentDidMount() {
        this.fetchregistros()
    }

    reloadCategoriescallBack = (childData) => {
        if (childData === 'reload') {
            console.log('se deben recargar las categorías')
        }
    }

    fetchregistros() {
        this.setState({waitingFetch: true, fetchError: false})
        const { user } = this.context
        Axios.get('http://localhost:5000/objects/allobjects', {
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
            .then(
                (result) => {
                    console.log(result)

                    const categorias = result.data.categorias
                    const constancias = result.data.constancias
                    const empresas = result.data.empresas
                    const formularios = result.data.formularios
                    const ponentes = result.data.ponentes

                    this.setState({
                        categorias: categorias,
                        constancias: constancias,
                        empresas: empresas,
                        formularios: formularios,
                        ponentes: ponentes,
                        waitingFetch: false
                    })
                },
                (error) => {
                    this.setState({
                        categorias: [],
                        constancias: [],
                        empresas: [],
                        formularios: [],
                        ponentes: [],
                        waitingFetch: false,
                        fetchError: true
                    })
                }
            )
    }

    render() {
        const segmentStyle = { overflow: "auto", maxHeight: 150, height: 150, minHeight:90 };
        const { categorias, constancias, empresas, waitingFetch, fetchError } = this.state
        const recomendaciones = ['No recargues la página completa :) intenta con el botón azul que dice recargar contenido', 'Si esta falla persiste comunica este problema']
        return (
            <>

                <Transition.Group>
                    {fetchError &&

                        <Button
                            size='massive'
                            icon='refresh'
                            content='Recargar contenido'
                            color='blue'
                            style={{
                                zIndex: '2',
                                position: 'fixed',
                                top: '45vh',
                                left: '40vw'
                            }}
                            onClick={this.fetchregistros}
                        />

                    }
                </Transition.Group>

                {/* CATEGORIAS */}
                <Grid.Row>
                    <Segment>
                        <Header as="h3" style={{ color: "#a95168" }}>
                            <Icon name="th" />
                            <Header.Content>
                                Categorías
                                <Header.Subheader>
                                    Ayuda a definir grupos de interés para los participantes
                                </Header.Subheader>
                            </Header.Content>
                        </Header>
                        <CategoriasModalForm disabled={waitingFetch || fetchError} parentCallback={this.reloadCategoriescallBack}/>
                        <Segment basic style={{
                            height: '130px',
                            overflowX: 'auto',
                            overflowY: 'hidden',
                        }}>

                            <div className='horizontal-grid'>

                                {waitingFetch ?
                                    //Esperando la consulta
                                    _.times(4, (i) => (
                                        <CardPlaceholder key={i} />
                                    ))
                                        : categorias.length === 0 && !fetchError ?
                                            //No hay categorias en base de datos
                                            <>Parece ser que no hay categorias en la BD
                                            <Image src={empty} size='tiny'/>
                                            </>
                                                //Presentamos los elementos
                                                : <Categorias categorias={categorias} />
                                }

                            </div>

                            <Transition.Group>
                                {fetchError &&
                                    //Error en consulta
                                    <>
                                        <Image src={redcross} size='small' floated='right' style={{ zIndex: '20' }} />
                                        <Message error header='Oops.. no se pudo comunicar con el servidor' list={recomendaciones} />
                                    </>                                    
                                }
                            </Transition.Group>
                        </Segment>
                    </Segment>
                </Grid.Row>
                {/* CATEGORIAS */}


                {/*CONSTANCIAS */}
                <Grid columns={2}>
                    <Grid.Row style={{ marginTop: "2rem" }}>
                        <Grid.Column>
                            <Segment>
                                <Header as="h3" style={{ color: "#aa8f18" }}>
                                    <Icon name="file alternate" />
                                    <Header.Content>
                                        Constancias
                                        <Header.Subheader>
                                            Los documentos que acreditan la participación de una persona
                                        </Header.Subheader>
                                    </Header.Content>
                                </Header>
                                <Segment basic style={segmentStyle}>
                                    <List animated divided relaxed size="small">
                                        {waitingFetch ?
                                            //Esperando datos
                                            <>Esperando datos</>
                                            : constancias.length === 0 && !fetchError ?
                                                //No hay constancias en la base de datos
                                                <>No hay constancias en la base de datos
                                                    <Image src={empty} size='tiny'/>
                                                </>
                                                //Aquí van las constancias
                                                : <>
                                                    <Constancias constancias={constancias} />
                                                </>
                                        }
                                    </List>

                                    <Transition.Group>
                                        {
                                            fetchError &&
                                            <Message attached='bottom' error header='No se pudo comunicar con el servidor' />
                                        }
                                    </Transition.Group>
                                </Segment>
                                <ConstanciasModalForm disabled={waitingFetch || fetchError} parentCallback={this.reloadCategoriescallBack}/>
                            </Segment>
                        </Grid.Column>
                        {/*CONSTANCIAS */}

                        {/*EMPRESAS */}
                        <Grid.Column>
                            <Segment>
                                <Header as="h3" style={{ color: "#007a99" }}>
                                    <Icon name="industry" />
                                    <Header.Content>
                                        Empresas
                                        <Header.Subheader>
                                            Púlicas o privadas, son quienes facilitan el evento de capacitación
                                        </Header.Subheader>
                                    </Header.Content>
                                </Header>
                                <Segment basic style={segmentStyle}>
                                    <List animated divided relaxed>
                                        {empresas &&
                                            <Empresas empresas={empresas} />
                                        }
                                    </List>
                                    <Transition.Group>
                                        {
                                            fetchError &&
                                            <Message error header='No se pudo comunicar con el servidor' />
                                        }
                                    </Transition.Group>
                                </Segment>
                                <Button
                                    animated floated="right" style={{ backgroundColor: "#007a99", color: "#ffffff" }}>
                                    <Button.Content visible>
                                        Registrar nueva <Icon name="industry" />
                                    </Button.Content>
                                    <Button.Content hidden>
                                        Vamos <Icon name="add circle" />
                                    </Button.Content>
                                </Button>
                            </Segment>
                        </Grid.Column>

                        {/* EMPRESAS */}
                    </Grid.Row>
                    <Grid.Row style={{ marginTop: "2rem" }}>
                        <Grid.Column>
                            <Header as="h3" style={{ color: "#bf5748" }}>
                                <Icon name="clipboard list" />
                                <Header.Content>
                                    Formularios
                                    <Header.Subheader>
                                        Cada uno define qué datos se le pedirán a los participantes
                                    </Header.Subheader>
                                </Header.Content>
                            </Header>
                            <Segment basic style={segmentStyle}>
                                <List animated divided>
                                    {/*INSERTAR ELEMENTO */}
                                </List>
                                <Transition.Group>
                                    {
                                        fetchError &&
                                        <Message error header='No se pudo comunicar con el servidor' />
                                    }
                                </Transition.Group>
                            </Segment>
                            <Button
                                animated
                                floated="right"
                                style={{ backgroundColor: "#bf5748", color: "#ffffff" }}
                            >
                                <Button.Content visible>
                                    Crear nuevo formulario
                                </Button.Content>
                                <Button.Content hidden>
                                    <Icon name="clipboard list" />
                                </Button.Content>
                            </Button>
                        </Grid.Column>
                        <Grid.Column>
                            <Header as="h3" style={{ color: "#00c9a9" }}>
                                <Icon name="comment" />
                                <Header.Content>
                                    Ponentes
                                    <Header.Subheader>
                                        Las personas encargadas de impartir las capacitaciones o manejar los eventos
                                    </Header.Subheader>
                                </Header.Content>
                            </Header>
                            <Segment basic style={segmentStyle}>
                                <List animated divided size="small">
                                    {/*INSERTAR ELEMENTO */}
                                </List>
                                <Transition.Group>
                                {
                                    fetchError &&
                                    <Message attached='bottom' error header='No se pudo comunicar con el servidor' />
                                }
                                </Transition.Group>
                            </Segment>
                            <Button
                                animated
                                floated="right"
                                style={{ backgroundColor: "#00c9a9", color: "#ffffff" }}
                            >
                                <Button.Content visible>
                                    Registrar nuevo ponente
                                </Button.Content>
                                <Button.Content hidden>
                                    <Icon name="comment" />
                                </Button.Content>
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>


                <Image size='medium' src={chore} alt='Place' style={{ position: 'fixed', left: '-7vw', top: '65vh', zIndex: '-20', opacity: '.6' }} />
            </>

        )

    }

}



