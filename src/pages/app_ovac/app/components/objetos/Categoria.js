import { Card, Icon } from "semantic-ui-react"
import { NavLink } from 'react-router-dom'


export const Categoria = ({categoria}) => {
    return (
        <>
            <Card 
                style={{
                    height:'80px', 
                    width:'250px', 
                    marginTop:'1px', 
                    overflowY:'hidden'
                }} 
                color={categoria.color} 
                as={NavLink} to={'/app/datos/categoria/'+categoria.id}
            >
                <Card.Content>
                    <Card.Header>
                        <Icon name={categoria.icon} color={categoria.color}/>
                        {categoria.name}
                    </Card.Header>
                    <Card.Description>
                        {categoria.description}
                    </Card.Description>                    
                </Card.Content>                
            </Card>
        </>
    )
}
export default Categoria