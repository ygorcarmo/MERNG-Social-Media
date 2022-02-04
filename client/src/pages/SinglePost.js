
import { useMutation, useQuery } from '@apollo/client';
import React, { useRef, useState  } from 'react';
import { useParams } from 'react-router-dom';
import {
    Container,
    Grid,
    GridColumn,
    Image,
    Loader,
    Dimmer,
    Segment,
    Card,
    Button,
    Icon,
    Label,
    Form
} from 'semantic-ui-react';

import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import '../styles/styles.css';
import Auth from '../utils/auth';
import { CREATE_COMMENT } from '../utils/mutations';
import { GET_POST } from '../utils/queries';

function SinglePost(props) {
    // get post id from the url (params)
    const { postId } = useParams();
    console.log(postId);

    const user = Auth.getProfile().data;
    const loggedIn = Auth.loggedIn();
  
    const commentInputRef = useRef(null);

    const [comment, setComment] = useState('');

    const { loading, data } = useQuery(GET_POST, {
        variables: {
            postId,
        },
    });
    const postData = data?.getPost || []
    console.log(postData)


    const [createComment] = useMutation(CREATE_COMMENT, {
        update() {
            setComment('')
            // blurs form placeholder once comment has been submitted
            commentInputRef.current.blur();
        },
        variables: {
            postId,
            body: comment,
        },
    });

    function deletePostCallback() {
        props.history.push('/Feed')
    }


    let postMarkup;
    if (loading) {
        postMarkup =
            <Segment>
                <Dimmer active>
                    <Loader />
                </Dimmer>
                <h1>Loading Post...</h1>
            </Segment>
    } else {
        const {
            id,
            body,
            createdAt, 
            username,
            comments,
            likes,
            likeCount,
            commentCount,
        } = postData;

        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Description className='post-card-body'>
                                    {body}
                                </Card.Description>
                            </Card.Content>
                            <hr />
                            <Card.Content extra>
                                <LikeButton {...user && loggedIn} post={{ id, likeCount, likes }}>
                                    <Button
                                        as='div'
                                        labelPosition='right'
                                        onClick={() => console.log('Comment on Post')}
                                    >
                                        <Button basic color='blue'>
                                            <Icon name='comments' />
                                            <Label basic color='blue' pointing='left'>
                                                {commentCount}
                                            </Label>
                                        </Button>
                                        {user && user.username === username && (
                                            <DeleteButton post={id} callback={deletePostCallback} />
                                        )}
                                    </Button>
                                </LikeButton>
                            </Card.Content>
                        </Card>
                        {/* ADD COMMENT ================================================================================== */}
                        {user && loggedIn && (
                            <Card fluid>
                                <Card.Content>
                                    <p> Add a comment</p>
                                    <Form>
                                        <div className='ui action input fluid'>
                                            <input
                                                type='text'
                                                placeholder='comment'
                                                name='comment'
                                                value={comment}
                                                onChange={event => setComment(event.target.value)}
                                                ref={commentInputRef}
                                            />
                                            <button type='submit'
                                                className='ui button teal'
                                                disabled={comment.trim() === ''}
                                                onClick={createComment}
                                            >
                                                Comment
                                            </button>
                                        </div>
                                    </Form>
                                </Card.Content>
                            </Card>
                        )}
                        {/* MAP COMMENTS ================================================================================= */}
                        {comments.map((comment) => (
                            <Card fluid key={comment.length}>
                                <Card.Content>
                                    {/* IF USER LOGGED IN MATCHES USERNAME OF COMMENT DELETE BUTTON WILL DISPLAY */}
                                    {user && user.username === comment.username && (
                                        <DeleteButton postId={id} commentId={id} />
                                    )}
                                    <Card.Header>{comment.username}</Card.Header>
                                    {/* <Card.Meta>{moment(createdAt).fromNow(true)} </Card.Meta> */}
                                    <Card.Description>{comment.body}</Card.Description>
                                </Card.Content>
                            </Card>
                        ))}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
    return postMarkup;
};

export default SinglePost;
