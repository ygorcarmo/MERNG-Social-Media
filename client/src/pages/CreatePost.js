import React, { useState } from "react";
import "../styles/styles.css";

import { Container, Grid, Transition } from "semantic-ui-react";

import PostForm from "../components/PostForm";

function CreatePost() {
  return (
    <Grid columns={3}>
      <Grid.Row>
        <Grid.Column>
          <PostForm />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default CreatePost;
