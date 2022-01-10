import WaitingEvento from '../objetos/WaitingEvent'

const WaitingEventos = ({eventos})=>{

    return(<>
            {eventos.map?.((evento) =>(                
                <WaitingEvento key={evento.UUID+'Ev'} evento={evento}/>))
            }
        </>
    )
}

export default WaitingEventos
