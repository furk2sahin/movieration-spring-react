import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Header, Segment, Table } from 'semantic-ui-react'
import { getCommentsByUserId } from '../../requests';
import {loading, loaded} from "../../redux_slices/loadingSlice";

function MovieRewievsComponent({userId}) {
    const [reviews, setReviews] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        getReviews();
    }, []);

    const getReviews = async () => {
        dispatch(loading);
        const response = await getCommentsByUserId(userId)
        if(response.status === 200){
            setReviews(response.data);
        }
        dispatch(loaded);
    };

    return (
        <div>
            <Segment color='red'>
                <Header size='medium' as='h1' icon='comments' content='My Movie Rewievs' />
            </Segment>


            <Table celled padded>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell singleLine>Movie</Table.HeaderCell>
                        <Table.HeaderCell>Rating</Table.HeaderCell>
                        <Table.HeaderCell>My Rewiev</Table.HeaderCell>

                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        reviews && reviews.length > 0 ?
                        reviews.map((review) => (
                        <Table.Row>
                            <Table.Cell singleLine>
                                <Header size='medium' as='h1' textAlign='center'>
                                    {review.movie.name}
                                </Header>
                            </Table.Cell>
                            <Table.Cell singleLine>{review.rate}</Table.Cell>
                            
                            <Table.Cell>
                                {review.comment}
                            </Table.Cell>
                        </Table.Row>
                        )): null
                    } 
                    
                </Table.Body>
            </Table>

        </div>
    )
}

export default MovieRewievsComponent
