import { useContext } from "react"
import { AuthContext } from "../../auth/AuthContext"

export const Perfil = () => {
    const {user} = useContext(AuthContext)
    return (
        <div>
            <p> Aquí se encontrá información del usuario</p>  
            <p>Su usuario es: {user.name}</p>          
        </div>
    )
}

export default Perfil