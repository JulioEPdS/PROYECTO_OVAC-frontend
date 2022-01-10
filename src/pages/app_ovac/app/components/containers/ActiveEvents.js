import ActiveEvento from '../objetos/ActiveEvent'

const ActiveEventos = ({eventos})=>{

    return(<>
            {eventos.map?.((evento) =>(                
                <ActiveEvento key={evento.id+'Ev'} evento={evento}/>))
            }
        </>
    )
}

export default ActiveEventos