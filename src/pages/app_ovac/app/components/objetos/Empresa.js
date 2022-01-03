import { NavLink } from "react-router-dom";
import { List, Button } from "semantic-ui-react";

const Empresa = ({empresa}) =>{
  return (
    <List.Item key={empresa.id}>
      <List.Content floated="right">
        <Button 
          compact 
          size="mini" 
          icon="pencil" 
          as={NavLink} to={'/app/datos/empresa/'+empresa.id}
        />
      </List.Content>
      <List.Content>
        <List.Header>{empresa.name}</List.Header>
        <List.Description>
          {empresa.r_social}
        </List.Description>
      </List.Content>
    </List.Item>
  )
}

export default Empresa
