import Constancia from "../objetos/Constancia";

const Constancias = ({ constancias }) => {
    return (
        <>
            {
                constancias.map?.((constancia) => (
                    <Constancia key={constancia.id} constancia={constancia} />))
            }
        </>
    )
}

export default Constancias