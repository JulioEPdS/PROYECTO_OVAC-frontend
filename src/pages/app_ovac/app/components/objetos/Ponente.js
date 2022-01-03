import { NavLink } from "react-router-dom";
import { List, Button, } from "semantic-ui-react";

const Ponente = ({ ponente }) => {
  return (
    <List.Item key={ponente.id}>
      <List.Content floated="right">
        <Button
          compact
          size="mini"
          icon="pencil"
          as={NavLink} to={'/app/datos/ponente/'+ponente.id}
        />
      </List.Content>
      <List.Content>
        <List.Header>{ponente.nombre + ' ' + ponente.apellido_p + ' ' + ponente.apellido_m}</List.Header>
        <List.Description>
          {ponente.email}
        </List.Description>
      </List.Content>
    </List.Item>
  )
}

export default Ponente