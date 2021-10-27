import { List, Button, } from "semantic-ui-react";

export const Constancia = ({constancia}) => {
  return (
    <List.Item key={constancia.id}>
      <List.Content floated="right">
        <Button disabled compact size="mini" icon="pencil" />
      </List.Content>
      <List.Content>
        <List.Header>{constancia.name}</List.Header>
        <List.Description>{constancia.dscrptn}</List.Description>
      </List.Content>
    </List.Item>
  )
}