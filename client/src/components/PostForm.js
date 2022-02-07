import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Form, Button, Card } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../utils/mutations";
import "../styles/styles.css";

const PostForm = () => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    body: "",
    postImage: "",
  });
  const [progress, setProgress] = useState("getUpload");
  const [url, setImageURL] = useState(undefined);
  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const upload = async (file) => {
    setProgress("uploading");
    console.log(file);
    var file = file.target.files[0];
    try {
      const uploadURL = await fetch(
        "https://66auropgj8.execute-api.us-east-1.amazonaws.com"
      )
        .then((response) => response.json())
        .then(async (data) => {
          console.log(file);
          console.log(data.message);
          await fetch(`https://neon-cors-proxy.herokuapp.com/${data.message}`, {
            method: "PUT",
            headers: {
              "Context-Type": "multipart/form-data",
            },
            body: file,
          });
          const imageUrl = data.message.split("?")[0];
          setImageURL(imageUrl);
          setProgress("uploaded");
        })
        .catch((error) => {
          console.log("error");
        });
    } catch (e) {
      console.log(e);
    }
  };

  const [createPost, { error }] = useMutation(CREATE_POST, {
    update(proxy, result) {
      const data = proxy.readQuery({ query: CREATE_POST });
      proxy.writeQuery({ query: CREATE_POST, data });
      console.log(values);
      values.body = "";
      window.location = "/";
    },
    onError(err) {
      setErrors(err);
    },
    variables: {
      body: values.body,
      postImage: url,
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      window.location = "/";
      console.log("create post");
      console.log(url);
      console.log({ body: values.body, postImage: url });
      console.log(values);
      const { data } = await createPost({
        body: values.body,
        postImage: values.postImage,
      });
    } catch (e) {
      console.error(e);
    }
    setValues({ body: "", postImage: "" });
  };
  const content = () => {
    switch (progress) {
      case "getUpload":
        return;
      case "uploading":
        return <h2>Uploading....</h2>;
      case "uploaded":
        return (
          <img
            src={url}
            className="rounded mx-auto d-block img-thumbnail"
            alt="uploaded"
            size="small"
          />
        );
    }
  };

  return (
    <div className="post-form">
      <Form onSubmit={onSubmit} noValidate style={{ margineBottom: 20 }}>
        <h2>Create a Post</h2>
        <input type="file" onChange={upload} />
        {content()}
        <Form.Input
          placeholder="Post Body"
          name="body"
          onChange={onChange}
          value={setValues.body}
          error={error ? true : false}
        />
        <Router>
          <Button className="mt-2" type="submit" color="teal">
            Submit
          </Button>
        </Router>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PostForm;
