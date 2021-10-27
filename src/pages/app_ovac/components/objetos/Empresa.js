import { Placeholder, List, Button, } from "semantic-ui-react";
import _ from "lodash";

export const Empresa = () =>{
return(<>
    {/*INSERTAR ELEMENTO .MAP */
    _.times(6, (i) => (
        <List.Item key={i + 5}>
          <List.Content floated="right">
            <Button disabled compact size="mini" icon="pencil" />
          </List.Content>
          <List.Content>
            <Placeholder>
              <Placeholder.Line length="short" />
              <Placeholder.Line />
            </Placeholder>
          </List.Content>
        </List.Item>
      ))
    }
    </>
)}