import Evento from '../objetos/Event'

const Eventos = ({eventos})=>{

    return(<>
            {eventos.map?.((evento) =>(
                <Evento key={evento.uuid+'Ev'} evento={evento}/>))
            }
        </>
    )
}

export default Eventos
