import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Button, Confirm, Label, Icon } from 'semantic-ui-react'
import '../styles/styles.css';

import { DELETE_POST, DELETE_COMMENT } from '../utils/mutations';
import { GET_POSTS } from '../utils/queries';

function DeleteButton({postId, commentId, callback}) {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const mutation = commentId ? DELETE_COMMENT : DELETE_POST;

    const [deletePostOrMutation] = useMutation(mutation, {
        update(proxy, result) {
            console.log(result)
            setConfirmOpen(false);
            if(!commentId){
            const data = proxy.readQuery({
                query: GET_POSTS
            });
            console.log(data.getPosts)
            console.log(postId)

            data.getPosts = data.getPosts.filter(posts => posts.id !== postId)
            proxy.writeQuery({ query: GET_POSTS, data })
            }
            if (callback) callback();
        },
        variables: {
            postId,
            commentId
        }
    });

    return (
        <>
            <Button
                as='div'
                color='red'
                floated='right'
                onClick={() => setConfirmOpen(true)}>
                <Icon name='trash' style={{ margin: 0 }}></Icon>
            </Button>
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deletePostOrMutation}
            />
        </>
    )

};

export default DeleteButton;
