import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Label, Button } from 'semantic-ui-react';
import  LikeButton  from './LikeButton';
import DeleteButton from './DeleteButton';
import '../styles/styles.css';
import Auth from '../utils/auth';
import moment from 'moment';

function PostCard({  post: { body, createdAt, id, username, likeCount, commentCount, likes }}) {
    // const user = Auth.getProfile().data;
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description className='post-card-body'>{body}</Card.Description>
                {/* <Button color='black' className='read-more-btn' as={Link} to={`/posts/${id}`}>
                    Read More
                </Button> */}
            </Card.Content>
        </Card>
    )
}

export default PostCard;
