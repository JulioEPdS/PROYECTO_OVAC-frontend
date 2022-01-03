import { Component } from "react";
import { Segment, Header, Icon, Image, Message, Transition } from "semantic-ui-react";
import _ from 'lodash'

import Categoria from "../objetos/Categoria";
import CardPlaceholder from '../objetos/placeholders/CardPlaceholder'
import CategoriasModalForm from '../formularios/CategoriasForm'

import redcross from '../../img/redcross.svg'
import empty from '../../img/empty.svg'

export default class Categorias extends Component {
    constructor(props) {
        super(props)
        this.reloadDataCallBack = this.reloadDataCallBack.bind(this)
    }

    reloadDataCallBack = (childData) => {
        if (childData === 'reload') {
            this.props.parentCallback('reload')
        }
    }

    render() {
        const { categorias, waitingFetch, fetchError } = this.props
        const recomendaciones = ['No recargues la página completa :) intenta con el botón azul que dice recargar contenido', 'Si esta falla persiste comunica este problema']
        return (
            <Segment>
                <Header as="h3" style={{ color: "#a95168" }}>
                    <Icon name="th" />
                    <Header.Content>
                        Categorías
                        <Header.Subheader>
                            Ayuda a definir grupos de interés para los participantes y agrupar eventos
                        </Header.Subheader>
                    </Header.Content>
                </Header>
                <CategoriasModalForm disabled={waitingFetch || fetchError} parentCallback={this.reloadDataCallBack} />
                <Segment basic style={{
                    height: '130px',
                    overflowX: 'auto',
                    overflowY: 'hidden',
                }}>

                    <div
                        style={{
                            display: 'grid',
                            gap: '1rem',
                            verticalAlign: 'auto',
                            gridTemplateColumns: 'repeat(999, minmax(250px, 1fr))'
                        }}
                    >

                        {waitingFetch ?
                            //Esperando la consulta
                            _.times(4, (i) => (
                                <CardPlaceholder key={i} />
                            ))
                            : categorias.length === 0 && !fetchError ?
                                //No hay categorias en base de datos
                                <>
                                    <Image src={empty} size='small' floated="right"/>
                                    <Header content='Parece ser que no hay categorías en la base de datos' style={{ color: '#3F3D56' }} />
                                </>
                                //Presentamos los elementos porque no hubo error al consultar
                                : categorias.map?.((categoria) => (
                                    <Categoria key={categoria.id} categoria={categoria} />
                                ))
                        }

                    </div>

                    <Transition.Group animation='fade'>
                        {fetchError &&
                            //Error en consulta
                            <>
                                <Image
                                    src={redcross}
                                    size='small'
                                    floated='right'
                                    style={{ zIndex: '20' }}
                                />

                                <Message
                                    error
                                    header='Oops.. no se pudo comunicar con el servidor'
                                    list={recomendaciones}
                                />
                            </>
                        }
                    </Transition.Group>
                </Segment>
            </Segment>

        )
    }
}




//FUNCION DE FLECHA ===  CONST NOMBREFUNCION = () =>{ QUÉ SE HA A HACER }
    //Cada vez que hagas un cambio a algo dentro de aqui o fuera pero que tenga que ver, se actualiza

//FUNCION === FUNCTION NOMBREFUNCION(){}
    //IGNORA LOS CAMBIOS, NO ACTUALIZA NADA