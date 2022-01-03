import { Component } from "react"
import { Segment, Header, Icon, List, Transition, Message, Image } from "semantic-ui-react"
import FormulariosModalForm from "../formularios/FormulariosForm"

import ListPlaceholder from "../objetos/placeholders/ListItemPlaceholder"

import _ from 'lodash'

import empty from '../../img/empty.svg'


export default class Formularios extends Component {
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
        const { fetchError, waitingFetch, formularios } = this.props
        return (
            <Segment>
                <Header as="h3" style={{ color: "#bf5748" }}>
                    <Icon name="clipboard list" />
                    <Header.Content>
                        Formularios
                        <Header.Subheader>
                            Cada uno define qué datos se le pedirán a los participantes
                        </Header.Subheader>
                    </Header.Content>
                </Header>
                <Segment basic style={{ overflow: "auto", maxHeight: 150, height: 150, minHeight: 90 }}>
                    <List animated divided>
                        {waitingFetch ?
                            //Esperando datos
                            _.times(3, (i) => (
                                <ListPlaceholder key={i} />
                            ))
                            : formularios.length === 0 && !fetchError ?
                                //No hay formularios en bd
                                <>
                                    <Image src={empty} size='tiny' floated="right" />
                                    <Header content='No se hallaron formularios en la base de datos' style={{ color: '#3F3D56' }} />
                                </>
                                //Presentar formularios
                                : <>Presentar formularios</>
                        }
                    </List>
                    <Transition.Group animation='fade'>
                        {fetchError &&
                            <Message
                                error
                                header='No se pudo comunicar con el servidor'
                                style={{ height: '16vh', textAlign: 'center' }}
                            />
                        }
                    </Transition.Group>
                </Segment>


                <FormulariosModalForm disabled={waitingFetch || fetchError} parentCallback={this.reloadDataCallBack} />



            </Segment>
        )
    }
}