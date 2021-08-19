import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Header, Segment, Form, Button, Message } from 'semantic-ui-react'
import { loaded, loading } from '../../redux_slices/loadingSlice';
import { changeUserPasswordById } from '../../requests';

function ChangePasswordComponent({userId}) {
    const [successfull, setsuccessfull] = useState(null);
    const dispatch = useDispatch();

    const onChangePassword = async (e) => {
        e.preventDefault();
        dispatch(loading);
        if((e.target[0].value && e.target[1].value && e.target[2].value) && e.target[1].value === e.target[2].value){
            const response = await changeUserPasswordById(userId, e.target[1].value);
            if(response.status === 200){
                setsuccessfull(true);
            }else{
                setsuccessfull(false);
            }
        }
        dispatch(loaded);
    };

    return (
        <div>
            <Segment color='red'>
                <Header size='medium' as='h1' icon='settings' content='Change Password' />
            </Segment>

            <Form onSubmit={onChangePassword} className={successfull === null ? '' : successfull ? 'success' : 'warning'}>
                <Form.Field required width={10} >
                    <label>Current Password</label>
                    <input placeholder='Password' type="password" />
                </Form.Field>
                <Form.Field required width={10} >
                    <label>New Password</label>
                    <input placeholder='New Password' type="password" />
                    {/*password kontrolü yapıp uyarı kutucuğu eklenecek!!!*/}
                </Form.Field>
                <Form.Field required width={10} >
                    <label>New Password(Again)</label>
                    <input placeholder='New Password' type="password" />
                </Form.Field>
                <Button type='submit'>Save</Button>
                <Message
                    success
                    header='Successfully saved!'
                    content="Your password succesfully changed!"
                />                                                        {/*degistikten sonra*/}
            </Form>

        </div>
    )
}

export default ChangePasswordComponent
