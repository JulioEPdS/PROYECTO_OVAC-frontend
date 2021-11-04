import Categoria from "../objetos/Categoria";

const Categorias = ({ categorias }) => {
    return (
        <>
            {
                categorias.map?.((categoria) => (
                    <Categoria key={categoria.id} categoria={categoria} />))
            }
        </>
    )
}

export default Categorias