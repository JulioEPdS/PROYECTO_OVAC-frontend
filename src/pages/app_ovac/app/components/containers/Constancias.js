import { Component } from "react";
import { Segment, Header, Icon, Image, List, Transition, Message } from "semantic-ui-react";

import Constancia from "../objetos/Constancia";
import ConstanciasModalForm from "../formularios/ConstanciasForm";

import empty from '../../img/empty.svg'

export default class Constancias extends Component {
    constructor(props) {
        super(props)
        this.prompReloadData = this.prompReloadData.bind(this)
    }

    prompReloadData(childData) {
        if (childData === 'reload') {
            this.props.parentCallback('reload')
        }
    }

    render() {
        const { constancias, fetchError, waitingFetch } = this.props
        return (
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

                <Segment
                    basic                    
                    style={{
                        overflow: "auto",
                        maxHeight: 150,
                        height: 150,
                        minHeight: 90
                    }}>

                    <List animated divided relaxed size="small">
                        {waitingFetch ?
                            //Esperando datos
                            <></>
                            : constancias.length === 0 && !fetchError ?
                                //No hay constancias en la base de datos
                                <>No hay constancias en la base de datos
                                    <Image src={empty} size='tiny' />
                                </>
                                //Aquí van las constancias halladas
                                : constancias.map?.((constancia) => (
                                    <Constancia key={constancia.id} constancia={constancia} />))
                        }
                    </List>

                    <Transition.Group animation='fade'>
                        {
                            fetchError &&
                            <Message
                                error
                                header='No se pudo comunicar con el servidor'
                                style={{ height: '16vh', textAlign: 'center' }}
                            />
                        }
                    </Transition.Group>

                </Segment>

                <ConstanciasModalForm
                    disabled={waitingFetch || fetchError}
                    parentCallback={this.prompReloadData}
                />

            </Segment>
        )
    }
}






/*

constancias.map?.((constancia) => (
                    <Constancia key={constancia.id} constancia={constancia} />))




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
                                                    <Image src={empty} size='tiny' />
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
                                            <Message
                                                error
                                                header='No se pudo comunicar con el servidor'
                                                style={{height:'16vh', textAlign:'center'}}
                                            />
                                        }
                                    </Transition.Group>
                                </Segment>
                                <ConstanciasModalForm disabled={waitingFetch || fetchError} parentCallback={this.reloadCategoriescallBack} />
                                </Segment> */