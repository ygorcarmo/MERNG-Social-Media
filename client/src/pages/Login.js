import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { Form, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { AuthContext } from '../context/authenticatior';

function Login(props) { 
  const context = useContext(AuthContext); 
  const [errors, setErrors] = useState({})
  const [ values, setValues ] = useState({
    username: '',
    password: ''
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      console.log(result)
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  });

  const onChange = (event) => {
    setValues({ ...values, [ event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await loginUser({
        variables: { ...values },
      });
      if(data != undefined)
        Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setValues({
      username: '',
      password: '',
    });
  };

  return (
    <div className="form-container">
      <Form noValidate onSubmit={onSubmit} className={loading ? 'loading' : ''}>
        <h1>Login</h1>
        <Form.Input
          label='Username'
          placeholder='Username'
          name='username'
          type='text'
          value={setValues.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label='Password'
          placeholder='Password'
          name='password'
          type='password'
          value={setValues.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />

        <Router>
          <Button type='submit' primary >
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
