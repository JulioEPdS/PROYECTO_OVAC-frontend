import { Component } from "react";
import { Segment, Grid, Header, Icon, List, Button, Image } from "semantic-ui-react";
import Axios from "axios";
import _ from 'lodash'
//import Categorías
import Constancias from "../components/containers/Constancias";
import Empresas from "../components/containers/Empresas";
import CategoriasModalForm from '../components/formularios/CategoriasForm'

//PLACEHOLDERS
import CardPlaceholder from '../components/objetos/CardPlaceholder'

import empty from '../img/empty.svg'

import './customcss.css'

import { AuthContext } from "../../../../auth/AuthContext";
//import Formularios
//import Ponentes

import chore from '../img/chore.svg'


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

    fetchregistros() {
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
        const segmentStyle = { overflow: "auto", maxHeight: 150, height: 150 };
        const { categorias, constancias, empresas, waitingFetch, fetchError } = this.state
        return (
            <>
                {/* CATEGORIAS */}
                <Grid.Row>
                    <Segment>                        
                        <Header as="h3" style={{ color: "#a95168" }}>
                            <Icon name="th" />
                            <Header.Content>
                                Categorías
                                <Header.Subheader>Agrupa los eventos</Header.Subheader>
                            </Header.Content>
                        </Header>
                        <CategoriasModalForm disabled={waitingFetch || fetchError}/>
                        <Segment basic style={{ 
                            height: '130px',                            
                            overflowX: 'auto', 
                            overflowY: 'hidden',
                        }}>
                            <div className='horizontal-grid'>
                                
                                    {waitingFetch?
                                        //Esperando la consulta
                                        _.times(5, (i) =>(
                                            <CardPlaceholder key={i} />
                                        ))
                                        :fetchError?
                                            //Error en consulta
                                            <>Error al consultar</>
                                            :categorias.length===0?
                                                //No hay categorias en base de datos
                                                <>Parece ser que no hay categorias en la BD</>
                                                :<></>
                                    }
                                
                            </div>
                        </Segment>                                                
                    </Segment>                    
                </Grid.Row>
                {/* CATEGORIAS */}



                <Grid columns={2}>
                    <Grid.Row style={{ marginTop: "2rem" }}>
                        <Grid.Column>

                            {/* */}
                            <Segment>
                                <Header as="h3" style={{ color: "#aa8f18" }}>
                                    <Icon name="file alternate" />
                                    <Header.Content>
                                        Constancias
                                        <Header.Subheader>
                                            Documentos para los participantes
                                        </Header.Subheader>
                                    </Header.Content>
                                </Header>
                                <Segment basic style={segmentStyle}>
                                    <List animated divided relaxed size="small">
                                        {constancias &&
                                            <Constancias constancias={constancias} />
                                        }
                                    </List>
                                </Segment>
                                <Button
                                    animated
                                    floated="right"
                                    style={{ backgroundColor: "#aa8f18", color: "#ffffff" }}
                                >
                                    <Button.Content visible>
                                        Crear nueva <Icon name="file alternate" />
                                    </Button.Content>
                                    <Button.Content hidden>
                                        Vamos <Icon name="add circle" />
                                    </Button.Content>
                                </Button>
                            </Segment>

                            {/* */}

                        </Grid.Column>
                        <Grid.Column>

                            {/*EMPRESAS*/}
                            <Segment>
                                <Header as="h3" style={{ color: "#007a99" }}>
                                    <Icon name="industry" />
                                    <Header.Content>
                                        Empresas
                                        <Header.Subheader>
                                            Organismos capacitadores
                                        </Header.Subheader>
                                    </Header.Content>
                                </Header>
                                <Segment basic style={segmentStyle}>
                                    <List animated divided relaxed>
                                        {empresas &&
                                            <Empresas empresas={empresas} />
                                        }
                                    </List>
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
                            {/*EMPRESAS */}

                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ marginTop: "2rem" }}>
                        <Grid.Column>
                            <Header as="h3" style={{ color: "#bf5748" }}>
                                <Icon name="clipboard list" />
                                <Header.Content>
                                    Formularios
                                    <Header.Subheader>
                                        Datos necesarios para inscribirse
                                    </Header.Subheader>
                                </Header.Content>
                            </Header>
                            <Segment basic style={segmentStyle}>
                                <List animated divided>
                                    {/*INSERTAR ELEMENTO */}
                                </List>
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
                                        Los encargados de impartir los eventos
                                    </Header.Subheader>
                                </Header.Content>
                            </Header>
                            <Segment basic style={segmentStyle}>
                                <List animated divided size="small">
                                    {/*INSERTAR ELEMENTO */}
                                </List>
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



