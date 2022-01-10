import { List, Icon, Label} from 'semantic-ui-react'
import Moment from 'moment'
import 'moment/locale/es-mx'
import { NavLink } from 'react-router-dom'


const HistorialEvento = ({evento}) => {

    //Dynamic style depending on which type gets
    const typecolor = evento?.type === 'Curso' ? 'orange' : evento?.type === 'Plática' ? 'red' : evento?.type==='Congreso' ? 'brown' : evento?.type==='Capacitación' ? 'teal' : 'olive'
    const typeicon = evento?.type === 'Curso' ? 'briefcase' : evento?.type === 'Plática' ? 'coffee' : evento?.type==='Congreso' ? 'university': evento?.type==='Capacitación' ? 'bullhorn' : 'calendar'
    //const content = evento.data_type

    //const typetext = typecolor === 'light' ? 'dark' : 'white'
    
    //Working with datetime values
    const data_day = (String(evento?.start_date)).slice(0,-1) //MSSQL uses the ISO-8601 but adds a Z at the end, Z must be removed
    Moment.locale('es-mx')
    const fecha = Moment(data_day).format('DD MMMM')//Gives day and month

    const countdown = Moment(data_day).fromNow()//Results in a calculation for getting a days countdown
    //Moment.locale('en')//es-mx doesn't allow 12h format, change to en
    //const hora = Moment(data_day,moment.ISO_8601).format('LT')

    

    //Building the response chunck element
    return (
        <List.Item key={evento?.id} as={NavLink} to={'/app/eventos/historial/'+id}>
            <List.Content>                                        
                <List.Header>{evento?.title}</List.Header>
                <List.Description><p>Se llevó a cabo {countdown}</p></List.Description>   
                <br></br>           
                <Label attached='bottom right' color={typecolor}><Icon name={typeicon}/>{fecha}
                    <Label.Detail>{evento?.type}</Label.Detail>
                </Label> 
            </List.Content>
        </List.Item>                   
    )
}

export default HistorialEvento