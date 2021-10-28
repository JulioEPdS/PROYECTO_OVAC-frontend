import { Segment, Header, Icon, List, Button } from "semantic-ui-react";
import { Empresa } from "./Empresa";

export const Empresas = () => {
    const segmentStyle = { overflow: "auto", maxHeight: 150 };
    return (
        <Segment>
            <Header as="h3" style={{ color: "#007a99" }}>
                <Icon name="industry" />
                <Header.Content>
                    Empresas
                    <Header.Subheader>
                        Organismos capacitadores
                    </Header.Subheader>
                </Header.Content>
            </Header>
            <Segment basic style={segmentStyle}>
                <List animated divided relaxed>
                    <Empresa/>
                </List>
            </Segment>
            <Button
                animated floated="right" style={{ backgroundColor: "#007a99", color: "#ffffff" }}>
                <Button.Content visible>
                    Registrar nueva <Icon name="industry" />
                </Button.Content>
                <Button.Content hidden>
                    Vamos <Icon name="add circle" />
                </Button.Content>
            </Button>
        </Segment>
    )
}