import React, { useState } from 'react';
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { Form, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/client';

// REGISTER MUTATION
import { LOGIN_USER } from '../utils/mutations';

// AUTH *******
import Auth from '../utils/auth';

function Login(props) {
  // AUTH *******
  const [userFormData, setUserFormData] = useState({
    username: '',
    password: ''
  });

  const history = useHistory

  const [errors, setErrors] = useState({})

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      console.log(result)
    },
    onError(err) {
      // returns one object with all errors
      console.log(err)
      setErrors(err)
    },
  })

  function handleClick() {
    history.push('/Feed');
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await loginUser({
        variables: { ...userFormData },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setUserFormData({
      username: '',
      password: '',
    });
  };

  return (
    <div className="form-container">
      <Form noValidate onSubmit={handleFormSubmit} className={loading ? 'loading' : ''}>
        <h1>Login</h1>
        <Form.Input
          label='Username'
          placeholder='Username'
          name='username'
          type='text'
          value={userFormData.username}
          error={errors.username ? true : false}
          onChange={handleInputChange}
        />
        <Form.Input
          label='Password'
          placeholder='Password'
          name='password'
          type='password'
          value={userFormData.password}
          error={errors.password ? true : false}
          onChange={handleInputChange}
        />

        <Router>
          <Button type='submit' primary onClick={handleClick}>
            Login
          </Button>
        </Router>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className='ui error message'>
          <ul className='list'>
            {Object.values(errors).map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Login;