import { Segment, Grid, Header, Icon, List, Button, CardGroup, } from "semantic-ui-react";
//import Categorías
//import Constancias from "./componentes/Constancias";
//import Empresas from "./componentes/Empresas";
//import Formularios
//import Ponentes


export const Datos = () => {    
    const segmentStyle = { overflow: "auto", maxHeight: 250 };

    return (        
            <>                
                <Grid.Row>                        
                    {/*<CategoriasModalForm/>*/}
                    <Header as="h3" style={{ color: "#a95168" }}>
                        <Icon name="th" />
                        <Header.Content>
                            Categorías
                            <Header.Subheader>Agrupa los eventos</Header.Subheader>
                        </Header.Content>
                    </Header>
                    <Segment basic>
                        <CardGroup itemsPerRow={4}>{/*INSERTAR ELEMENTO */}</CardGroup>
                    </Segment>                        
                </Grid.Row>
                <Grid columns={2}>
                    <Grid.Row style={{ marginTop: "2rem" }}>                        
                    <Grid.Column>
                        {/*<Constancias/>*/}
                    </Grid.Column>
                    <Grid.Column>
                        {/*<Empresas/>*/}
                    </Grid.Column>
                 </Grid.Row>
                    <Grid.Row style={{ marginTop: "2rem" }}>
                        <Grid.Column>
                            <Header as="h3" style={{ color: "#bf5748" }}>
                                <Icon name="clipboard list" />
                                <Header.Content>
                                    Formularios
                                    <Header.Subheader>
                                        Datos necesarios para inscribirse
                                    </Header.Subheader>
                                </Header.Content>
                            </Header>
                            <Segment basic style={segmentStyle}>
                                <List animated divided>
                                    {/*INSERTAR ELEMENTO */}
                                </List>
                            </Segment>
                            <Button
                                animated
                                floated="right"
                                style={{ backgroundColor: "#bf5748", color: "#ffffff" }}
                            >
                                <Button.Content visible>
                                    Crear nuevo formulario
                                </Button.Content>
                                <Button.Content hidden>
                                    <Icon name="clipboard list" />
                                </Button.Content>
                            </Button>
                        </Grid.Column>
                        <Grid.Column>
                            <Header as="h3" style={{ color: "#00c9a9" }}>
                                <Icon name="comment" />
                                <Header.Content>
                                    Ponentes
                                    <Header.Subheader>
                                        Los encargados de impartir los eventos
                                    </Header.Subheader>
                                </Header.Content>
                            </Header>
                            <Segment basic style={segmentStyle}>
                                <List animated divided size="small">
                                    {/*INSERTAR ELEMENTO */}
                                </List>
                            </Segment>
                            <Button
                                animated
                                floated="right"
                                style={{ backgroundColor: "#00c9a9", color: "#ffffff" }}
                            >
                                <Button.Content visible>
                                    Registrar nuevo ponente
                                </Button.Content>
                                <Button.Content hidden>
                                    <Icon name="comment" />
                                </Button.Content>
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </>
        
            )
}

export default Datos;

/*categorias
  certificados-constancias
  empresas
  formularios de inscripción
  ponentes*/
