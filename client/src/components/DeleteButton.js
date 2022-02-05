import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Button, Confirm, Label, Icon } from "semantic-ui-react";
import MyPopup from "../utils/MyPopup";

import { DELETE_POST, DELETE_COMMENT } from "../utils/mutations";

function DeleteButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const mutation = commentId ? DELETE_COMMENT : DELETE_POST;
  // console.log(commentId);

  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy, result) {
      setConfirmOpen(false);
      // if (!commentId) {
      //   const data = proxy.readQuery({
      //     query: GET_POSTS,
      //   });
      //   data.getPosts = data.getPosts.filter((posts) => posts.id !== postId);
      //   proxy.writeQuery({ query: GET_POSTS, data });
      // }
      window.location.reload();
      if (callback) callback();
    },
    variables: {
      postId,
      commentId,
    },
  });

  return (
    <>
      <MyPopup content={commentId ? "Delete comment" : "Delete post"}>
        <Button
          as="div"
          color="red"
          floated="right"
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </MyPopup>
      <Confirm
        centered
        size="mini"
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrMutation}
      />
    </>
  );
}

export default DeleteButton;
