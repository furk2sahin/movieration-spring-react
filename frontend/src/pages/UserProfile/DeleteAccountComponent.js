import React from 'react'
import { useRef } from 'react'
import { useDispatch } from 'react-redux';
import { Header, Segment, Message, Checkbox, Button, Container } from 'semantic-ui-react'
import { logOut } from '../../redux_slices/authSlice';
import { loaded, loading } from '../../redux_slices/loadingSlice';
import { deleteAccountById } from '../../requests';

function DeleteAccountComponent({userId}) {
    const checkboxref = useRef();
    const dispatch = useDispatch();

    const deleteAccount = async () => {
        console.log(checkboxref);
        if(!checkboxref.current.state.checked) return;
        dispatch(loading());
        const response = await deleteAccountById(userId);
        if(response.status === 200){
            dispatch(logOut());
            alert('Deleted!');
        }
        dispatch(loaded());
    }

    return (
        <div>
            <Segment color='red'>
                <Header size='medium' as='h1' icon='user delete' content='Delete Account' />
            </Segment>

            <Message>
                <Message.Header>Are you sure to delete your account?</Message.Header>
                <p>
                    If you agree to delete your account, your account will be permanently deleted1
                </p>
            </Message>
            <Container  >
                <Checkbox ref={checkboxref} label='I want to delete my account permanently.' />
            </Container>

            <Button onClick={deleteAccount} style={{ marginTop: '1em' }} color='red'>Delete Account</Button>

        </div >
    )
}

export default DeleteAccountComponent
