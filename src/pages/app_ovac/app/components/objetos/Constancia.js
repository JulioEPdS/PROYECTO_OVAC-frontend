import { NavLink } from "react-router-dom";
import { List, Button, } from "semantic-ui-react";

const Constancia = ({constancia}) => {
  return (
    <List.Item key={constancia.id}>
      <List.Content floated="right">
        <Button 
          compact 
          size="mini" 
          icon="pencil" 
          as={NavLink} to={'/app/datos/constancia/'+constancia.id}
        />
      </List.Content>
      <List.Content>
        <List.Header>{constancia.name}</List.Header>
        <List.Description>{constancia.description}</List.Description>
      </List.Content>
    </List.Item>
  )
}

export default Constancia