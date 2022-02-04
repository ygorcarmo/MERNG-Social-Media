import React, { useState } from 'react';
import { Form, Button, TextArea } from 'semantic-ui-react';
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_POST } from "../utils/mutations";

const PostForm = () => {
    const [postFormData, setPostFormData] = useState({
        body: ''
    });

    const onChangeFormData = (event) => {
        const name = event.target.name
        const value = event.target.value

        setPostFormData({
            ...postFormData,
            [name]:value
        })
    }

    const [createPost, { error }] = useMutation(CREATE_POST, {
        update(proxy, result) {
            console.log(result)
            // holding all the cache data inside the data variable
            const data = proxy.readQuery({
                query: CREATE_POST
            })
            data.getPosts = [result.data.createPost, ...data.getPosts]
            proxy.writeQuery({ query: CREATE_POST, data })
            console.log(postFormData)
            setPostFormData({ body: ''});
        }
    });

    function onSubmit(event) {
        event.preventDefault();
        createPost({variables: {...postFormData} })
    }

    return (
        <div className='post-form'>
            <Form onSubmit={onSubmit} style={{ margineBottom: 20 }}>
                <h2>Create a Post</h2>
                <Form.Field>
                        <TextArea
                            placeholder='Post Body'
                            name='body'
                            onChange={onChangeFormData}
                            value={postFormData.body}
                            error={error ? true : false}
                        />
                    <Button type='submit' color='teal'>
                        Submit
                    </Button>
                </Form.Field>
            </Form>
            {error && (
                <div className='ui error message' style={{ margineBottom: 20 }}>
                    <ul className='list'>
                        <li>{error[0]}</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PostForm;
