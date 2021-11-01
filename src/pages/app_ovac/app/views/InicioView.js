import { Grid, Image } from 'semantic-ui-react'
import place from '../img/place.svg'


export default function Home() {
    return (
        <div>
                <Grid.Row>
                    
                                       
                </Grid.Row>
                <Grid.Row style={{marginTop:'2rem'}}>
                
                </Grid.Row>
                
                
                <Image size='huge' src={place} alt='Place' style={{position:'fixed',left:'-42%',top:'40%', zIndex:'-20', opacity:'.6'}}/>
                
        </div>
    )
}
