import { useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    GridColumn,
    Transition,
} from 'semantic-ui-react'
import Auth from '../utils/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import '../styles/styles.css'
import { GET_POSTS } from '../utils/queries'

const Home = () => {
  const { loading, data } = useQuery(GET_POSTS)
  console.log(data)
  const isLoggedIn = Auth.loggedIn();
  const [visible, setVisble] = useState(false)
    const postData = data?.getPosts || []

    useEffect(() => {
        setVisble(!!data)
    }, [data, setVisble])

    return (
        <>
            <Grid columns={3}>
                <Grid.Row>
                    {loading ? (
                        <h1> Loading Posts...</h1>
                    ) : (
                        <Transition visible={visible} animation='scale' duration={500}>
                            <Container>
                                {postData &&
                                    postData.map((post, index) => (
                                        <Grid.Column key={index} style={{ margin: 20 }}>
                                            <PostCard post={post} />
                                        </Grid.Column>
                                    ))}
                            </Container>
                        </Transition>
                    )}
                </Grid.Row>
            </Grid>
        </>
    );
}

export default Home;
