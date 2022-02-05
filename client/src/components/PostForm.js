import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../utils/mutations";

import { useForm } from "../utils/hooks";

const PostForm = () => {
  const [errors, setErrors] = useState({});
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({ query: CREATE_POST });
      proxy.writeQuery({ query: CREATE_POST, data });
      values.body = "";
    },
    onError(err) {
      setErrors(err);
    },
  });

  function createPostCallback() {
    createPost();
    window.location = "/";
  }

  return (
    <div className="post-form">
      <Form onSubmit={onSubmit} style={{ margineBottom: 20 }}>
        <h2>Create a Post</h2>
        <Form.Field>
          <Form.Input
            placeholder="Post Body"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button className="mt-2" type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ margineBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default PostForm;
