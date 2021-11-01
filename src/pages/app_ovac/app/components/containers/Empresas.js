import Empresa from "../objetos/Empresa";

const Empresas = ({ empresas }) => {
    return (
        <>
            {
                empresas.map?.((empresa) => (
                    <Empresa key={empresa.id} empresa={empresa} />))
            }
        </>
    )
}

export default Empresas