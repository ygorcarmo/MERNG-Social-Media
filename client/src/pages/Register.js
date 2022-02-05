import React, { useState } from 'react';
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { Form, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/client';
import '../styles/styles.css'
import { REGISTER_USER } from '../utils/mutations';
import Auth from '../utils/auth';

function Register(props) {
  const [errors, setErrors] = useState({});

  const [ values, setValues ] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log(result)
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.exception.errors)
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  })

   const onChange = (event) => {
    setValues({ ...values, [ event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await registerUser({
        variables: {registerInput: { ...values }},
      });
      if(data != undefined)
        Auth.login(data.register.token);
    } catch (e) {
      console.error(e);
    }
    setValues({username: '',
    email: '',
    password: '',
    confirmPassword: ''});
  };

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Register</h1>
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
          label='Email'
          placeholder='Email'
          name='email'
          type='email'
          value={setValues.email}
          error={errors.email ? true : false}
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
        <Form.Input
          label='Confirm Password'
          placeholder='Confirm Password'
          name='confirmPassword'
          type='password'
          value={setValues.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={onChange}
        />
        <Router>
          <Button type='submit' primary>
            Register
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

export default Register;
