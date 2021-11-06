import { Card, Placeholder } from "semantic-ui-react"

export const CardPlaceholder = () => {
    return (
        <>
            <Card style={{height:'80px', width:'250px', marginTop:'1px'}}>              
                <Card.Content>
                    <Placeholder>
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder>
                </Card.Content>
            </Card>
        </>
    )
}
export default CardPlaceholder