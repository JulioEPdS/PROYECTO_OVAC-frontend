import { List, Button, } from "semantic-ui-react";

const Constancia = ({constancia}) => {
  return (
    <List.Item key={constancia.id}>
      <List.Content floated="right">
        <Button compact size="mini" icon="pencil" 
          //as={NavLink} to={'/ovac/datos/constancia/'+constancia.id} implementar vista dinámica
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