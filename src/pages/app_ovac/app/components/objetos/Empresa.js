import { List, Button, } from "semantic-ui-react";

const Empresa = ({empresa}) =>{
  return (
    <List.Item key={empresa.id}>
      <List.Content floated="right">
        <Button disabled compact size="mini" icon="pencil" />
      </List.Content>
      <List.Content>
        <List.Header>{empresa.name}</List.Header>
        <List.Description>{empresa.dscrptn}</List.Description>
      </List.Content>
    </List.Item>
  )
}

export default Empresa
