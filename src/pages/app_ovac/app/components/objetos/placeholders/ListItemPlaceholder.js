import { List, Placeholder } from "semantic-ui-react"

export const ListPlaceholder = () => {
    return (
        <>
            <List.Item>
                <List.Content>
                    <Placeholder>
                        <Placeholder.Header>
                            <Placeholder.Line />
                            <Placeholder.Line />
                        </Placeholder.Header>                        
                    </Placeholder>
                </List.Content>
            </List.Item>
        </>
    )
}
export default ListPlaceholder