import { Statistic, Grid, Card, Icon, Header } from 'semantic-ui-react'

export default function Home() {
    return (
        <div>
                <Grid.Row>
                    <Card fluid color='yellow'>
                      <Card.Content>
                        <Card.Header>
                            <Header as='h1' color='grey'>
                            <Icon name='coffee'/>
                                Management de eventos en un par de clicks
                            </Header>
                        </Card.Header>
                        <Card.Meta>Qué es la OVAC?</Card.Meta>
                        <Card.Description>
                            <Header as='h2' color='yellow'>Una plataforma</Header>
                            <p>
                              La OVAC está conformada por dos aplicaciones, la webapp en la que estás
                              y una aplicación móvil desarrollada exclusivamente para la secretaría de
                              economía y el trabajo en el 2021. Esta plataforma se desarrolló con el 
                              apoyo del TECNM tapachula.
                            </p>
                            <p>
                              Esta aplicación web te permite realizar todas las tareas de administración 
                              para eventos, sean presenciales o virtuales
                            </p>
                        </Card.Description>
                      </Card.Content>
                    </Card>
                                       
                </Grid.Row>
                <Grid.Row style={{marginTop:'2rem'}}>
                <Statistic.Group>
                    <Statistic label='Eventos' value='22' color='grey'/>
                    <Statistic label='Usuarios' value='Three Thousand' text color='brown'style={{fontColor:'#aba'}}/>
                    <Statistic label='Sedes' value='5' color='grey'/>
                    <Statistic label='Miembros' value='42' color='brown'/>
                    </Statistic.Group>
                </Grid.Row>
        </div>
    )
}
