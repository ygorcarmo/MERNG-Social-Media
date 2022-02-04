import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import  LikeButton  from './LikeButton';
import DeleteButton from './DeleteButton';
import '../styles/styles.css';
import Auth from '../utils/auth';

function PostCard({ 
    article: {  
        id, 
        body, 
        createdAt, 
        username, 
        likeCount, 
        commentCount, 
        likes 
    },
}) {
    const user = Auth.getProfile().data;
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>@{username}</Card.Header>
                <Card.Description className='post-card-body'>
                    {body}
                </Card.Description>
                <Button color='black' className='read-more-btn' as={Link} to={`/posts/${id}`}>
                    Read More
                </Button>
            </Card.Content>
            <Card.Content extra>
          
                    <LikeButton user={user} post={{ id, likes, likeCount}} />
                    <Button labelPosition='right' as={Link} to={`/post/${id}`}>
                        <Button color='blue' basic>
                            <Icon name='comments' />
                            Comment
                        </Button>
                        <Label  basic color='blue' pointing='left'>
                            {commentCount}
                        </Label>
                    </Button>
                    {/* If users username matches user logged in, then they are shown a delete button */}
                    {user && user.username === username && <DeleteButton articleId={id} />}
                     (
           
            
            </Card.Content>
        </Card>
    )
}

export default PostCard;
