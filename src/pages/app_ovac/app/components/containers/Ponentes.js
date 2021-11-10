import { Component } from "react";
import { Segment, Header, List, Transition, Icon, Message } from "semantic-ui-react";
import PonentesModalForm from "../formularios/PonentesForm";


export default class Ponentes extends Component {
    constructor(props) {
        super(props)

        this.reloadDataCallback = this.reloadDataCallback.bind(this)
    }

    reloadDataCallback(childData) {
        if (childData === 'reload') {
            this.props.parentCallback('reload')
        }
    }

    render() {
        const { ponentes, fetchError, waitingFetch } = this.props
        return (
            <Segment>
                <Header as="h3" style={{ color: "#00c9a9" }}>
                    <Icon name="comment" />
                    <Header.Content>
                        Ponentes
                        <Header.Subheader>
                            Las personas encargadas de impartir las capacitaciones o manejar los eventos
                        </Header.Subheader>
                    </Header.Content>
                </Header>
                <Segment basic style={{ overflow: "auto", maxHeight: 150, height: 150, minHeight: 90 }}>
                    <List animated divided size="small">
                        {/*ponentes*/}
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
                
                <PonentesModalForm 
                    disabled={waitingFetch || fetchError} 
                    parentCallback={this.reloadDataCallback}
                />

            </Segment>
        )
    }
}








/*






 */