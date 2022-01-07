import { NavLink } from "react-router-dom";
import { List, Button, } from "semantic-ui-react";

const Formulario = ({ formulario }) => {
  return (
    <List.Item key={formulario.id}>
      <List.Content floated="right">
        <Button
          compact
          size="mini"
          icon="pencil"
          as={NavLink} to={'/app/datos/formulario/'+formulario.id}
        />
      </List.Content>
      <List.Content>
        <List.Header>{formulario.name}</List.Header>
        <List.Description>
          {formulario.description}
        </List.Description>
      </List.Content>
    </List.Item>
  )
}

export default Formulario