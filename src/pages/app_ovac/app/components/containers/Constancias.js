import { AuthContext } from '../../../auth/AuthContext'
import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { Segment, Header, Icon, List, Button} from "semantic-ui-react";
import { Constancia } from "./Constancia";

export const Constancias = () => {
    const segmentStyle = { overflow: "auto", maxHeight: 150 };

    const [constancias, setConstancias] = useState([])    
    
    const {user} = useContext(AuthContext)

    useEffect(()=>{
        const getConstancias = async() =>{
            const constanciasFromserver = await fetchConstancias()
            setConstancias(constanciasFromserver)
        }
        getConstancias()

    },[])// eslint-disable-line react-hooks/exhaustive-deps

    const fetchConstancias = async()=>{
        const res = await axios.get('http://localhost:5000/objects/certdocs',{
            headers:{
                'Authorization': 'Bearer '+user.token               
            }
        })
        .then((response)=>{
            console.log('Info recibida')
            return(response.data)        
        })
        .catch((err)=>{
            console.log(err)
        })
        const data = await res
        return data
    }

    return(
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
                {constancias.map?.((constancia) => (
                        <Constancia key={constancia.id} constancia={constancia}/>))
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

)}

export default Constancias