import React from 'react'
import { Header, Segment, Form } from 'semantic-ui-react'

const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },

]


function UserInformationComponent({user}) {
    return (
        <>
            <Segment color='red'>
                <Header size='medium' as='h1' icon='user' content='User Information' />
            </Segment>

            <Form>
                <Form.Group>
                    <Form.Field width={9}>
                        <label > Name </label>
                        <input placeholder='Name' value={user.name} readOnly/>

                    </Form.Field>

                    <Form.Field width={9}>
                        <label > Surname </label>
                        <input placeholder='Surname' value={user.surname} readOnly/>

                    </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.Field width={9}>
                        <label > User Name </label>
                        <input placeholder='User Name' value={user.username} readOnly/>

                    </Form.Field>

                    <Form.Field width={9}>
                        <label > E-Mail </label>
                        <input placeholder='E-Mail' value={user.email} readOnly/>

                    </Form.Field>
                </Form.Group>

                <Form.Group widths='equal'>
                    <Form.Field>
                        <label > Birth Day </label>
                        <input placeholder='Birth day' value={user.birthDate} readOnly/>

                    </Form.Field>
                    <Form.Input
                    
                        label='Gender'
                        placeholder='Gender'
                        value={user.gender}
                    />
                </Form.Group>

            </Form>
        </>




    )
}

export default UserInformationComponent
