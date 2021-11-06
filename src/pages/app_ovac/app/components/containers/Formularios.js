import { Component } from "react"
import {Segment, Header, Icon, List, Transition, Message } from "semantic-ui-react"
import FormulariosModalForm from "../formularios/FormulariosForm"


export default class Formularios extends Component {
    constructor(props) {
        super(props)

        this.reloadDataCallBack = this.reloadDataCallBack.bind(this)
    }


    reloadDataCallBack(childData){
        if(childData === 'reload'){
            this.props.parentCallback('reload')
        }
    }

    render() {
        const {formularios, fetchError, waitingFetch} = this.props
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
                        {formularios}
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


               <FormulariosModalForm disabled={waitingFetch || fetchError} parentCallback={this.reloadDataCallBack}/>



            </Segment>
        )
    }
}