import React, { useState, useContext } from 'react';
import { Formik, Form } from 'formik';
import { TextField } from '../components/TextField';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import  {AuthContext}  from '../context/auth';
import Router from 'next/router';

// import {CREATE_POST} from '../graphql/Mutations';
// import {useMutation} from '@apollo/client';


const Signup = (props) => {
  
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  // const [username, setUsername] = useState("");  
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  // const [creactPost] = useMutation(CREATE_POST);

  // const addPost=()=>{

  //     creactPost({
  //         variables: {
  //             firstName,
  //             lastName,
  //             email,
  //             password,
  //             confirmPassword
  //         },

  //     });

  //     // if(error){
  //     //     console.log(error);
  //     // }
  //     console.log(firstName,lastName,email,password,confirmPassword);

  // };

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(
      _,
      {
        data: { register: userData }
      }
    ) {
      context.login(userData);
      Router.push('/login');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },    
  });

  return (
    
    <Formik
      initialValues={{
        username: '',        
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={Yup.object({
        username: Yup.string()
          .max(15, 'Must be 15 charaters or less')
          .required('Required'),      
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 charaters')
          .required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Password must match')
          .required('Confirm password is required'),
      })}
      onSubmit={(values) => {
        const { username, email, password, confirmPassword } = values;
        // console.log(username, email, password, confirmPassword);
        // setUsername(username);        
        // setEmail(email);
        // setPassword(password);
        // setConfirmPassword(confirmPassword);
        addUser({
          variables: {
            username,
            email,
            password,
            confirmPassword            
          },
        });
        
      }}
    >
      <Form className={loading ? 'loading' : ''}>
        <h1 className="my-4 font-weight-bold-display-4">Sign Up</h1>
        {/* <TextField label="First Name" name="firstName" type="text" /> */}
        <TextField label="User Name" name="username" type="text" />
        <TextField label="Email" name="email" type="email" />
        <TextField label="Password" name="password" type="password" />
        <TextField label="Confirm Password" name="confirmPassword" type="password" />
        <button className="btn btn-dark mt-3" type="submit" >Register</button>
        <button className="btn btn-danger mt-3 ml-3" type="reset">Reset</button>
        {Object.keys(errors).length > 0 && (
        <div className="alert alert-danger">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
      </Form>
      
    </Formik>
  )
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Signup;
