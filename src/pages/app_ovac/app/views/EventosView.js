//Gráfico y de estado
import { Component } from 'react'
import { Grid, Header, Segment, Card, Button, Icon} from 'semantic-ui-react'
//Funcional-consumo API 
import Axios from 'axios'
//Elementos-vistas
//import EventPlaceholder from './componentes/EventsPlaceholder'
//import HistoricalPlaceholder from './componentes/HistoricalPlaceholder'
import Events from '../components/containers/Events'
import { AuthContext } from '../../../../auth/AuthContext'

export default class ViewEventos extends Component {            

    static contextType = AuthContext

    constructor(props){        
        super(props)
        this.state = {
            eventos: [],
            waitingeventos: true,
            fetcherror: false,
            user: [],
            reload: false
        }    
        this.reloadEventos = this.reloadEventos.bind(this)        
    }

    reloadEventos(){
        this.setState({waitingeventos: true})
        const {user} = this.context
        Axios.get('http://localhost:5000/eventos',{
            headers:{
                'Authorization': 'Bearer '+user.token
            }
        })
        .then((result)=>{            
            this.setState({eventos: result.data, waitingeventos: false})
            console.log(this.state.eventos)
        })
        .catch((err)=>{
            console.log('no se ha podido comunicar')            
            this.setState({fetcherror: true})
        })  
    }

    componentDidMount(){
        const {user} = this.context
        Axios.get('http://localhost:5000/eventos',{
            headers:{
                'Authorization': 'Bearer '+user.token
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
        const {eventos, waitingeventos} = this.state
    return (
        <>
            {/*<Grid style={{marginTop:'0.2rem', marginLeft:'0.5rem'}}>*/}
            <Button icon loading={waitingeventos} color='blue' floated='right' onClick={this.reloadEventos}>                                
                <Icon name='refresh' />
            </Button> 
            <Button icon labelPosition='right' loading={waitingeventos} style={{backgroundColor:'#c9a915', color:'#ffffff'}} floated='right'>                
                Nuevo Evento 
                <Icon name='calendar plus outline' />
            </Button>                            
            <Grid.Row style={{marginTop: '2rem'}}>
                <Header as='h2' color='grey' dividing content='Eventos activos'/>                                                       
                <Segment loading={waitingeventos} style={{overflowX: 'auto', maxHeight: 220 }} basic>
                    <Card.Group itemsPerRow='4'>                                                    
                        {!waitingeventos &&
                            <Events eventos={eventos}/>                            
                        }
                                            
                    </Card.Group>                                                                            
                </Segment>
                <Header as='h5' style={{color:'#c9a915'}}>
                        Hay {eventos.length} eventos activos
                </Header> 
            </Grid.Row>
            <Grid.Row style={{marginTop: '1rem'}}>
                <Header as='h2' color='grey' dividing content='Historial de eventos'/>
                <Segment loading={waitingeventos} basic style={{overflow: 'auto', maxHeight: 150 }}>                                        
                    
                </Segment>
                             
            </Grid.Row>
                
            {/*</Grid>*/}
        </>
    )}
}