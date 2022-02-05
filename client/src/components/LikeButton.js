import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Button, Label, Icon } from "semantic-ui-react";
import "../styles/styles.css";
import Auth from "../utils/auth";

import { LIKE_POST } from "../utils/mutations";

function LikeButton({ user, post: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState("");
  const isLoggedIn = Auth.loggedIn();

  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substring(1);
  const [activeItem, setActiveItem] = useState(path);
  const handleItemClick = (e, { name }) => setActiveItem(name);

  useEffect(() => {
    if (isLoggedIn) {
      if (likes.find((like) => like.username === Auth.getProfile().username))
        setLiked(true);
      else setLiked(false);
    }
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST, {
    variables: { postId: id },
  });

  const likeButton = isLoggedIn ? (
    liked ? (
      <Button color="red" onClick={likePost}>
        <Icon name="heart" />
        Like
      </Button>
    ) : (
      <Button color="red" basic onClick={likePost}>
        <Icon name="heart" />
        Like
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="red" basic>
      <Icon name="heart" />
      Like
    </Button>
  );

  return (
    <Button as="div" labelPosition="right">
      {likeButton}
      <Label basic color="red" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
}

export default LikeButton;
