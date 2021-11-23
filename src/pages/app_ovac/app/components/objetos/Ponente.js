import { List, Button, } from "semantic-ui-react";

const Ponente = ({ponente}) =>{
  return (
    <List.Item key={ponente.id}>
      <List.Content floated="right">
        <Button as='a' href={'#'+ponente.id} compact size="mini" icon="pencil" />
      </List.Content>
      <List.Content>
        <List.Header>{ponente.nombre+' '+ponente.apellido_p+' '+ponente.apellido_m}</List.Header>
        <List.Description>
          {ponente.email}
        </List.Description>
      </List.Content>
    </List.Item>
  )
}

export default Ponente