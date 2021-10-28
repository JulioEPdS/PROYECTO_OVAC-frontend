//Gráfico y de estado
import { Component } from 'react'
import { Grid, Header, Segment, Card, Button, Icon} from 'semantic-ui-react'
//Funcional-consumo API 
import Axios from 'axios'
//Elementos-vistas
//import EventPlaceholder from './componentes/EventsPlaceholder'
//import HistoricalPlaceholder from './componentes/HistoricalPlaceholder'
import Events from '../components/containers/Events'

export default class ViewEventos extends Component {            

    constructor(props){        
        super(props)
        this.state = {
            eventos: [],
            waitingeventos: true,
            fetcherror: false,
            user: []
        }    
    }

    

    componentDidMount(){
        
        Axios.get('http://localhost:5000/eventos',{
            headers:{
                'Authorization': 'Bearer '+this.context.token
            }
        })
        .then((result)=>{            
            this.setState({eventos: result.data, waitingeventos: false})
        })
        .catch((err)=>{
            console.log('no se ha podido comunicar')
            this.setState({fetcherror: true})
        })   
    }
    //const {user} = useContext(AuthContext)

    //const [eventos, setEventos] = useState([])    

    /*useEffect(() =>{        
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
    }*/

render(){
    const eventsportion = () =>{
        return <Events eventos={this.state.eventos}/>
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
                <Segment loading={this.state.waitingeventos} style={{overflowX: 'auto', maxHeight: 220 }} basic>
                    <Card.Group itemsPerRow='4'>                                                    
                        {/*<Events eventos={eventos}/>*/
                            eventsportion                        
                        }
                                            
                    </Card.Group>                                                                            
                </Segment>
                <Header as='h5' style={{color:'#c9a915'}}>
                        Hay {this.state.eventos.length} eventos activos
                </Header> 
            </Grid.Row>
            <Grid.Row style={{marginTop: '1rem'}}>
                <Header as='h2' color='grey' dividing content='Historial de eventos'/>
                <Segment loading={this.state.waitingeventos} basic style={{overflow: 'auto', maxHeight: 150 }}>                                        
                    
                </Segment>
                             
            </Grid.Row>
                
            {/*</Grid>*/}
        </>
    )}
}