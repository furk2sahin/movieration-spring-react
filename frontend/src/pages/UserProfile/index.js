import Header from "../../components/Header";
import styled from 'styled-components';
import { Grid, Menu, Segment, Container, Image, Card, Icon, Button } from 'semantic-ui-react'
import React, { useState } from 'react'
import UserInformationComponent from "./UserInformationComponent";
import WatchedMoviesComponent from "./WatchedMoviesComponent";
import MovieRewievsComponent from "./MovieRewievsComponent";
import ChangePasswordComponent from "./ChangePasswordComponent";
import DeleteAccountComponent from "./DeleteAccountComponent";
import { useSelector } from "react-redux";


const UserProfile = () => {

    const [activeItem, setActiveItem] = useState('User Information')
    const handleItemClick = (e, { name }) => setActiveItem(name)
    const user = useSelector(state => state.auth.user);

    return (
        <UserProfileDiv>
            <Header></Header>

            <Container style={{ marginTop: '3em' }}>
                <Segment padded='very' color='red' >
                    <Grid stackable>
                        <Grid.Column width={6} >
                            <Menu fluid vertical tabular pointing color='red' stackable>
                                <Menu.Item>
                                    <Card color='red' >
                                        <Segment>
                                            <Image src={user.image ? user.image : user.gender === "FEMALE" ? '/assets/images/female.png' : '/assets/images/male.png' } size="small" centered />
                                        </Segment>
                                        <Card.Content>
                                            <Card.Header>{user.name} {user.surname}</Card.Header>
                                            <Card.Meta>
                                                <span className='username'>{user.username}</span>
                                            </Card.Meta>

                                        </Card.Content>
                                        <Card.Content extra>
                                            <a>
                                                <Icon name='calendar' />
                                                {user.birthDate}
                                            </a>
                                        </Card.Content>
                                    </Card>
                                </Menu.Item>
                                <Menu.Item

                                    name='User Information'
                                    active={activeItem === 'User Information'}
                                    onClick={handleItemClick}
                                />
                                <Menu.Item
                                    name='Watched Movies'
                                    active={activeItem === 'Watched Movies'}
                                    onClick={handleItemClick}
                                />
                                <Menu.Item
                                    name='My Movie Reviews'
                                    active={activeItem === 'My Movie Reviews'}
                                    onClick={handleItemClick}
                                />

                                <Menu.Item>
                                    Settings
                                    <Menu.Menu>
                                        <Menu.Item
                                            name='Change Password'
                                            active={activeItem === 'Change Password'}
                                            onClick={handleItemClick}
                                        >
                                            Change Password
                                        </Menu.Item>
                                        <Menu.Item
                                            name='Delete Account'
                                            active={activeItem === 'Delete Account'}
                                            onClick={handleItemClick}
                                        >
                                            Delete Account
                                        </Menu.Item>
                                    </Menu.Menu>
                                </Menu.Item>

                            </Menu>
                        </Grid.Column>

                        <Grid.Column stretched width={10}>
                            <Segment>
                                {
                                    activeItem === 'Watched Movies' ? <WatchedMoviesComponent userId={user.id}/>
                                        : activeItem === 'User Information' ? <UserInformationComponent user={user}/>
                                            : activeItem === 'My Movie Reviews' ? <MovieRewievsComponent userId={user.id}/>
                                                    : activeItem === 'Change Password' ? <ChangePasswordComponent userId={user.id}/>
                                                        : activeItem === 'Delete Account' ? <DeleteAccountComponent userId={user.id}/>
                                                            : <div>Coming Soon...
                                                            </div>

                                }

                            </Segment>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Container >







        </UserProfileDiv >
    )
}

const UserProfileDiv = styled.div`
    height: 100vh;
`;



export default UserProfile
