//Gráfico y de estado
import { useState, useEffect, useContext } from 'react'
import { Grid, Header, Segment, Card, Button, Icon} from 'semantic-ui-react'
import { AuthContext } from '../../../../auth/AuthContext'
//Funcional-consumo API 
import Axios from 'axios'
//Elementos-vistas
//import EventPlaceholder from './componentes/EventsPlaceholder'
//import HistoricalPlaceholder from './componentes/HistoricalPlaceholder'
import Events from '../../components/containers/Events'

export default function ViewEventos() {
    const {user} = useContext(AuthContext)

    const [eventos, setEventos] = useState([])    

    useEffect(() =>{        
       const getEventos = async () =>{
           const eventosFromServer = await fetchEventos()
           setEventos(eventosFromServer)
       }
       getEventos()

    }, [])// eslint-disable-line react-hooks/exhaustive-deps
    
    const fetchEventos = async () =>{                
        const res = await Axios.get('http://localhost:5000/eventos',{
            headers:{
                'Authorization': 'Bearer '+user.token
            }
        })
        .then((result)=>{
            const data = result.data
            return data
        })
        .catch((err)=>{
            console.log('no se ha podido comunicar')              
        })   
        const events = await res
        return events
        
    }

    return (
        <>
            {/*<Grid style={{marginTop:'0.2rem', marginLeft:'0.5rem'}}>*/}
            
            <Button disabled animated style={{backgroundColor:'#c9a915', color:'#ffffff'}} floated='right'>
                <Button.Content visible>Nuevo Evento</Button.Content>
                <Button.Content hidden>
                    Crear nuevo <Icon name='calendar plus outline' />
                </Button.Content>          
            </Button>                
            
            <Grid.Row style={{marginTop: '2rem'}}>
                <Header as='h2' color='grey' dividing content='Eventos activos'/>                                                       
                <Segment style={{overflowX: 'auto', maxHeight: 220 }} basic>
                    <Card.Group itemsPerRow='4'>
                                                    
                        <Events eventos={eventos}/>                            
                                            
                    </Card.Group>                                                                            
                </Segment>
                <Header as='h5' style={{color:'#c9a915'}}>
                        Hay {eventos.length} eventos activos
                </Header> 
            </Grid.Row>
            <Grid.Row style={{marginTop: '1rem'}}>
                <Header as='h2' color='grey' dividing content='Historial de eventos'/>
                <Segment basic style={{overflow: 'auto', maxHeight: 150 }}>                                        
                    
                </Segment>
                             
            </Grid.Row>
                
            {/*</Grid>*/}
        </>
    )
}
