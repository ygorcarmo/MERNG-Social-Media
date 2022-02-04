import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Button, Label, Icon } from 'semantic-ui-react'
import '../styles/styles.css'

import { LIKE_POST } from '../utils/mutations'

function LikeButton({ user, post: { id, likeCount, likes } }) {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        // User can only like if theyre logged in and match user.username
        if (user && likes.find((like) => like.username === user.username)) {
            setLiked(true)
        } else {
            setLiked(false)
        }
    }, [user, likes]);

    const[likePost] = useMutation(LIKE_POST, {
        variables: { postId: id}
    });

    const likeButton = user ? (
        liked ? (
            <Button color='teal'>
                <Icon name='heart' />
                Like
            </Button>
        ) : (
            <Button color='teal' basic>
                <Icon name='heart' />
                Like
            </Button>
        ) 
    ) : (
        <Button as={Link} to='/login' color='teal' basic>
            <Icon name='heart' />
            Like
        </Button>
    )

    return (
        <Button as='div' labelPosition='right' onClick={likePost}>
            {likeButton}
            <Label basic color='teal' pointing='left'>
                {likeCount}
            </Label>
        </Button>
    )
};

export default LikeButton;
