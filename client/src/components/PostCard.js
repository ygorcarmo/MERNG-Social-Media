import React from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Label, Button, Image } from "semantic-ui-react";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import "../styles/styles.css";
import Auth from "../utils/auth";
import moment from "moment";

function PostCard({
  post: {
    body,
    createdAt,
    postImage,
    id,
    username,
    likeCount,
    commentCount,
    likes,
  },
}) {
  const user = Auth.getProfile();
  const isLoggedIn = Auth.loggedIn();
  return (
    <Card fluid>
      <Card.Content>
        <Image
          className="rounded-circle"
          floated="left"
          size="mini"
          src="https://i.pravatar.cc/300"
        />
        <Card.Header>{username}</Card.Header>
        <div className="text-center">
          <Image className="rounded img-fluid" size="huge" src={postImage} />
        </div>
        <Card.Description className="post-card-body p-2">
          {body} <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton post={{ id, likes, likeCount }} />
        <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
          <Button color="blue" basic>
            <Icon name="comments" />
            Comment
          </Button>
          <Label basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
        {isLoggedIn && user.username === username && (
          <DeleteButton postId={id} />
        )}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
