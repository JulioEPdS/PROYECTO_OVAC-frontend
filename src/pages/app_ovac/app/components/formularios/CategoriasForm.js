import React, { useState} from 'react'
import { Button, Header, Modal, Icon, Form } from 'semantic-ui-react'

const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
  ]

function CategoriasModalForm() {
    
    const [state, setState] = useState(false)
    const handleChange = (e, { value }) => setState({ value })
    const [open, setOpen] = useState(false)
    const { value } = state

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={
                <Button
                    animated
                    floated="right"
                    style={{ backgroundColor: "#a95168", color: "#ffffff" }}
                >
                    <Button.Content visible content="Crear nueva categoría" />
                    <Button.Content hidden>
                        Vamos <Icon name="th" />
                    </Button.Content>
                </Button>
            }
        >
            <Modal.Header style={{ color: "#a95168" }}>Crear una nueva categoría</Modal.Header>
            <Modal.Content>
                <Modal.Description style={{marginBottom:'1rem'}}>
                    <Header color='grey'>Por favor llene los siguientes campos:</Header>
                </Modal.Description>
                <Form style={{marginLeft:'10rem', marginRight:'10rem'}}>
                    
                        <Form.Input fluid label='First name' placeholder='First name' />
                        <Form.Input fluid label='Last name' placeholder='Last name' />
                        <Form.Select
                            fluid
                            label='Gender'
                            options={options}
                            placeholder='Gender'
                        />
                        <Form.Input fluid label='First name' placeholder='First name' />
                        <Form.Input fluid label='Last name' placeholder='Last name' />
                        <Form.Input fluid label='First name' placeholder='First name' />
                        <Form.Input fluid label='Last name' placeholder='Last name' />
                    
                    <Form.Group inline>
                        <label>Size</label>
                        <Form.Radio
                            label='Small'
                            value='sm'
                            checked={value === 'sm'}
                            onChange={handleChange}
                        />
                        <Form.Radio
                            label='Medium'
                            value='md'
                            checked={value === 'md'}
                            onChange={handleChange}
                        />
                        <Form.Radio
                            label='Large'
                            value='lg'
                            checked={value === 'lg'}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.TextArea label='About' placeholder='Tell us more about you...' />
                    <Form.Checkbox label='I agree to the Terms and Conditions' />
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                    Cancelar
                </Button>
                <Button
                    content="Listo!"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={() => setOpen(false)}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}

export default CategoriasModalForm
