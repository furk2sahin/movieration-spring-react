import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { Header, Segment, Table, Rating } from 'semantic-ui-react'
import { getWatchedMoviesByUserId } from '../../requests';


function WatchedMoviesComponent({ userId }) {

    const [watchedMovies, setWatchedMovies] = useState([]);

    useEffect(() => {
        getAllWatchedMovies();
    }, []);

    const getAllWatchedMovies = async () => {
        const response = await getWatchedMoviesByUserId(userId);
        if (response.status === 200) {
            console.log(response.data);
            setWatchedMovies(response.data);
        }
    };

    return (
        <>
            <Segment color='red'>
                <Header size='medium' as='h1' icon='film' content='Watched Movies' />
            </Segment>

            <Table celled padded>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell singleLine>Movie</Table.HeaderCell>
                        <Table.HeaderCell>Category</Table.HeaderCell>
                        <Table.HeaderCell>Rating</Table.HeaderCell>
                        <Table.HeaderCell>Year</Table.HeaderCell>

                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        watchedMovies ? watchedMovies.map(watchedMovie => (
                            <Table.Row key={`watched-movie-${watchedMovie.id}`}>
                                <Table.Cell>
                                    <Header size='medium' as='h1' textAlign='center'>
                                        {watchedMovie.movie.name}
                                    </Header>
                                </Table.Cell>
                                <Table.Cell singleLine>{watchedMovie.movie.categories[0].genre}</Table.Cell>
                                <Table.Cell>
                                    <Rating icon='star' rating={watchedMovie.movie.rating} maxRating={5} /> {watchedMovie.movie.rating.toFixed(2)}

                                </Table.Cell>

                                <Table.Cell>
                                    {watchedMovie.movie.releaseDate}
                                </Table.Cell>
                            </Table.Row>)) : null

                    }

                </Table.Body>
            </Table>

        </>
    )
}

export default WatchedMoviesComponent
