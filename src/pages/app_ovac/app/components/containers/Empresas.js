import { Component } from "react";
import { Segment, Header, Icon, List, Transition, Message, Image } from "semantic-ui-react";

import Empresa from "../objetos/Empresa";
import EmpresasModalForm from '../formularios/EmpresasForm'
import ListPlaceholder from "../objetos/placeholders/ListItemPlaceholder";

import _ from 'lodash'


import empty from '../../img/empty.svg'

export default class Empresas extends Component {
    constructor(props) {
        super(props)

        this.reloadDataCallBack = this.reloadDataCallBack.bind(this)
    }

    reloadDataCallBack(childData) {
        if (childData === 'reload') {
            this.props.parentCallback('reload')
        }
    }

    render() {
        const { empresas, fetchError, waitingFetch } = this.props
        return (
            <Segment>
                <Header as="h3" style={{ color: "#007A99" }}>
                    <Icon name="industry" />
                    <Header.Content>
                        Empresas
                        <Header.Subheader>
                            Públicas o privadas, son quienes facilitan el evento de capacitación
                        </Header.Subheader>
                    </Header.Content>
                </Header>
                <Segment basic style={{ overflow: "auto", maxHeight: 150, height: 150, minHeight: 90 }}>
                    <List animated divided relaxed size="small">
                        {waitingFetch ?
                            //Esperando datos
                            _.times(3, (i) => (
                                <ListPlaceholder key={i} />
                            ))
                            : empresas.length === 0 && !fetchError ?
                                //No hay empresas en la base de datos
                                <>
                                    <Image src={empty} size='tiny' floated="right" />
                                    <Header content='No se hallaron empresas en la base de datos' style={{ color: '#3F3D56' }} />
                                </>
                                //Presentamos la información
                                : empresas.map?.(
                                    (empresa) => (<Empresa key={empresa.id} empresa={empresa} />)
                                )
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
                <EmpresasModalForm disabled={waitingFetch || fetchError} parentCallback={this.reloadDataCallBack} />
            </Segment>
        )
    }
}

