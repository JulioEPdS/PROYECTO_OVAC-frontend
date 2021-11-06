import { Component } from "react";
import { Segment, Header, Icon, List, Transition, Message } from "semantic-ui-react";

import Empresa from "../objetos/Empresa";
import EmpresasModalForm from '../formularios/EmpresasForm'

//import empty from '../../img/empty.svg'

export default class Empresas extends Component {
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
        const {empresas, fetchError, waitingFetch} = this.props
        return (
            <Segment>
                <Header as="h3" style={{ color: "#007a99" }}>
                    <Icon name="industry" />
                    <Header.Content>
                        Empresas
                        <Header.Subheader>
                            Públicas o privadas, son quienes facilitan el evento de capacitación
                        </Header.Subheader>
                    </Header.Content>
                </Header>
                <Segment basic style={{overflow: "auto", maxHeight: 150, height: 150, minHeight: 90}}>
                    <List animated divided relaxed>
                        {empresas &&
                            empresas.map?.(
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
                                style={{height:'16vh', textAlign:'center'}}
                            />
                        }
                    </Transition.Group>
                </Segment>
                <EmpresasModalForm disabled={waitingFetch || fetchError} parentCallback={this.reloadDataCallBack}/>
            </Segment>
        )
    }
}

