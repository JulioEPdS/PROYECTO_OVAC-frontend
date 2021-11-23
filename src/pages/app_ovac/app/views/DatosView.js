import { Component } from "react";
import { Grid, Button, Image, Transition } from "semantic-ui-react";
import Axios from "axios";
import config from "../../../../config";
//import _ from 'lodash'
//import Categorías

//COMPONENTES DE CONSULTA
import Categorias from "../components/containers/Categorias";
import Constancias from "../components/containers/Constancias";
import Empresas from "../components/containers/Empresas";
import Formularios from "../components/containers/Formularios";

//PLACEHOLDERS
//import CardPlaceholder from '../components/objetos/CardPlaceholder'

//
//import empty from '../img/empty.svg'
//import redcross from '../img/redcross.svg'
import chore from '../img/chore.svg'

//CSS necesario
import './customcss.css'

import { AuthContext } from "../../../../auth/AuthContext";
import Ponentes from "../components/containers/Ponentes";



export default class Datos extends Component {

    static contextType = AuthContext

    constructor(props) {
        super(props)
        this.state = {
            //Estados
            waitingFetch: true,
            fetchError: false,

            //Listas de registros
            categorias: [],
            constancias: [],
            empresas: [],
            formularios: [],
            ponentes: []
        }

        this.fetchregistros = this.fetchregistros.bind(this)
        this.promptReloadData = this.promptReloadData.bind(this)
    }

    componentDidMount() {
        this.fetchregistros()
    }

    promptReloadData = (childData) => {
        if (childData === 'reload') {
            this.fetchregistros()
        }
    }



    fetchregistros() {
        this.setState({ waitingFetch: true, fetchError: false })
        const { user } = this.context
        Axios.get(config.REACT_APP_apiURL+'/objects/allobjects', {
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
        //const segmentStyle = { overflow: "auto", maxHeight: 150, height: 150, minHeight: 90 };
        const { categorias, constancias, empresas, formularios, ponentes, waitingFetch, fetchError } = this.state
        //const recomendaciones = ['No recargues la página completa :) intenta con el botón azul que dice recargar contenido', 'Si esta falla persiste comunica este problema']
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
                    <Categorias 
                        categorias={categorias} 
                        waitingFetch={waitingFetch} 
                        fetchError={fetchError} 
                        parentCallback={this.promptReloadData}
                        //After an action we can prompt a reload data
                    />
                </Grid.Row>
                {/* CATEGORIAS */}


                <Grid columns={2}>
                    <Grid.Row style={{ marginTop: "2rem" }}>

                        {/*CONSTANCIAS */}
                        <Grid.Column>
                            <Constancias 
                                constancias={constancias} 
                                fetchError={fetchError} 
                                waitingFetch={waitingFetch}
                                parentCallback={this.promptReloadData}
                                //After an action we can prompt a reload data
                            />
                        </Grid.Column>
                        {/*CONSTANCIAS */}


                        {/*EMPRESAS */}
                        <Grid.Column>
                            <Empresas 
                                empresas={empresas}
                                fetchError={fetchError}
                                waitingFetch={waitingFetch}
                                parentCallback={this.promptReloadData}
                                //After an action we can prompt a reload data
                            />
                        </Grid.Column>
                        {/* EMPRESAS */}

                    </Grid.Row>

                    <Grid.Row style={{ marginTop: "2rem" }}>

                        {/* FORMULARIOS */}
                        <Grid.Column>
                            <Formularios 
                                formularios={formularios}
                                fetchError={fetchError}
                                waitingFetch={waitingFetch}
                                parentCallback={this.promptReloadData}
                            />
                        </Grid.Column>
                        {/* FORMULARIOS */}


                        {/* PONENTES */}
                        <Grid.Column>
                            <Ponentes
                                ponentes={ponentes}
                                fetchError={fetchError}
                                waitingFetch={waitingFetch}
                                parentCallback={this.promptReloadData}
                            />
                        </Grid.Column>
                        {/* PONENTES */}

                    </Grid.Row>
                </Grid>

                
                <Image size='medium' src={chore} alt='Registros' style={{ position: 'fixed', left: '-7vw', top: '65vh', zIndex: '-20', opacity: '.6' }} />
                
                
            </>

        )

    }

}



