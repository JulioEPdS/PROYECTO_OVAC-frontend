import Axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from '../../../../auth/AuthContext'

function ConsultaObjetos(){    

    const { user } = useContext(AuthContext)

        Axios.get('http://localhost:5000/objects/certdocs', {
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
            .then(
                (result) => {
                    return(result.data)
                },
                (error) => {                    
                    return([])
                }
            )
}

export default ConsultaObjetos