import { Card, Icon, Label} from 'semantic-ui-react'
import Moment from 'moment'
import 'moment/locale/es-mx'


const Evento = ({evento}) => {

    //Dynamic style depending on which type gets
    const typecolor = evento.Tipo === 'Curso' ? 'orange' : evento.Tipo === 'Plática' ? 'red' : evento.Tipo==='Congreso' ? 'brown' : 'teal'
    const typeicon = evento.Tipo === 'Curso' ? 'briefcase' : evento.Tipo === 'Plática' ? 'coffee' : evento.Tipo==='Congreso' ? 'university': 'calendar'
    //const content = evento.data_type

    //const typetext = typecolor === 'light' ? 'dark' : 'white'
    
    //Working with datetime values
    const data_day = (String(evento.Inicio)).slice(0,-1) //MSSQL uses the ISO-8601 but adds a Z at the end, Z must be removed
    Moment.locale('es-mx')
    const fecha = Moment(data_day).format('DD MMMM')//Gives day and month

    const countdown = Moment(data_day).fromNow()//Results in a calculation for getting a days countdown
    //Moment.locale('en')//es-mx doesn't allow 12h format, change to en
    //const hora = Moment(data_day,moment.ISO_8601).format('LT')

    

    //Building the response chunck element
    return (
        <Card link>
            <Card.Content>                        
                {/*<Label color={typecolor} ribbon='right' icon={typeicon} content={evento.type}/>*/}
                <Card.Header>{evento.Título}</Card.Header>
                <Card.Meta><p>Se llevará acabo {countdown}</p>{/*<p>Hora: {hora}</p> <p>Fecha: {fecha}</p> */}</Card.Meta>                
                <br></br>           
                <Label attached='bottom right' color={typecolor}><Icon name={typeicon}/>{fecha}
                    <Label.Detail>{evento.Tipo}</Label.Detail>
                </Label> 
            </Card.Content>
        </Card>
            
       
    )
}

export default Evento