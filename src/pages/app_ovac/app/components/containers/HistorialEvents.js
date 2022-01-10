import HistorialEvento from '../objetos/WaitingEvent'

const HistorialEventos = ({eventos})=>{

    return(<>
            {eventos.map?.((evento) =>(                
                <HistorialEvento key={evento.UUID+'Ev'} evento={evento}/>))
            }
        </>
    )
}

export default HistorialEventos