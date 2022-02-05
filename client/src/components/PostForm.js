import React, { useState } from "react";
import { Form, Button, TextArea } from "semantic-ui-react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_POST } from "../utils/mutations";

import { useForm } from "../utils/hooks";

const PostForm = () => {
  // To be deleted
  //   const [postFormData, setPostFormData] = useState({
  //     body: "",
  //   });

  //   const onChangeFormData = (event) => {
  //     const name = event.target.name;
  //     const value = event.target.value;

  //     setPostFormData({
  //       ...postFormData,
  //       [name]: value,
  //     });
  //   };

  //   const [createPost, { error }] = useMutation(CREATE_POST, {
  //     update(proxy, result) {
  //       console.log(result);
  //       // holding all the cache data inside the data variable
  //       const data = proxy.readQuery({
  //         query: CREATE_POST,
  //       });
  //       data.getPosts = [result.data.createPost, ...data.getPosts];
  //       proxy.writeQuery({ query: CREATE_POST, data });
  //       console.log(postFormData);
  //       setPostFormData({ body: "" });
  //     },
  //   });

  //   function onSubmit(event) {
  //     event.preventDefault();
  //     createPost({ variables: { ...postFormData } });
  //   }

  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST, {
    variables: values,
    update(_, result) {
      console.log(result);
      values.body = "";
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <div className="post-form">
      <Form onSubmit={onSubmit} style={{ margineBottom: 20 }}>
        <h2>Create a Post</h2>
        <Form.Field>
          <TextArea
            placeholder="Post Body"
            name="body"
            onChange={onChange}
            value={values.body}
            // error={error.body ? true : false}
          />
          <Button className="mt-2" type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ margineBottom: 20 }}>
          <ul className="list">
            <li>{error[0]}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default PostForm;
